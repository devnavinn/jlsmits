"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession, destroySession, requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { MIN_PASSWORD_LENGTH, hashPassword, verifyPassword } from "@/lib/password";
import { FormReader, RESERVED_SLUGS, moved, type FormState } from "@/lib/admin-form";
import type { MessageStatus } from "@/generated/prisma/client";

const MAX_FAILED_LOGINS = 5;
const LOCK_MS = 15 * 60 * 1000;

// Comparing against this when the email is unknown keeps response time from revealing valid accounts.
const decoyHash = hashPassword(randomBytes(32).toString("hex"));

const refresh = () => revalidatePath("/", "layout");
const idOf = (data: FormData) => String(data.get("id") ?? "");

/* ---------------------------------- Auth ---------------------------------- */

export async function login(_prev: FormState, data: FormData): Promise<FormState> {
  const email = String(data.get("email") ?? "").trim().toLowerCase();
  const password = String(data.get("password") ?? "");
  const invalid = { message: "Incorrect email or password." };

  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (user?.lockedUntil && user.lockedUntil > new Date()) {
    return { message: "Too many failed attempts. Try again in 15 minutes." };
  }
  if (!user) {
    await verifyPassword(password, await decoyHash);
    return invalid;
  }
  if (!(await verifyPassword(password, user.passwordHash))) {
    const failures = user.failedLogins + 1;
    const locked = failures >= MAX_FAILED_LOGINS;
    await prisma.adminUser.update({
      where: { id: user.id },
      data: { failedLogins: locked ? 0 : failures, lockedUntil: locked ? new Date(Date.now() + LOCK_MS) : null },
    });
    return invalid;
  }

  await prisma.adminUser.update({ where: { id: user.id }, data: { failedLogins: 0, lockedUntil: null } });
  await createSession(user.id);
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

export async function changePassword(_prev: FormState, data: FormData): Promise<FormState> {
  const admin = await requireAdmin();
  const current = String(data.get("current") ?? "");
  const next = String(data.get("next") ?? "");

  if (!(await verifyPassword(current, admin.passwordHash))) {
    return { errors: { current: "Current password is incorrect." } };
  }
  if (next.length < MIN_PASSWORD_LENGTH) {
    return { errors: { next: `Use at least ${MIN_PASSWORD_LENGTH} characters.` } };
  }
  if (next !== String(data.get("confirm") ?? "")) {
    return { errors: { confirm: "Passwords do not match." } };
  }

  // Signs out every other device.
  await prisma.$transaction([
    prisma.adminUser.update({ where: { id: admin.id }, data: { passwordHash: await hashPassword(next) } }),
    prisma.session.deleteMany({ where: { userId: admin.id } }),
  ]);
  await createSession(admin.id);
  return { ok: true, message: "Password updated." };
}

/* -------------------------------- Articles -------------------------------- */

export async function saveArticle(_prev: FormState, data: FormData): Promise<FormState> {
  await requireAdmin();
  const id = idOf(data);
  const f = new FormReader(data);
  const title = f.text("title", "Title", 200);
  const slug = f.slug("slug", title);
  const fields = {
    title,
    slug,
    category: f.text("category", "Category", 60),
    excerpt: f.optional("excerpt", "Excerpt", 500) ?? "",
    body: f.text("body", "Body", 100_000),
    coverImage: f.image("coverImage", "Cover image"),
    authorName: f.optional("authorName", "Author name", 100),
    authorRole: f.optional("authorRole", "Author role", 100),
    authorImage: f.optionalImage("authorImage", "Author photo"),
    featured: data.get("featured") === "on",
    status: f.status(),
  };

  const dateInput = String(data.get("publishedAt") ?? "");
  const date = dateInput ? new Date(`${dateInput}T00:00:00Z`) : null;
  if (date && Number.isNaN(date.getTime())) f.errors.publishedAt = "Enter a valid date.";
  if (await prisma.article.findFirst({ where: { slug, NOT: { id } }, select: { id: true } })) {
    f.errors.slug = "Another article already uses this URL.";
  }
  if (f.failed) return f.failed;

  const publishedAt = date ?? (fields.status === "PUBLISHED" ? new Date() : null);
  if (id) await prisma.article.update({ where: { id }, data: { ...fields, publishedAt } });
  else await prisma.article.create({ data: { ...fields, publishedAt } });

  refresh();
  if (!id) redirect("/admin/articles");
  return { ok: true, message: "Article saved." };
}

export async function deleteArticle(data: FormData) {
  await requireAdmin();
  await prisma.article.deleteMany({ where: { id: idOf(data) } });
  refresh();
  redirect("/admin/articles");
}

/* ------------------------- Businesses and pages share top-level URLs ------- */

async function topLevelSlugError(slug: string, own: { businessId?: string; pageId?: string }) {
  if (RESERVED_SLUGS.has(slug)) return "This URL is reserved by the site.";
  const [business, page] = await Promise.all([
    prisma.business.findFirst({ where: { slug, NOT: { id: own.businessId ?? "" } }, select: { id: true } }),
    prisma.page.findFirst({ where: { slug, NOT: { id: own.pageId ?? "" } }, select: { id: true } }),
  ]);
  return business ? "A business already uses this URL." : page ? "A page already uses this URL." : null;
}

/* ------------------------------- Businesses ------------------------------- */

export async function saveBusiness(_prev: FormState, data: FormData): Promise<FormState> {
  await requireAdmin();
  const id = idOf(data);
  const f = new FormReader(data);
  const label = f.text("label", "Name", 80);
  const slug = f.slug("slug", label);
  const lines = (name: string) =>
    String(data.get(name) ?? "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const blocks = String(data.get("paragraphs") ?? "").split(/(?:\r?\n\s*){2,}/).map((p) => p.trim()).filter(Boolean);
  const fields = {
    label,
    slug,
    brand: f.text("brand", "Brand", 80),
    cardTitle: f.text("cardTitle", "Card title", 150),
    cardDescription: f.text("cardDescription", "Card description", 400),
    cardImage: f.image("cardImage", "Card image"),
    heroImage: f.image("heroImage", "Hero image"),
    heroAlt: f.text("heroAlt", "Hero description", 200),
    titleLines: lines("titleLines"),
    tagline: f.text("tagline", "Tagline", 300),
    description: f.text("description", "Search description", 400),
    paragraphs: blocks,
    status: f.status(),
  };
  if (fields.titleLines.length === 0) f.errors.titleLines = "Hero heading is required.";
  if (blocks.length === 0) f.errors.paragraphs = "Add at least one paragraph.";
  const slugError = slug ? await topLevelSlugError(slug, { businessId: id }) : null;
  if (slugError) f.errors.slug = slugError;
  if (f.failed) return f.failed;

  if (id) {
    await prisma.business.update({ where: { id }, data: fields });
    refresh();
    return { ok: true, message: "Business saved." };
  }
  const created = await prisma.business.create({ data: { ...fields, sortOrder: await prisma.business.count() } });
  refresh();
  redirect(`/admin/businesses/${created.id}`);
}

export async function deleteBusiness(data: FormData) {
  await requireAdmin();
  await prisma.business.deleteMany({ where: { id: idOf(data) } });
  refresh();
  redirect("/admin/businesses");
}

export async function moveBusiness(data: FormData) {
  await requireAdmin();
  const rows = await prisma.business.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }], select: { id: true } });
  const order = moved(rows.map((r) => r.id), idOf(data), String(data.get("direction")));
  if (!order) return;
  await prisma.$transaction(order.map((id, sortOrder) => prisma.business.update({ where: { id }, data: { sortOrder } })));
  refresh();
}

/* -------------------------------- Companies ------------------------------- */

export async function saveCompany(_prev: FormState, data: FormData): Promise<FormState> {
  await requireAdmin();
  const id = idOf(data);
  const businessId = String(data.get("businessId") ?? "");
  const f = new FormReader(data);
  const fields = {
    name: f.text("name", "Name", 150),
    industry: f.text("industry", "Industry", 150),
    location: f.text("location", "Location", 100),
    text: f.text("text", "Description", 3000),
    website: f.url("website", "Website"),
    linkedin: f.optionalUrl("linkedin", "LinkedIn"),
    image: f.optionalImage("image", "Image"),
    logo: f.optionalImage("logo", "Logo"),
  };
  if (!(await prisma.business.findUnique({ where: { id: businessId }, select: { id: true } }))) {
    f.errors.businessId = "Choose a business.";
  }
  if (f.failed) return f.failed;

  const existing = id ? await prisma.company.findUnique({ where: { id } }) : null;
  // New companies, and companies moved to another business, go to the end of the list.
  const sortOrder =
    existing?.businessId === businessId ? existing.sortOrder : await prisma.company.count({ where: { businessId } });
  if (id) await prisma.company.update({ where: { id }, data: { ...fields, businessId, sortOrder } });
  else await prisma.company.create({ data: { ...fields, businessId, sortOrder } });

  refresh();
  redirect("/admin/companies");
}

export async function deleteCompany(data: FormData) {
  await requireAdmin();
  await prisma.company.deleteMany({ where: { id: idOf(data) } });
  refresh();
  redirect("/admin/companies");
}

export async function moveCompany(data: FormData) {
  await requireAdmin();
  const rows = await prisma.company.findMany({
    where: { businessId: String(data.get("businessId")) },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { id: true },
  });
  const order = moved(rows.map((r) => r.id), idOf(data), String(data.get("direction")));
  if (!order) return;
  await prisma.$transaction(order.map((id, sortOrder) => prisma.company.update({ where: { id }, data: { sortOrder } })));
  refresh();
}

/* ---------------------------------- Pages --------------------------------- */

export async function savePage(_prev: FormState, data: FormData): Promise<FormState> {
  await requireAdmin();
  const id = idOf(data);
  const f = new FormReader(data);
  const title = f.text("title", "Title", 150);
  const slug = f.slug("slug", title);
  const fields = {
    title,
    slug,
    summary: f.optional("summary", "Summary", 400) ?? "",
    body: f.text("body", "Body", 100_000),
    status: f.status(),
  };
  const slugError = slug ? await topLevelSlugError(slug, { pageId: id }) : null;
  if (slugError) f.errors.slug = slugError;
  if (f.failed) return f.failed;

  if (id) await prisma.page.update({ where: { id }, data: fields });
  else await prisma.page.create({ data: fields });

  refresh();
  if (!id) redirect("/admin/pages");
  return { ok: true, message: "Page saved." };
}

export async function deletePage(data: FormData) {
  await requireAdmin();
  await prisma.page.deleteMany({ where: { id: idOf(data) } });
  refresh();
  redirect("/admin/pages");
}

/* ------------------------------ Job openings ------------------------------ */

export async function saveJobOpening(_prev: FormState, data: FormData): Promise<FormState> {
  await requireAdmin();
  const id = idOf(data);
  const f = new FormReader(data);
  const fields = {
    title: f.text("title", "Job title", 120),
    department: f.text("department", "Department", 80),
    status: f.status(),
  };
  if (await prisma.jobOpening.findFirst({ where: { title: fields.title, NOT: { id } }, select: { id: true } })) {
    f.errors.title = "Another opening already uses this title.";
  }
  if (f.failed) return f.failed;

  if (id) await prisma.jobOpening.update({ where: { id }, data: fields });
  else await prisma.jobOpening.create({ data: fields });

  refresh();
  redirect("/admin/careers");
}

export async function deleteJobOpening(data: FormData) {
  await requireAdmin();
  await prisma.jobOpening.deleteMany({ where: { id: idOf(data) } });
  refresh();
  redirect("/admin/careers");
}

/* -------------------------------- Messages -------------------------------- */

const MESSAGE_STATUSES: MessageStatus[] = ["NEW", "READ", "ARCHIVED"];

export async function setMessageStatus(data: FormData) {
  await requireAdmin();
  const status = String(data.get("status")) as MessageStatus;
  if (!MESSAGE_STATUSES.includes(status)) return;
  await prisma.contactMessage.updateMany({ where: { id: idOf(data) }, data: { status } });
  refresh();
}

/** Called once when a new message is opened, so the unread badge updates. */
export async function markMessageRead(id: string) {
  await requireAdmin();
  await prisma.contactMessage.updateMany({ where: { id, status: "NEW" }, data: { status: "READ" } });
  refresh();
}

export async function deleteMessage(data: FormData) {
  await requireAdmin();
  await prisma.contactMessage.deleteMany({ where: { id: idOf(data) } });
  refresh();
  redirect("/admin/messages");
}

import Link from "next/link";
import { EmptyState, PageHeader, SearchBox, StatusBadge, buttonClass, formatDateTime } from "@/components/admin/ui";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";
import type { MessageStatus } from "@/generated/prisma/client";
import { requireAdmin } from "@/lib/auth";
import { JOB_APPLICATION } from "@/lib/contact";

const PAGE_SIZE = 25;
const tabs: { label: string; value: "" | MessageStatus | "APPLICATIONS" }[] = [
  { label: "Inbox", value: "" },
  { label: "New", value: "NEW" },
  { label: "Read", value: "READ" },
  { label: "Archived", value: "ARCHIVED" },
  { label: "Job applications", value: "APPLICATIONS" },
];

export default async function MessagesPage({ searchParams }: PageProps<"/admin/messages">) {
  await requireAdmin();
  const params = await searchParams;
  const q = String(params.q ?? "").trim();
  const status = tabs.find((t) => t.value === params.status)?.value ?? "";
  const page = Math.max(1, Number(params.page) || 1);

  const where = {
    ...(status === "APPLICATIONS"
      ? { enquiryType: JOB_APPLICATION, status: { not: "ARCHIVED" as const } }
      : { status: status || { not: "ARCHIVED" as const } }),
    ...(q
      ? {
          OR: [
            { name: { contains: q, mode: "insensitive" as const } },
            { email: { contains: q, mode: "insensitive" as const } },
            { company: { contains: q, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };
  const [messages, total] = await Promise.all([
    prisma.contactMessage.findMany({ where, orderBy: { createdAt: "desc" }, take: PAGE_SIZE, skip: (page - 1) * PAGE_SIZE }),
    prisma.contactMessage.count({ where }),
  ]);
  const href = (next: { status?: string; page?: number }) => {
    const search = new URLSearchParams();
    if (next.status) search.set("status", next.status);
    if (q) search.set("q", q);
    if (next.page && next.page > 1) search.set("page", String(next.page));
    return `/admin/messages${search.size ? `?${search}` : ""}`;
  };

  return (
    <>
      <PageHeader title="Messages" description="Everything submitted through the website's contact and careers forms.">
        <SearchBox defaultValue={q} placeholder="Search name, email, company" hidden={status ? { status } : undefined} />
      </PageHeader>

      <div className="mb-4 flex gap-5 overflow-x-auto border-b border-black/[0.07]">
        {tabs.map((t) => (
          <Link
            key={t.label}
            href={href({ status: t.value })}
            aria-current={t.value === status ? "page" : undefined}
            className={cn("-mb-px border-b-2 pb-2 text-[13px] transition-colors", t.value === status ? "border-brand font-medium text-ink" : "border-transparent text-ink/50 hover:text-ink")}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {messages.length === 0 ? (
        <EmptyState title="Nothing here" text="Messages from the contact forms will appear here." />
      ) : (
        <ul className="overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgba(12,17,27,0.06),0_1px_2px_rgba(12,17,27,0.03)]">
          {messages.map((m) => (
            <li key={m.id} className="border-b border-black/[0.05] last:border-0">
              <Link href={`/admin/messages/${m.id}`} className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-black/[0.015]">
                <span className={cn("size-1.5 shrink-0 rounded-full", m.status === "NEW" ? "bg-brand" : "bg-transparent")} aria-hidden />
                <div className="min-w-0 flex-1">
                  <p className={cn("truncate text-[13px]", m.status === "NEW" ? "font-semibold" : "font-medium")}>
                    {m.name}{m.company && <span className="font-normal text-ink/45"> · {m.company}</span>}
                  </p>
                  <p className="truncate text-xs text-ink/45">{m.subject} · {m.email}</p>
                </div>
                <time className="hidden shrink-0 text-xs text-ink/45 sm:block">{formatDateTime(m.createdAt)}</time>
                <StatusBadge status={m.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}

      {total > PAGE_SIZE && (
        <div className="mt-4 flex items-center justify-between text-[13px] text-ink/50">
          <span>Page {page} of {Math.ceil(total / PAGE_SIZE)}</span>
          <div className="flex gap-2">
            {page > 1 && <Link href={href({ status, page: page - 1 })} className={buttonClass.secondary}>Previous</Link>}
            {page * PAGE_SIZE < total && <Link href={href({ status, page: page + 1 })} className={buttonClass.secondary}>Next</Link>}
          </div>
        </div>
      )}
    </>
  );
}

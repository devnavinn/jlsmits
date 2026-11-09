import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { MIN_PASSWORD_LENGTH, hashPassword } from "../src/lib/password";
import { articles, businesses, businessPages } from "./seed-content";
import { articleBodies, legalPages } from "./seed-documents";

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Safe to re-run: every step only creates what is missing, so admin edits are never overwritten.
async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password || password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Set ADMIN_EMAIL and ADMIN_PASSWORD (${MIN_PASSWORD_LENGTH}+ characters) in .env first.`);
  }
  if (!(await prisma.adminUser.findUnique({ where: { email } }))) {
    await prisma.adminUser.create({ data: { email, name: "Administrator", passwordHash: await hashPassword(password) } });
  }

  for (const [sortOrder, page] of businessPages.entries()) {
    if (await prisma.business.findUnique({ where: { slug: page.slug } })) continue;
    const card = businesses.find((b) => b.tab === page.label);
    if (!card) throw new Error(`No home page card for ${page.label}`);
    await prisma.business.create({
      data: {
        slug: page.slug,
        label: page.label,
        brand: card.brand,
        cardTitle: card.title,
        cardDescription: card.description,
        cardImage: card.image,
        heroImage: page.heroImage,
        heroAlt: page.heroAlt,
        heroPosition: page.heroPosition,
        titleLines: page.title,
        tagline: page.tagline,
        description: page.description,
        paragraphs: page.paragraphs,
        sortOrder,
        status: "PUBLISHED",
        companies: { create: page.companies.map((c, i) => ({ ...c, sortOrder: i })) },
      },
    });
  }

  for (const [i, a] of articles.entries()) {
    const slug = slugify(a.title);
    if (await prisma.article.findUnique({ where: { slug } })) continue;
    const author = "author" in a ? a.author : undefined;
    await prisma.article.create({
      data: {
        slug,
        title: a.title,
        category: a.category,
        excerpt: "excerpt" in a ? (a.excerpt ?? "") : "",
        body: articleBodies[slug] ?? "",
        coverImage: a.image,
        authorName: author?.name,
        authorRole: author?.role,
        authorImage: author ? "/images/author-sarah.png" : undefined,
        featured: i === 0,
        status: "PUBLISHED",
        publishedAt: new Date(`${a.date} UTC`),
      },
    });
  }

  for (const page of legalPages) {
    if (await prisma.page.findUnique({ where: { slug: page.slug } })) continue;
    await prisma.page.create({ data: { ...page, status: "PUBLISHED" } });
  }
}

main()
  .then(() => console.log("Seed complete."))
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());

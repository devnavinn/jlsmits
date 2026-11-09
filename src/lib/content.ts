import "server-only";

import { cache } from "react";
import { prisma } from "@/lib/db";
import type { Article, Business, Company } from "@/generated/prisma/client";

export type BusinessCompany = {
  name: string;
  industry: string;
  location: string;
  text: string;
  image: string;
  website: string;
  logo?: string;
  linkedin?: string;
};

export type BusinessPageData = {
  slug: string;
  label: string;
  brand: string;
  cardTitle: string;
  cardDescription: string;
  cardImage: string;
  heroImage: string;
  heroAlt: string;
  heroPosition?: string;
  title: string[];
  tagline: string;
  description: string;
  paragraphs: string[];
  companies: BusinessCompany[];
};

export type ArticleCard = Pick<
  Article,
  "slug" | "title" | "category" | "excerpt" | "coverImage" | "authorName" | "authorRole" | "authorImage"
> & { date: string };

export const formatDate = (date: Date | null) =>
  date
    ? date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
    : "";

const toBusinessPage = (b: Business & { companies: Company[] }): BusinessPageData => ({
  slug: b.slug,
  label: b.label,
  brand: b.brand,
  cardTitle: b.cardTitle,
  cardDescription: b.cardDescription,
  cardImage: b.cardImage,
  heroImage: b.heroImage,
  heroAlt: b.heroAlt,
  heroPosition: b.heroPosition ?? undefined,
  title: b.titleLines,
  tagline: b.tagline,
  description: b.description,
  paragraphs: b.paragraphs,
  companies: b.companies.map((c) => ({
    name: c.name,
    industry: c.industry,
    location: c.location,
    text: c.text,
    website: c.website,
    image: c.image ?? b.cardImage,
    logo: c.logo ?? undefined,
    linkedin: c.linkedin ?? undefined,
  })),
});

const companiesInOrder = { orderBy: [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }] };

export const getBusinessPages = cache(async () => {
  const rows = await prisma.business.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: { companies: companiesInOrder },
  });
  return rows.map(toBusinessPage);
});

export const getBusinessPage = cache(async (slug: string) => {
  const row = await prisma.business.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { companies: companiesInOrder },
  });
  return row ? toBusinessPage(row) : null;
});

export const getSitePage = cache((slug: string) =>
  prisma.page.findFirst({ where: { slug, status: "PUBLISHED" } }),
);

const toCard = (a: Article): ArticleCard => ({
  slug: a.slug,
  title: a.title,
  category: a.category,
  excerpt: a.excerpt,
  coverImage: a.coverImage,
  authorName: a.authorName,
  authorRole: a.authorRole,
  authorImage: a.authorImage,
  date: formatDate(a.publishedAt),
});

/** Published articles whose date has arrived; featured ones lead. */
const visibleArticles = () => ({ status: "PUBLISHED" as const, publishedAt: { lte: new Date() } });

export async function getLatestArticles(take?: number) {
  const rows = await prisma.article.findMany({
    where: visibleArticles(),
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
    take,
  });
  return rows.map(toCard);
}

export const getArticle = cache((slug: string) =>
  prisma.article.findFirst({ where: { slug, ...visibleArticles() } }),
);

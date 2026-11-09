import Image from "next/image";
import Link from "next/link";
import { EmptyState, PageHeader, SearchBox, StatusBadge, buttonClass, formatDay } from "@/components/admin/ui";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export default async function ArticlesPage({ searchParams }: PageProps<"/admin/articles">) {
  await requireAdmin();
  const q = String((await searchParams).q ?? "").trim();
  const articles = await prisma.article.findMany({
    where: q ? { OR: [{ title: { contains: q, mode: "insensitive" } }, { category: { contains: q, mode: "insensitive" } }] } : undefined,
    orderBy: [{ updatedAt: "desc" }],
  });

  return (
    <>
      <PageHeader title="Articles" description="Write and publish the stories shown under Insights.">
        <SearchBox defaultValue={q} placeholder="Search articles" />
        <Link href="/admin/articles/new" className={buttonClass.primary}>New article</Link>
      </PageHeader>

      {articles.length === 0 ? (
        <EmptyState title={q ? "No matching articles" : "No articles yet"} text={q ? "Try a different search." : "Create your first article."} href={q ? undefined : "/admin/articles/new"} cta="New article" />
      ) : (
        <ul className="overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgba(12,17,27,0.06),0_1px_2px_rgba(12,17,27,0.03)]">
          {articles.map((a) => (
            <li key={a.id} className="border-b border-black/[0.05] last:border-0">
              <Link href={`/admin/articles/${a.id}`} className="flex items-center gap-3.5 px-4 py-2.5 transition-colors hover:bg-black/[0.015]">
                <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md bg-paper">
                  <Image src={a.coverImage} alt="" fill sizes="80px" className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{a.title}{a.featured && <span className="ml-2 rounded bg-brand/[0.08] px-1.5 py-0.5 text-[11px] font-normal text-brand">Featured</span>}</p>
                  <p className="truncate text-xs text-ink/45 md:hidden">{a.category} · {formatDay(a.publishedAt)}</p>
                </div>
                <span className="hidden w-28 shrink-0 truncate text-xs text-ink/50 md:block">{a.category}</span>
                <span className="hidden w-24 shrink-0 text-xs text-ink/50 md:block">{formatDay(a.publishedAt)}</span>
                <span className="flex w-20 shrink-0 justify-end md:justify-start"><StatusBadge status={a.status} /></span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

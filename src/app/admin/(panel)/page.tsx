import Link from "next/link";
import { PageHeader, StatusBadge, buttonClass, formatDateTime, formatDay, panelClass } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";

function ListCard({ title, href, children }: { title: string; href: string; children: React.ReactNode }) {
  return (
    <section className={cn(panelClass, "min-w-0")}>
      <div className="flex h-11 items-center justify-between border-b border-black/[0.05] px-4">
        <h2 className="text-[13px] font-medium">{title}</h2>
        <Link href={href} className="text-xs text-ink/50 transition-colors hover:text-ink">View all</Link>
      </div>
      {children}
    </section>
  );
}

export default async function DashboardPage() {
  const admin = await requireAdmin();
  const [newMessages, published, drafts, businesses, companies, recentMessages, recentArticles] = await Promise.all([
    prisma.contactMessage.count({ where: { status: "NEW" } }),
    prisma.article.count({ where: { status: "PUBLISHED" } }),
    prisma.article.count({ where: { status: "DRAFT" } }),
    prisma.business.count(),
    prisma.company.count(),
    prisma.contactMessage.findMany({ where: { status: { not: "ARCHIVED" } }, orderBy: { createdAt: "desc" }, take: 6 }),
    prisma.article.findMany({ orderBy: { updatedAt: "desc" }, take: 6 }),
  ]);

  const stats = [
    { label: "New messages", value: newMessages, note: "Waiting for review", href: "/admin/messages?status=NEW" },
    { label: "Articles", value: published, note: `${drafts} in draft`, href: "/admin/articles" },
    { label: "Businesses", value: businesses, note: "Verticals on the site", href: "/admin/businesses" },
    { label: "Companies", value: companies, note: "Across all businesses", href: "/admin/companies" },
  ];

  return (
    <>
      <PageHeader title="Dashboard" description={`Welcome back, ${admin.name}.`}>
        <Link href="/admin/articles/new" className={buttonClass.primary}>New article</Link>
      </PageHeader>

      <div className={cn(panelClass, "grid grid-cols-2 divide-black/[0.05] overflow-hidden lg:grid-cols-4 lg:divide-x")}>
        {stats.map(({ label, value, note, href }, i) => (
          <Link key={label} href={href} className={cn("p-5 transition-colors hover:bg-black/[0.015]", i % 2 === 0 && "max-lg:border-r max-lg:border-black/[0.05]", i < 2 && "max-lg:border-b max-lg:border-black/[0.05]")}>
            <p className="text-[13px] text-ink/55">{label}</p>
            <p className="mt-2 text-[28px] font-medium leading-none tracking-tight">{value}</p>
            <p className="mt-2 text-xs text-ink/40">{note}</p>
          </Link>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 items-start gap-5 lg:grid-cols-2">
        <ListCard title="Recent messages" href="/admin/messages">
          {recentMessages.length === 0 && <p className="px-4 py-12 text-center text-[13px] text-ink/40">Contact form messages will appear here.</p>}
          <ul className="divide-y divide-black/[0.05]">
            {recentMessages.map((m) => (
              <li key={m.id}>
                <Link href={`/admin/messages/${m.id}`} className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-black/[0.015]">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium">{m.name}</p>
                    <p className="truncate text-xs text-ink/45">{m.subject} · {formatDateTime(m.createdAt)}</p>
                  </div>
                  <StatusBadge status={m.status} />
                </Link>
              </li>
            ))}
          </ul>
        </ListCard>

        <ListCard title="Recently edited articles" href="/admin/articles">
          {recentArticles.length === 0 && <p className="px-4 py-12 text-center text-[13px] text-ink/40">No articles yet.</p>}
          <ul className="divide-y divide-black/[0.05]">
            {recentArticles.map((a) => (
              <li key={a.id}>
                <Link href={`/admin/articles/${a.id}`} className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-black/[0.015]">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium">{a.title}</p>
                    <p className="truncate text-xs text-ink/45">{a.category} · Edited {formatDay(a.updatedAt)}</p>
                  </div>
                  <StatusBadge status={a.status} />
                </Link>
              </li>
            ))}
          </ul>
        </ListCard>
      </div>
    </>
  );
}

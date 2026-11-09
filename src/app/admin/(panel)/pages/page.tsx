import Link from "next/link";
import { EmptyState, PageHeader, StatusBadge, buttonClass, formatDay } from "@/components/admin/ui";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export default async function PagesPage() {
  await requireAdmin();
  const pages = await prisma.page.findMany({ orderBy: { title: "asc" } });

  return (
    <>
      <PageHeader title="Pages" description="Privacy, terms and any other text pages on the website.">
        <Link href="/admin/pages/new" className={buttonClass.primary}>New page</Link>
      </PageHeader>

      {pages.length === 0 ? (
        <EmptyState title="No pages yet" text="Create a page such as your privacy policy." href="/admin/pages/new" cta="New page" />
      ) : (
        <ul className="overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgba(12,17,27,0.06),0_1px_2px_rgba(12,17,27,0.03)]">
          {pages.map((p) => (
            <li key={p.id} className="border-b border-black/[0.05] last:border-0">
              <Link href={`/admin/pages/${p.id}`} className="flex items-center gap-4 px-4 py-3 transition-colors hover:bg-black/[0.015]">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium">{p.title}</p>
                  <p className="truncate text-xs text-ink/45">/{p.slug} · Updated {formatDay(p.updatedAt)}</p>
                </div>
                <StatusBadge status={p.status} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

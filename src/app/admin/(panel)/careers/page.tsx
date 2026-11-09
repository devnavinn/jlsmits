import Link from "next/link";
import { EmptyState, PageHeader, StatusBadge, buttonClass } from "@/components/admin/ui";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export default async function JobOpeningsPage() {
  await requireAdmin();
  const openings = await prisma.jobOpening.findMany({ orderBy: { title: "asc" } });

  return (
    <>
      <PageHeader title="Job openings" description="Positions applicants can choose on the careers page.">
        <Link href="/admin/messages?status=APPLICATIONS" className={buttonClass.secondary}>View applications</Link>
        <Link href="/admin/careers/new" className={buttonClass.primary}>New opening</Link>
      </PageHeader>

      {openings.length === 0 ? (
        <EmptyState title="No openings yet" text="Applicants can still send a general application." href="/admin/careers/new" cta="New opening" />
      ) : (
        <ul className="overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgba(12,17,27,0.06),0_1px_2px_rgba(12,17,27,0.03)]">
          {openings.map((o) => (
            <li key={o.id} className="border-b border-black/[0.05] last:border-0">
              <Link href={`/admin/careers/${o.id}`} className="flex items-center gap-3.5 px-4 py-3 transition-colors hover:bg-black/[0.015]">
                <p className="min-w-0 flex-1 truncate text-[13px] font-medium">{o.title}</p>
                <span className="w-32 shrink-0 truncate text-xs text-ink/50">{o.department}</span>
                <span className="flex w-20 shrink-0 justify-end md:justify-start"><StatusBadge status={o.status} /></span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

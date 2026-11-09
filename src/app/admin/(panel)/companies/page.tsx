import Image from "next/image";
import Link from "next/link";
import { moveCompany } from "@/app/admin/actions";
import { MoveButtons } from "@/components/admin/move-buttons";
import { EmptyState, PageHeader, SearchBox, StatusBadge, buttonClass } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function CompaniesPage({ searchParams }: PageProps<"/admin/companies">) {
  await requireAdmin();
  const q = String((await searchParams).q ?? "").trim();
  const match = { contains: q, mode: "insensitive" as const };
  const groups = await prisma.business.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: {
      companies: {
        where: q ? { OR: [{ name: match }, { industry: match }, { location: match }] } : undefined,
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      },
    },
  });
  const visible = q ? groups.filter((g) => g.companies.length > 0) : groups;
  const total = groups.reduce((n, g) => n + g.companies.length, 0);

  return (
    <>
      <PageHeader title="Companies" description="Add, edit and order the companies shown on each business page.">
        <SearchBox defaultValue={q} placeholder="Search companies" />
        {groups.length > 0 && <Link href="/admin/companies/new" className={buttonClass.primary}>New company</Link>}
      </PageHeader>

      {groups.length === 0 ? (
        <EmptyState title="Add a business first" text="Every company belongs to a business." href="/admin/businesses/new" cta="New business" />
      ) : q && total === 0 ? (
        <EmptyState title="No matching companies" text="Try a different search." />
      ) : (
        <div className="space-y-6">
          {visible.map((group) => (
            <section key={group.id}>
              <div className="mb-2 flex items-center justify-between gap-3 px-1">
                <div className="flex min-w-0 items-center gap-2.5">
                  <h2 className="truncate text-[13px] font-medium">{group.label}</h2>
                  {group.status === "DRAFT" && <StatusBadge status="DRAFT" />}
                </div>
                <Link href={`/admin/companies/new?business=${group.id}`} className="shrink-0 text-xs text-ink/50 transition-colors hover:text-ink">Add company</Link>
              </div>
              {group.companies.length === 0 ? (
                <p className="rounded-xl border border-dashed border-black/10 px-5 py-5 text-center text-[13px] text-ink/40">No companies yet.</p>
              ) : (
                <ul className="overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgba(12,17,27,0.06),0_1px_2px_rgba(12,17,27,0.03)]">
                  {group.companies.map((c, i) => (
                    <li key={c.id} className="flex items-center gap-2 border-b border-black/[0.05] pr-3 last:border-0">
                      <Link href={`/admin/companies/${c.id}`} className="flex min-w-0 flex-1 items-center gap-3.5 px-4 py-2.5 transition-colors hover:bg-black/[0.015]">
                        <div className="relative h-10 w-14 shrink-0 overflow-hidden rounded-md bg-paper">
                          <Image src={c.image ?? group.cardImage} alt="" fill sizes="64px" className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-medium">{c.name}</p>
                          <p className="truncate text-xs text-ink/45">{c.industry} · {c.location}</p>
                        </div>
                      </Link>
                      {!q && (
                        <MoveButtons action={moveCompany} fields={{ id: c.id, businessId: group.id }} first={i === 0} last={i === group.companies.length - 1} />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      )}
    </>
  );
}

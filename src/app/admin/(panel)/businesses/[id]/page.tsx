import Link from "next/link";
import { notFound } from "next/navigation";
import { moveCompany } from "@/app/admin/actions";
import { BusinessForm } from "@/components/admin/business-form";
import { MoveButtons } from "@/components/admin/move-buttons";
import { Card, PageHeader, buttonClass } from "@/components/admin/ui";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export default async function EditBusinessPage({ params }: PageProps<"/admin/businesses/[id]">) {
  await requireAdmin();
  const business = await prisma.business.findUnique({
    where: { id: (await params).id },
    include: { companies: { orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] } },
  });
  if (!business) notFound();

  return (
    <>
      <PageHeader back={{ href: "/admin/businesses", label: "Businesses" }} title={business.label}>
        {business.status === "PUBLISHED" && (
          <a href={`/${business.slug}`} target="_blank" rel="noopener" className={buttonClass.secondary}>View live</a>
        )}
      </PageHeader>

      <Card className="mb-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[13px] font-medium">Companies</h2>
          <Link href={`/admin/companies/new?business=${business.id}`} className={buttonClass.secondary}>Add company</Link>
        </div>
        {business.companies.length === 0 && <p className="py-6 text-center text-[13px] text-ink/40">No companies in this business yet.</p>}
        <ul className="divide-y divide-black/[0.05]">
          {business.companies.map((c, i) => (
            <li key={c.id} className="flex items-center gap-3 py-1.5">
              <Link href={`/admin/companies/${c.id}`} className="-mx-2 min-w-0 flex-1 rounded-lg px-2 py-2 transition hover:bg-black/[0.015]">
                <p className="truncate text-[13px] font-medium">{c.name}</p>
                <p className="truncate text-xs text-ink/45">{c.industry} · {c.location}</p>
              </Link>
              <MoveButtons action={moveCompany} fields={{ id: c.id, businessId: business.id }} first={i === 0} last={i === business.companies.length - 1} />
            </li>
          ))}
        </ul>
      </Card>

      <BusinessForm business={business} />
    </>
  );
}

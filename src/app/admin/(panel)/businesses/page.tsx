import Image from "next/image";
import Link from "next/link";
import { moveBusiness } from "@/app/admin/actions";
import { MoveButtons } from "@/components/admin/move-buttons";
import { EmptyState, PageHeader, StatusBadge, buttonClass } from "@/components/admin/ui";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export default async function BusinessesPage() {
  await requireAdmin();
  const businesses = await prisma.business.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: { _count: { select: { companies: true } } },
  });

  return (
    <>
      <PageHeader title="Businesses" description="The order here sets the order in the menu and on the home page.">
        <Link href="/admin/businesses/new" className={buttonClass.primary}>New business</Link>
      </PageHeader>

      {businesses.length === 0 ? (
        <EmptyState title="No businesses yet" text="Add your first business vertical." href="/admin/businesses/new" cta="New business" />
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {businesses.map((b, i) => (
            <li key={b.id} className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_0_0_1px_rgba(12,17,27,0.06),0_1px_2px_rgba(12,17,27,0.03)]">
              <Link href={`/admin/businesses/${b.id}`} className="block flex-1">
                <div className="relative aspect-[2/1] overflow-hidden bg-paper">
                  <Image src={b.cardImage} alt="" fill sizes="(min-width:1280px) 25vw, (min-width:640px) 40vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="px-4 pt-3">
                  <p className="text-sm font-medium">{b.label}</p>
                  <p className="text-xs text-ink/45">/{b.slug}</p>
                </div>
              </Link>
              <div className="flex items-center justify-between gap-2 px-4 pb-2.5 pt-2">
                <div className="flex items-center gap-3">
                  <StatusBadge status={b.status} />
                  <span className="text-xs text-ink/45">{b._count.companies} {b._count.companies === 1 ? "company" : "companies"}</span>
                </div>
                <MoveButtons action={moveBusiness} fields={{ id: b.id }} first={i === 0} last={i === businesses.length - 1} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

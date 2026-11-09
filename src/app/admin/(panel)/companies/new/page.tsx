import { redirect } from "next/navigation";
import { CompanyForm } from "@/components/admin/company-form";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function NewCompanyPage({ searchParams }: PageProps<"/admin/companies/new">) {
  await requireAdmin();
  const businesses = await prisma.business.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { id: true, label: true },
  });
  if (businesses.length === 0) redirect("/admin/companies");

  const requested = String((await searchParams).business ?? "");
  const businessId = businesses.some((b) => b.id === requested) ? requested : businesses[0].id;

  return (
    <>
      <PageHeader back={{ href: "/admin/companies", label: "Companies" }} title="New company" />
      <CompanyForm businessId={businessId} businesses={businesses} />
    </>
  );
}

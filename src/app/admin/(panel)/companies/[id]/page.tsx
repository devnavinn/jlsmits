import { notFound } from "next/navigation";
import { CompanyForm } from "@/components/admin/company-form";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function EditCompanyPage({ params }: PageProps<"/admin/companies/[id]">) {
  await requireAdmin();
  const [company, businesses] = await Promise.all([
    prisma.company.findUnique({ where: { id: (await params).id } }),
    prisma.business.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      select: { id: true, label: true },
    }),
  ]);
  if (!company) notFound();

  return (
    <>
      <PageHeader back={{ href: "/admin/companies", label: "Companies" }} title={company.name} />
      <CompanyForm company={company} businessId={company.businessId} businesses={businesses} />
    </>
  );
}

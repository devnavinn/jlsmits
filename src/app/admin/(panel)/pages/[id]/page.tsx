import { notFound } from "next/navigation";
import { PageForm } from "@/components/admin/page-form";
import { PageHeader, buttonClass } from "@/components/admin/ui";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export default async function EditPagePage({ params }: PageProps<"/admin/pages/[id]">) {
  await requireAdmin();
  const page = await prisma.page.findUnique({ where: { id: (await params).id } });
  if (!page) notFound();

  return (
    <>
      <PageHeader back={{ href: "/admin/pages", label: "Pages" }} title={page.title}>
        {page.status === "PUBLISHED" && (
          <a href={`/${page.slug}`} target="_blank" rel="noopener" className={buttonClass.secondary}>View live</a>
        )}
      </PageHeader>
      <PageForm page={page} />
    </>
  );
}

import { notFound } from "next/navigation";
import { JobOpeningForm } from "@/components/admin/job-opening-form";
import { PageHeader } from "@/components/admin/ui";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export default async function EditJobOpeningPage({ params }: PageProps<"/admin/careers/[id]">) {
  await requireAdmin();
  const opening = await prisma.jobOpening.findUnique({ where: { id: (await params).id } });
  if (!opening) notFound();

  return (
    <>
      <PageHeader back={{ href: "/admin/careers", label: "Job openings" }} title="Edit opening" />
      <JobOpeningForm opening={opening} />
    </>
  );
}

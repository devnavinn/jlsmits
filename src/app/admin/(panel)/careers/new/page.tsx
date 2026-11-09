import { JobOpeningForm } from "@/components/admin/job-opening-form";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";

export default async function NewJobOpeningPage() {
  await requireAdmin();
  return (
    <>
      <PageHeader back={{ href: "/admin/careers", label: "Job openings" }} title="New opening" />
      <JobOpeningForm />
    </>
  );
}

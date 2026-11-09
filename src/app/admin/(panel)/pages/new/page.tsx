import { PageForm } from "@/components/admin/page-form";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";

export default async function NewPagePage() {
  await requireAdmin();
  return (
    <>
      <PageHeader back={{ href: "/admin/pages", label: "Pages" }} title="New page" />
      <PageForm />
    </>
  );
}

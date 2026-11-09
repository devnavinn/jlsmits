import { BusinessForm } from "@/components/admin/business-form";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";

export default async function NewBusinessPage() {
  await requireAdmin();
  return (
    <>
      <PageHeader back={{ href: "/admin/businesses", label: "Businesses" }} title="New business" />
      <BusinessForm />
    </>
  );
}

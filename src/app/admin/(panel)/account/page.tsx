import { changePassword } from "@/app/admin/actions";
import { AdminForm, TextField } from "@/components/admin/form";
import { Card, PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";

export default async function AccountPage() {
  const admin = await requireAdmin();
  return (
    <>
      <PageHeader title="Account" description={admin.email} />
      <div className="max-w-md">
        <AdminForm action={changePassword} submitLabel="Update password">
          <Card title="Change password" className="space-y-4">
            <TextField name="current" label="Current password" type="password" autoComplete="current-password" />
            <TextField name="next" label="New password" type="password" autoComplete="new-password" hint="At least 12 characters." />
            <TextField name="confirm" label="Confirm new password" type="password" autoComplete="new-password" />
          </Card>
        </AdminForm>
      </div>
    </>
  );
}

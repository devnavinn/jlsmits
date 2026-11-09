import { AdminForm, ConfirmDelete, ImageField, SelectField, TextAreaField, TextField } from "@/components/admin/form";
import { Card } from "@/components/admin/ui";
import { deleteCompany, saveCompany } from "@/app/admin/actions";
import type { Company } from "@/generated/prisma/client";

export function CompanyForm({
  company,
  businessId,
  businesses,
}: {
  company?: Company;
  businessId: string;
  businesses: { id: string; label: string }[];
}) {
  return (
    <AdminForm
      action={saveCompany}
      submitLabel={company ? "Save company" : "Add company"}
      extraActions={company && <ConfirmDelete action={deleteCompany} fields={{ id: company.id, businessId }} />}
    >
      <input type="hidden" name="id" value={company?.id ?? ""} />
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_18rem]">
        <Card className="min-w-0 space-y-4">
          <TextField name="name" label="Company name" defaultValue={company?.name} />
          <SelectField
            name="businessId"
            label="Business"
            defaultValue={businessId}
            hint="Change this to move the company to another business."
            options={businesses.map((b) => ({ value: b.id, label: b.label }))}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField name="industry" label="Industry" defaultValue={company?.industry} />
            <TextField name="location" label="Location" defaultValue={company?.location} />
            <TextField name="website" label="Website" type="url" defaultValue={company?.website} placeholder="https://" />
            <TextField name="linkedin" label="LinkedIn (optional)" type="url" defaultValue={company?.linkedin} placeholder="https://" />
          </div>
          <TextAreaField name="text" label="Description" rows={9} defaultValue={company?.text} />
        </Card>
        <Card title="Images" className="space-y-4">
          <ImageField name="image" label="Image (optional)" defaultValue={company?.image} hint="Uses the business card image when empty." />
          <ImageField name="logo" label="Logo (optional)" defaultValue={company?.logo} />
        </Card>
      </div>
    </AdminForm>
  );
}

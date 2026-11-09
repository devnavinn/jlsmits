import { AdminForm, ConfirmDelete, ImageField, StatusField, TextAreaField, TextField } from "@/components/admin/form";
import { Card } from "@/components/admin/ui";
import { deleteBusiness, saveBusiness } from "@/app/admin/actions";
import type { Business } from "@/generated/prisma/client";

export function BusinessForm({ business }: { business?: Business }) {
  return (
    <AdminForm
      action={saveBusiness}
      submitLabel={business ? "Save changes" : "Create business"}
      extraActions={business && <ConfirmDelete action={deleteBusiness} fields={{ id: business.id }} confirmLabel="Delete with its companies" />}
    >
      <input type="hidden" name="id" value={business?.id ?? ""} />
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0 space-y-4">
          <Card title="Business page" className="space-y-4">
            <TextField name="label" label="Name" defaultValue={business?.label} hint="Used in the menu, home page tab and page heading." />
            <TextAreaField name="titleLines" label="Hero heading" rows={2} defaultValue={business?.titleLines.join("\n")} hint="Each line appears on its own line in the banner." />
            <TextField name="tagline" label="Tagline" defaultValue={business?.tagline} />
            <TextAreaField name="paragraphs" label="About text" rows={11} defaultValue={business?.paragraphs.join("\n\n")} hint="Leave a blank line between paragraphs." />
            <TextAreaField name="description" label="Search description" rows={2} defaultValue={business?.description} />
          </Card>
          <Card title="Home page card" className="space-y-4">
            <TextField name="brand" label="Brand" defaultValue={business?.brand} />
            <TextField name="cardTitle" label="Card title" defaultValue={business?.cardTitle} />
            <TextAreaField name="cardDescription" label="Card description" rows={3} defaultValue={business?.cardDescription} />
          </Card>
        </div>
        <div className="space-y-4">
          <Card title="Publishing" className="space-y-4">
            <StatusField defaultValue={business?.status ?? "DRAFT"} />
            <TextField name="slug" label="URL slug" defaultValue={business?.slug} hint="Leave empty to create it from the name." />
          </Card>
          <Card title="Images" className="space-y-4">
            <ImageField name="heroImage" label="Hero image" defaultValue={business?.heroImage} />
            <TextField name="heroAlt" label="Hero description" defaultValue={business?.heroAlt} hint="Describes the photo for screen readers." />
            <ImageField name="cardImage" label="Card image" defaultValue={business?.cardImage} hint="Also used for companies without their own image." />
          </Card>
        </div>
      </div>
    </AdminForm>
  );
}

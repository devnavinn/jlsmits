import { AdminForm, ConfirmDelete, MarkdownField, StatusField, TextAreaField, TextField } from "@/components/admin/form";
import { Card } from "@/components/admin/ui";
import { deletePage, savePage } from "@/app/admin/actions";
import type { Page } from "@/generated/prisma/client";

export function PageForm({ page }: { page?: Page }) {
  return (
    <AdminForm
      action={savePage}
      submitLabel={page ? "Save changes" : "Create page"}
      extraActions={page && <ConfirmDelete action={deletePage} fields={{ id: page.id }} />}
    >
      <input type="hidden" name="id" value={page?.id ?? ""} />
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_18rem]">
        <Card className="min-w-0 space-y-4">
          <TextField name="title" label="Title" defaultValue={page?.title} />
          <TextAreaField name="summary" label="Summary" rows={2} defaultValue={page?.summary} hint="Shown under the title and in search results." />
          <MarkdownField name="body" label="Body" rows={22} defaultValue={page?.body} />
        </Card>
        <Card title="Publishing" className="space-y-4">
          <StatusField defaultValue={page?.status ?? "DRAFT"} />
          <TextField name="slug" label="URL slug" defaultValue={page?.slug} hint="Footer links use privacy-policy, terms-of-service and cookie-policy, so keep those unchanged." />
        </Card>
      </div>
    </AdminForm>
  );
}

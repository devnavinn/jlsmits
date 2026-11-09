import { AdminForm, ConfirmDelete, StatusField, TextField } from "@/components/admin/form";
import { Card } from "@/components/admin/ui";
import { deleteJobOpening, saveJobOpening } from "@/app/admin/actions";
import type { JobOpening } from "@/generated/prisma/client";

export function JobOpeningForm({ opening }: { opening?: JobOpening }) {
  return (
    <AdminForm
      action={saveJobOpening}
      submitLabel={opening ? "Save changes" : "Create opening"}
      extraActions={opening && <ConfirmDelete action={deleteJobOpening} fields={{ id: opening.id }} />}
    >
      <input type="hidden" name="id" value={opening?.id ?? ""} />
      <Card className="max-w-xl space-y-4">
        <TextField name="title" label="Job title" defaultValue={opening?.title} hint="Shown in the position dropdown on the careers page." />
        <TextField name="department" label="Department" defaultValue={opening?.department} hint="Each department used here appears in the department dropdown." />
        <StatusField defaultValue={opening?.status ?? "PUBLISHED"} />
      </Card>
    </AdminForm>
  );
}

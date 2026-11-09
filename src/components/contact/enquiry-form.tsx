"use client";

import { useActionState, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, CircleCheck, LoaderCircle } from "lucide-react";
import { submitEnquiry, type EnquiryState } from "@/app/contact/actions";
import { getEnquiryType, type FieldDef } from "@/lib/contact";
import { cn } from "@/lib/utils";

const initial: EnquiryState = { status: "idle" };

const control =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-ink outline-none transition placeholder:text-ink/35 hover:border-black/20 focus:border-brand focus:ring-4 focus:ring-brand/10 aria-invalid:border-red-500 aria-invalid:ring-red-500/10";

function Field({ field, value, error }: { field: FieldDef; value?: string; error?: string }) {
  const id = `f-${field.name}`;
  const common = {
    id,
    name: field.name,
    required: field.required,
    defaultValue: value ?? "",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `${id}-error` : undefined,
  };
  return (
    <div className={cn(field.full && "sm:col-span-2")}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink/80">
        {field.label}
        {field.required && <span className="text-brand"> *</span>}
      </label>
      {field.type === "textarea" ? (
        <textarea {...common} rows={4} placeholder={field.placeholder} className={cn(control, "resize-y")} />
      ) : field.type === "select" ? (
        <select {...common} className={cn(control, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%230c111b%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10")}>
          <option value="" disabled>
            Select…
          </option>
          {field.options?.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          type={field.type}
          placeholder={field.placeholder}
          min={field.type === "date" ? new Date().toISOString().slice(0, 10) : undefined}
          autoComplete={{ name: "name", email: "email", phone: "tel", company: "organization" }[field.name]}
          className={control}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function FormBody({ slug, onReset }: { slug: string; onReset: () => void }) {
  const type = getEnquiryType(slug)!;
  const [state, action, pending] = useActionState(submitEnquiry, initial);

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        role="status"
        className="flex flex-col items-center py-10 text-center"
      >
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.1 }}
          className="grid size-16 place-items-center rounded-full bg-brand/10 text-brand"
        >
          <CircleCheck className="size-8" />
        </motion.span>
        <h3 className="mt-6 text-2xl tracking-tight text-ink">{type.successTitle}</h3>
        <p className="mt-3 max-w-sm text-ink/60">{type.successText}</p>
        <button onClick={onReset} className="mt-8 text-sm font-medium text-brand underline-offset-4 hover:underline">
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-5 sm:grid-cols-2">
      <input type="hidden" name="enquiry" value={slug} />
      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {type.fields.map((f) => (
        <Field key={f.name} field={f} value={state.values?.[f.name]} error={state.errors?.[f.name]} />
      ))}

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">
          {state.message}
        </p>
      )}

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink/45">
          Fields marked <span className="text-brand">*</span> are required. We only use your details to respond to this
          enquiry.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-lg bg-brand py-1 pl-5 pr-1.5 text-sm font-medium text-white transition-all hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30 disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sending…" : type.submitLabel}
          <span className="grid size-9 place-items-center rounded-md bg-white text-brand">
            {pending ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            )}
          </span>
        </button>
      </div>
    </form>
  );
}

export function EnquiryForm({ slug }: { slug: string }) {
  const [round, setRound] = useState(0);
  return <FormBody key={round} slug={slug} onReset={() => setRound((r) => r + 1)} />;
}

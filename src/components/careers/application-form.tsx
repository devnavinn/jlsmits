"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { ChevronDown, CircleCheck, CloudUpload, LoaderCircle } from "lucide-react";
import { submitApplication, type ApplicationState } from "@/app/careers/actions";
import { cn } from "@/lib/utils";

const initial: ApplicationState = { status: "idle" };

const line =
  "h-10 w-full border-b border-black/15 bg-transparent text-sm text-ink outline-none transition placeholder:text-ink/80 focus:border-brand aria-invalid:border-red-500";

function ErrorText({ id, error }: { id: string; error?: string }) {
  return error ? <p id={`${id}-error`} className="mt-1 text-xs text-red-600">{error}</p> : null;
}

const aria = (id: string, error?: string) => ({
  "aria-invalid": error ? true : undefined,
  "aria-describedby": error ? `${id}-error` : undefined,
});

function Input({ name, label, type = "text", autoComplete, state }: { name: string; label: string; type?: string; autoComplete?: string; state: ApplicationState }) {
  const error = state.errors?.[name];
  return (
    <div>
      <label htmlFor={name} className="sr-only">{label}</label>
      <input id={name} name={name} type={type} autoComplete={autoComplete} placeholder={label} defaultValue={state.values?.[name] ?? ""} className={line} {...aria(name, error)} />
      <ErrorText id={name} error={error} />
    </div>
  );
}

function Select({ name, label, options, state }: { name: string; label: string; options: string[]; state: ApplicationState }) {
  const error = state.errors?.[name];
  return (
    <div>
      <label htmlFor={name} className="sr-only">{label}</label>
      <div className="relative">
        <select id={name} name={name} defaultValue={state.values?.[name] ?? ""} className={cn(line, "appearance-none pr-6")} {...aria(name, error)}>
          <option value="" disabled>{label}</option>
          {options.map((o) => <option key={o}>{o}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 text-ink" aria-hidden />
      </div>
      <ErrorText id={name} error={error} />
    </div>
  );
}

function FormBody({ positions, departments, onReset }: { positions: string[]; departments: string[]; onReset: () => void }) {
  const [state, action, pending] = useActionState(submitApplication, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-center py-16 text-center">
        <span className="grid size-16 place-items-center rounded-full bg-brand/10 text-brand"><CircleCheck className="size-8" /></span>
        <h3 className="mt-6 text-2xl tracking-tight">Thanks, your application is in.</h3>
        <p className="mt-3 max-w-sm text-sm text-ink/60">Our team reviews every application and will contact you if your profile is a match.</p>
        <button onClick={onReset} className="mt-8 text-sm font-medium text-brand underline-offset-4 hover:underline">Submit another application</button>
      </div>
    );
  }

  return (
    <form action={action} noValidate className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
      {/* Honeypot for bots; hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <Input name="name" label="Name" autoComplete="name" state={state} />
      <Input name="email" label="Email" type="email" autoComplete="email" state={state} />
      <Input name="phone" label="Phone" type="tel" autoComplete="tel" state={state} />
      <Input name="location" label="Location" state={state} />
      <Select name="position" label="Position applied for" options={positions} state={state} />
      <Select name="department" label="Department" options={departments} state={state} />

      <div className="mt-3 sm:col-span-2">
        <p className="text-sm">Upload Resume</p>
        <div aria-disabled className="mt-3 flex cursor-not-allowed items-center justify-center gap-4 rounded-md border border-dashed border-black/25 px-4 py-4 opacity-60">
          <CloudUpload className="size-7 shrink-0" aria-hidden />
          <div>
            <p className="text-sm">Resume upload coming soon</p>
            <p className="text-xs text-ink/60">PDF, DOC, or DOCX (Max 5MB)</p>
          </div>
        </div>
      </div>

      <div className="mt-3 sm:col-span-2">
        <label htmlFor="message" className="text-sm">Message</label>
        <textarea id="message" name="message" rows={4} maxLength={3000} defaultValue={state.values?.message ?? ""} placeholder="Tell us about yourself and your interest in the role" className="mt-3 w-full resize-y rounded-lg bg-white p-3 text-sm text-ink outline-none transition placeholder:text-ink/45 focus:ring-2 focus:ring-brand/30" />
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-[13px] text-ink/60">
          <input type="checkbox" name="consent" defaultChecked={state.values?.consent === "on"} className="mt-0.5 size-4 shrink-0 accent-[var(--color-navy)]" {...aria("consent", state.errors?.consent)} />
          <span>I agree to the processing of my personal data as described in <Link href="/privacy-policy" className="text-ink underline-offset-2 hover:underline">Privacy Policy</Link></span>
        </label>
        <ErrorText id="consent" error={state.errors?.consent} />
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 sm:col-span-2">{state.message}</p>
      )}

      <button type="submit" disabled={pending} className="mt-2 flex h-13 items-center justify-center gap-2 rounded-full bg-navy text-sm font-medium uppercase text-white transition-colors hover:bg-ink disabled:cursor-wait disabled:opacity-70 sm:col-span-2">
        {pending && <LoaderCircle className="size-4 animate-spin" />}
        {pending ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}

export function ApplicationForm({ positions, departments }: { positions: string[]; departments: string[] }) {
  const [round, setRound] = useState(0);
  return <FormBody key={round} positions={positions} departments={departments} onReset={() => setRound((r) => r + 1)} />;
}

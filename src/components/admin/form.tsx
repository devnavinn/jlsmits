"use client";

import { createContext, startTransition, useActionState, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CheckCircle2, ChevronDown, ImageUp, Loader2 } from "lucide-react";
import { Markdown } from "@/components/markdown";
import { buttonClass } from "@/components/admin/ui";
import { cn } from "@/lib/utils";
import type { FormState } from "@/lib/admin-form";

const FormContext = createContext<FormState>({});

/** Submits without a form `action` prop, because React resets those forms and would wipe entries on a validation error. */
export function AdminForm({
  action,
  submitLabel = "Save changes",
  children,
  extraActions,
}: {
  action: (prev: FormState, data: FormData) => Promise<FormState>;
  submitLabel?: string;
  children: React.ReactNode;
  extraActions?: React.ReactNode;
}) {
  const [state, dispatch, pending] = useActionState(action, {});
  return (
    <FormContext value={state}>
      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const data = new FormData(e.currentTarget);
          startTransition(() => dispatch(data));
        }}
      >
        {children}
        <div className="sticky bottom-4 z-10 mt-5 flex items-center gap-3 rounded-xl bg-white/95 p-2 pl-3 shadow-[0_0_0_1px_rgba(12,17,27,0.07),0_12px_32px_-12px_rgba(12,17,27,0.22)] backdrop-blur">
          {state.message && (
            <p role="status" className={cn("flex min-w-0 items-center gap-1.5 text-[13px]", state.ok ? "text-emerald-700" : "text-red-600")}>
              {state.ok && <CheckCircle2 className="size-4 shrink-0" />}
              <span className="truncate">{state.message}</span>
            </p>
          )}
          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            {extraActions}
            <button type="submit" disabled={pending} className={buttonClass.primary}>
              {pending && <Loader2 className="size-3.5 animate-spin" />}
              {pending ? "Saving…" : submitLabel}
            </button>
          </div>
        </div>
      </form>
    </FormContext>
  );
}

const surface =
  "bg-white shadow-[0_0_0_1px_rgba(12,17,27,0.11)] transition-shadow focus-within:shadow-[0_0_0_1px_var(--color-brand),0_0_0_4px_rgba(31,20,255,0.1)] has-aria-invalid:shadow-[0_0_0_1px_#dc2626]";
const inputClass =
  "w-full rounded-lg px-3 text-[13px] text-ink outline-none placeholder:text-ink/35 " + surface;

type BaseProps = { name: string; label: string; hint?: string; className?: string };

function Wrapper({ name, label, hint, className, children }: BaseProps & { children: React.ReactNode }) {
  const error = useContext(FormContext).errors?.[name];
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-[13px] text-ink/70">{label}</label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="mt-1.5 text-xs text-red-600">{error}</p>
      ) : hint ? (
        <p className="mt-1.5 text-xs leading-snug text-ink/40">{hint}</p>
      ) : null}
    </div>
  );
}

function useFieldError(name: string) {
  const invalid = !!useContext(FormContext).errors?.[name];
  return { "aria-invalid": invalid || undefined, "aria-describedby": invalid ? `${name}-error` : undefined };
}

export function TextField({
  defaultValue,
  placeholder,
  type = "text",
  autoComplete,
  ...base
}: BaseProps & { defaultValue?: string | null; placeholder?: string; type?: string; autoComplete?: string }) {
  const aria = useFieldError(base.name);
  return (
    <Wrapper {...base}>
      <input id={base.name} name={base.name} type={type} autoComplete={autoComplete} defaultValue={defaultValue ?? ""} placeholder={placeholder} className={cn(inputClass, "h-9")} {...aria} />
    </Wrapper>
  );
}

export function TextAreaField({ defaultValue, rows = 4, ...base }: BaseProps & { defaultValue?: string | null; rows?: number }) {
  const aria = useFieldError(base.name);
  return (
    <Wrapper {...base}>
      <textarea id={base.name} name={base.name} rows={rows} defaultValue={defaultValue ?? ""} className={cn(inputClass, "resize-y py-2 leading-relaxed")} {...aria} />
    </Wrapper>
  );
}

export function SelectField({
  defaultValue,
  options,
  ...base
}: BaseProps & { defaultValue?: string; options: { value: string; label: string }[] }) {
  const aria = useFieldError(base.name);
  return (
    <Wrapper {...base}>
      <div className="relative">
        <select id={base.name} name={base.name} defaultValue={defaultValue} className={cn(inputClass, "h-9 appearance-none pr-8")} {...aria}>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-ink/40" aria-hidden />
      </div>
    </Wrapper>
  );
}

export function StatusField({ defaultValue }: { defaultValue: string }) {
  const options = [
    { value: "DRAFT", label: "Draft" },
    { value: "PUBLISHED", label: "Published" },
  ];
  return (
    <fieldset>
      <legend className="mb-1.5 text-[13px] text-ink/70">Status</legend>
      <div className="grid grid-cols-2 gap-0.5 rounded-lg bg-black/[0.05] p-0.5">
        {options.map((o) => (
          <label key={o.value} className="cursor-pointer">
            <input type="radio" name="status" value={o.value} defaultChecked={defaultValue === o.value} className="peer sr-only" />
            <span className="block rounded-md py-1.5 text-center text-[13px] text-ink/55 transition peer-checked:bg-white peer-checked:font-medium peer-checked:text-ink peer-checked:shadow-[0_1px_2px_rgba(12,17,27,0.12)] peer-focus-visible:ring-2 peer-focus-visible:ring-brand/30">
              {o.label}
            </span>
          </label>
        ))}
      </div>
      <p className="mt-1.5 text-xs text-ink/40">Drafts are hidden from the website.</p>
    </fieldset>
  );
}

export function CheckboxField({ name, label, hint, defaultChecked }: { name: string; label: string; hint?: string; defaultChecked?: boolean }) {
  return (
    <label className="flex cursor-pointer gap-2.5">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="mt-0.5 size-4 rounded accent-[var(--color-brand)]" />
      <span>
        <span className="block text-[13px] text-ink/80">{label}</span>
        {hint && <span className="block text-xs text-ink/40">{hint}</span>}
      </span>
    </label>
  );
}

export function ImageField({ defaultValue, ...base }: BaseProps & { defaultValue?: string | null }) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [dragging, setDragging] = useState(false);
  const aria = useFieldError(base.name);
  const canPreview = /^\/(?!\/)\S+$/.test(value) || value.startsWith("https://images.unsplash.com/");

  async function upload(file: File) {
    setUploading(true);
    setUploadError("");
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setValue(json.url);
    } catch (err) {
      setUploadError(err instanceof Error && err.message ? err.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Wrapper {...base}>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) upload(file);
        }}
        className={cn(
          "group relative block aspect-[16/9] cursor-pointer overflow-hidden rounded-lg transition",
          canPreview ? "bg-black/[0.03]" : "border border-dashed border-black/15 bg-black/[0.015] hover:border-black/30",
          dragging && "ring-2 ring-brand",
        )}
      >
        {canPreview && <Image src={value} alt="" fill unoptimized sizes="320px" className="object-cover" />}
        <span
          className={cn(
            "absolute inset-0 flex flex-col items-center justify-center gap-1 text-xs transition-opacity",
            canPreview ? "bg-ink/45 text-white opacity-0 group-hover:opacity-100 group-focus-within:opacity-100" : "text-ink/45",
            uploading && "opacity-100",
          )}
        >
          {uploading ? <Loader2 className="size-5 animate-spin" /> : <ImageUp className="size-5" />}
          {uploading ? "Uploading…" : canPreview ? "Replace image" : "Upload or drop an image"}
        </span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          aria-label={`Upload ${base.label}`}
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (file) upload(file);
          }}
        />
      </label>
      <div className="mt-2 flex items-center gap-2">
        <input
          id={base.name}
          name={base.name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Or paste a site path, e.g. /images/photo.png"
          className={cn(inputClass, "h-8 min-w-0 flex-1 text-xs")}
          {...aria}
        />
        {value && (
          <button type="button" onClick={() => setValue("")} className="shrink-0 text-xs text-ink/45 transition-colors hover:text-ink">
            Remove
          </button>
        )}
      </div>
      {uploadError && <p role="alert" className="mt-1.5 text-xs text-red-600">{uploadError}</p>}
    </Wrapper>
  );
}

export function MarkdownField({ defaultValue, rows = 18, ...base }: BaseProps & { defaultValue?: string | null; rows?: number }) {
  const [value, setValue] = useState(defaultValue ?? "");
  const [preview, setPreview] = useState(false);
  const aria = useFieldError(base.name);
  const tab = (active: boolean) =>
    cn("rounded-md px-2.5 py-1 text-xs transition-colors", active ? "bg-black/[0.06] font-medium text-ink" : "text-ink/50 hover:text-ink");

  return (
    <Wrapper {...base}>
      <div className={cn("overflow-hidden rounded-lg", surface)}>
        <div className="flex gap-0.5 border-b border-black/[0.06] p-1.5">
          <button type="button" className={tab(!preview)} onClick={() => setPreview(false)}>Write</button>
          <button type="button" className={tab(preview)} onClick={() => setPreview(true)}>Preview</button>
        </div>
        <textarea
          id={base.name}
          name={base.name}
          rows={rows}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          hidden={preview}
          className="block w-full resize-y bg-transparent p-3 font-mono text-[13px] leading-relaxed text-ink outline-none"
          {...aria}
        />
        {preview && (
          <div className="min-h-64 p-5">
            {value.trim() ? <Markdown>{value}</Markdown> : <p className="text-[13px] text-ink/40">Nothing to preview yet.</p>}
          </div>
        )}
      </div>
    </Wrapper>
  );
}

/** Asks for a second click before running a destructive action. */
export function ConfirmDelete({
  action,
  fields,
  label = "Delete",
  confirmLabel = "Confirm delete",
}: {
  action: (data: FormData) => Promise<void>;
  fields: Record<string, string>;
  label?: string;
  confirmLabel?: string;
}) {
  const [armed, setArmed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  if (!armed) {
    return (
      <button
        type="button"
        className={buttonClass.danger}
        onClick={() => {
          setArmed(true);
          timer.current = setTimeout(() => setArmed(false), 5000);
        }}
      >
        {label}
      </button>
    );
  }
  return (
    <button
      type="button"
      className={cn(buttonClass.danger, "bg-red-600 text-white hover:bg-red-700")}
      onClick={() => {
        const data = new FormData();
        Object.entries(fields).forEach(([k, v]) => data.append(k, v));
        startTransition(() => action(data));
      }}
    >
      {confirmLabel}
    </button>
  );
}

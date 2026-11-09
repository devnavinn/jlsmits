import Link from "next/link";
import { ChevronLeft, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const buttonBase =
  "inline-flex h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 text-[13px] font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-brand/20 disabled:opacity-60";

export const buttonClass = {
  primary: cn(buttonBase, "bg-brand text-white hover:bg-brand-dark"),
  secondary: cn(buttonBase, "bg-white text-ink/80 shadow-[0_0_0_1px_rgba(12,17,27,0.1)] hover:bg-black/[0.02] hover:text-ink"),
  danger: cn(buttonBase, "text-red-600 hover:bg-red-50"),
};

/** The white surface every list and form section sits on. */
export const panelClass = "rounded-xl bg-white shadow-[0_0_0_1px_rgba(12,17,27,0.06),0_1px_2px_rgba(12,17,27,0.03)]";

export function PageHeader({
  back,
  title,
  description,
  children,
}: {
  back?: { href: string; label: string };
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      {back && (
        <Link href={back.href} className="-ml-1 mb-2 inline-flex items-center gap-0.5 text-[13px] text-ink/50 transition-colors hover:text-ink">
          <ChevronLeft className="size-4" aria-hidden />
          {back.label}
        </Link>
      )}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <div className="min-w-0">
          <h1 className="truncate text-[22px] font-medium tracking-tight text-ink">{title}</h1>
          {description && <p className="mt-0.5 text-[13px] text-ink/50">{description}</p>}
        </div>
        {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
      </div>
    </div>
  );
}

export function Card({ title, children, className }: { title?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={cn(panelClass, "p-5", className)}>
      {title && <h2 className="text-[13px] font-medium text-ink">{title}</h2>}
      {children}
    </section>
  );
}

const statusStyles: Record<string, { dot: string; label: string }> = {
  PUBLISHED: { dot: "bg-emerald-500", label: "Published" },
  DRAFT: { dot: "bg-amber-400", label: "Draft" },
  NEW: { dot: "bg-brand", label: "New" },
  READ: { dot: "bg-black/20", label: "Read" },
  ARCHIVED: { dot: "bg-black/10", label: "Archived" },
};

export function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status];
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-ink/60">
      <span className={cn("size-1.5 rounded-full", style?.dot)} aria-hidden />
      {style?.label ?? status}
    </span>
  );
}

export function EmptyState({ title, text, href, cta }: { title: string; text: string; href?: string; cta?: string }) {
  return (
    <div className={cn(panelClass, "px-6 py-16 text-center")}>
      <p className="text-sm font-medium text-ink">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-[13px] text-ink/50">{text}</p>
      {href && cta && <Link href={href} className={cn(buttonClass.primary, "mt-4")}>{cta}</Link>}
    </div>
  );
}

export function SearchBox({ defaultValue, placeholder, hidden }: { defaultValue?: string; placeholder: string; hidden?: Record<string, string> }) {
  return (
    <form className="relative w-full sm:w-60">
      {Object.entries(hidden ?? {}).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-ink/35" aria-hidden />
      <input
        type="search"
        name="q"
        aria-label={placeholder}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-9 w-full rounded-lg bg-white pl-8 pr-3 text-[13px] shadow-[0_0_0_1px_rgba(12,17,27,0.1)] outline-none transition placeholder:text-ink/40 focus:shadow-[0_0_0_1px_var(--color-brand),0_0_0_4px_rgba(31,20,255,0.1)]"
      />
    </form>
  );
}

export const formatDateTime = (d: Date) =>
  d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });

export const formatDay = (d: Date | null) =>
  d ? d.toLocaleDateString("en-IN", { dateStyle: "medium", timeZone: "UTC" }) : "—";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, light = true }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)} aria-label="JLSmith Group home">
      <Image src="/images/logo.png" alt="" width={50} height={35} priority className="h-6 w-auto shrink-0 md:h-7" />
      <span className={cn("text-lg tracking-tight md:text-xl", light ? "text-white" : "text-ink")}>
        jlsmith group
      </span>
    </Link>
  );
}

export function Eyebrow({
  children,
  className,
  dot = true,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-brand md:text-xs",
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-brand" />}
      {children}
    </p>
  );
}

type ArrowButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "dark" | "brand" | "outline";
  className?: string;
};

/** Pill-ish CTA with the boxed arrow, matching the design's buttons. */
export function ArrowButton({ href = "#", children, variant = "dark", className }: ArrowButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-11 items-center gap-3 rounded-lg py-1 pl-4 pr-1 text-sm font-medium tracking-tight transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        variant === "dark" && "bg-ink text-white hover:bg-black hover:shadow-lg hover:shadow-brand/20",
        variant === "brand" && "bg-brand text-white hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/30",
        variant === "outline" && "border border-ink/80 bg-transparent text-ink hover:bg-ink hover:text-white",
        className,
      )}
    >
      {children}
      <span
        className={cn(
          "grid size-9 place-items-center rounded-md transition-colors",
          variant === "dark" && "bg-brand text-white",
          variant === "brand" && "bg-white text-brand",
          variant === "outline" && "text-current",
        )}
      >
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

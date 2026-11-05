"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, PlugZap } from "lucide-react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Large navy heading whose lines slide up from a mask as they enter the viewport. */
export function RevealHeading({
  lines,
  className,
  as: Tag = "h2",
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag className={cn("text-[2rem] font-normal leading-[1.12] tracking-tight text-navy sm:text-5xl lg:text-[3.6rem]", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em]">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease, delay: i * 0.1 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Grey card with the plug/bolt icon, used by Core Values and Global Shifts. */
export function IconCard({ title, text, index }: { title: string; text: string; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative h-full overflow-hidden rounded-2xl bg-[#f3f3f3] p-7 transition-colors duration-500 hover:bg-white hover:shadow-[0_30px_60px_-30px_rgba(27,43,64,0.35)] md:p-8"
    >
      {/* hover glow */}
      <span className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-brand/0 blur-3xl transition-colors duration-500 group-hover:bg-brand/15" />
      <span className="relative inline-grid size-16 place-items-center rounded-full">
        <svg viewBox="0 0 64 64" className="absolute inset-0 size-16 -rotate-90" aria-hidden>
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="188"
            className="text-brand/70 [stroke-dashoffset:60] transition-[stroke-dashoffset] duration-700 group-hover:[stroke-dashoffset:0]"
          />
        </svg>
        <PlugZap strokeWidth={1.2} className="size-8 text-brand transition-transform duration-500 group-hover:scale-110" />
      </span>
      <h3 className="relative mt-7 text-xl text-navy md:text-2xl">{title}</h3>
      <p className="relative mt-4 text-[15px] leading-relaxed text-ink/55">{text}</p>
    </motion.article>
  );
}

export function PillLink({
  href = "#",
  children,
  variant = "outline",
  className,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "outline" | "white";
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-7 py-3 text-sm uppercase tracking-wide transition-colors duration-300 md:text-base",
        variant === "outline" && "border border-navy text-navy hover:text-white",
        variant === "white" && "bg-white text-navy hover:text-white",
        className,
      )}
    >
      <span
        className={cn(
          "absolute inset-0 -z-0 translate-y-full rounded-full transition-transform duration-500 ease-out group-hover:translate-y-0",
          variant === "outline" ? "bg-navy" : "bg-brand",
        )}
      />
      <span className="relative">{children}</span>
      <ArrowUpRight className="relative size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

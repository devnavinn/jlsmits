"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { RevealHeading } from "@/components/about/ui";

const ease = [0.22, 1, 0.36, 1] as const;

/** Dark banner for the contact pages: grid texture, brand glow, breadcrumb and title. */
export function ContactHero({
  title,
  intro,
  crumbs,
}: {
  title: string[];
  intro?: string;
  crumbs: { label: string; href?: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pb-16 pt-36 text-white md:pb-24 md:pt-48">
      <div className="absolute inset-0 -z-10 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <motion.span
        className="absolute -right-32 -top-40 -z-10 size-[36rem] rounded-full bg-brand/40 blur-[140px]"
        animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container-x">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex flex-wrap items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-white/50"
        >
          <Link href="/" className="hover:text-white">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5" aria-hidden />
              {c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white/80">{c.label}</span>}
            </span>
          ))}
        </motion.nav>
        <RevealHeading as="h1" lines={title} className="mt-6 max-w-4xl text-white sm:text-5xl lg:text-[4rem]" />
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.3 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 md:text-lg"
          >
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  );
}

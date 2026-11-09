"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Link2, MapPin } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Eyebrow } from "@/components/shared";
import { RevealHeading } from "@/components/about/ui";
import { PageHero } from "@/components/page-hero";
import { cn } from "@/lib/utils";
import type { BusinessCompany, BusinessPageData } from "@/lib/business-pages";

const ease = [0.22, 1, 0.36, 1] as const;

export function BusinessHero({ page }: { page: BusinessPageData }) {
  return <PageHero image={page.heroImage} alt={page.heroAlt} lines={page.title} imageClassName={page.heroPosition} />;
}

export function BusinessOverview({ page }: { page: BusinessPageData }) {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <BlurFade inView>
          <Eyebrow>About us</Eyebrow>
        </BlurFade>
        <RevealHeading lines={[page.label]} className="mt-3 text-ink sm:text-4xl lg:text-[2.6rem]" />
        <BlurFade inView delay={0.15}>
          <p className="mt-4 max-w-3xl text-lg leading-snug text-ink/70 md:text-2xl">{page.tagline}</p>
        </BlurFade>
        <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-ink/85 md:text-base">
          {page.paragraphs.map((p, i) => (
            <BlurFade key={i} inView delay={0.1 * (i + 1)}>
              <p>{p}</p>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-1.75 3.44-1.75 3.4 0 4.2 2.1 4.2 5v6.25h-4v-5.5c0-1.4-.03-3-1.9-3s-2.2 1.4-2.2 2.9v5.6h-4v-11Z" />
    </svg>
  );
}

/** `wide` puts image and text side by side (single company); otherwise image sits on top for the 2-column grid. */
function CompanyCard({ c, wide }: { c: BusinessCompany; wide: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease }}
      className={cn(
        "group grid h-full rounded-2xl border border-black/10 bg-paper p-4 md:p-5 lg:p-6",
        wide ? "items-center gap-8 md:grid-cols-2 md:gap-10" : "grid-rows-[auto_1fr] gap-6",
      )}
    >
      <div className={cn("relative aspect-[16/9] overflow-hidden rounded-xl", wide && "md:aspect-[1.86]")}>
        <Image
          src={c.image}
          alt={c.name}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className={cn("flex flex-col px-2 pb-2", wide && "pb-4 md:px-0 md:pb-0 md:pr-4")}>
        {c.logo && (
          <div className="mb-5 inline-flex w-fit rounded-lg bg-white px-3 py-2 ring-1 ring-black/5">
            <div className="relative h-8 w-40 md:h-9 md:w-48">
              <Image src={c.logo} alt={`${c.name} logo`} fill sizes="192px" className="object-contain object-left" />
            </div>
          </div>
        )}
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand">{c.industry}</p>
        <h3 className="mt-2 text-lg font-medium text-ink md:text-xl">{c.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-xs text-ink/55">
          <MapPin className="size-3.5" aria-hidden />
          {c.location}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ink/80">{c.text}</p>
        <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4 md:mt-auto">
          <div className="flex gap-3">
            <a
              href={c.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${c.name} website (opens in a new tab)`}
              className="grid size-9 place-items-center rounded-full bg-brand text-white transition hover:-translate-y-0.5 hover:bg-brand-dark"
            >
              <Link2 className="size-4" />
            </a>
            {c.linkedin && (
              <a
                href={c.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.name} on LinkedIn`}
                className="grid size-9 place-items-center rounded-full bg-brand text-white transition hover:-translate-y-0.5 hover:bg-brand-dark"
              >
                <LinkedinIcon className="size-4" />
              </a>
            )}
          </div>
          <a
            href={c.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${c.name} (opens in a new tab)`}
            className="grid size-9 place-items-center rounded-md border-2 border-ink bg-brand text-white transition hover:bg-brand-dark"
          >
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function BusinessCompanies({ page }: { page: BusinessPageData }) {
  const wide = page.companies.length === 1;
  return (
    <section className="pb-10 md:pb-16">
      <div className={cn("container-x grid gap-6 md:gap-8", !wide && "md:grid-cols-2")}>
        {page.companies.map((c) => (
          <CompanyCard key={c.name} c={c} wide={wide} />
        ))}
      </div>
    </section>
  );
}

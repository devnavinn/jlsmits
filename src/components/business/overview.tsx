"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ArrowButton, Eyebrow } from "@/components/shared";
import { RevealHeading } from "@/components/about/ui";
import { PageHero } from "@/components/page-hero";
import type { BusinessPageData } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export function BusinessOverviewHero() {
  return (
    <PageHero
      image="/images/business/advanced-materials-hero.png"
      alt="Technician welding steel beams"
      lines={["Our Businesses"]}
      imageClassName="object-[70%_center]"
    />
  );
}

const buildStats = (pages: BusinessPageData[]) => [
  { value: pages.length, suffix: "", label: "Business verticals" },
  { value: pages.reduce((n, p) => n + p.companies.length, 0), suffix: "", label: "Group companies" },
  { value: 4, suffix: "", label: "Countries of operation", note: "India · China · UAE · USA" },
  { value: 1978, start: 1940, suffix: "", label: "Our journey began" },
];

export function BusinessOverviewIntro({ pages }: { pages: BusinessPageData[] }) {
  const stats: { value: number; start?: number; suffix: string; label: string; note?: string }[] = buildStats(pages);
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-8 md:grid-cols-2 md:items-end md:gap-16">
          <div>
            <BlurFade inView>
              <Eyebrow>Our businesses</Eyebrow>
            </BlurFade>
            <RevealHeading lines={["Five Businesses.", "One Shared Purpose."]} className="mt-3 text-ink" />
          </div>
          <BlurFade inView delay={0.15}>
            <p className="max-w-xl text-base leading-relaxed text-ink/70 md:pb-3 md:text-lg">
              From advanced materials and industrial components to design, consumer products and international trade,
              JLSmith Group&apos;s businesses combine specialist expertise with a shared commitment to quality,
              innovation and long-term growth.
            </p>
          </BlurFade>
        </div>

        <div className="mt-14 grid grid-cols-2 border-y border-black/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: i * 0.1 }}
              className="group relative px-2 py-8 sm:px-6 md:py-10 [&:nth-child(odd)]:border-r lg:[&:not(:last-child)]:border-r border-black/10 max-lg:[&:nth-child(-n+2)]:border-b"
            >
              <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
              <p className="text-4xl font-light tracking-tight text-navy md:text-6xl">
                <NumberTicker
                  value={s.value}
                  startValue={s.start ?? 0}
                  delay={0.2 + i * 0.1}
                  className="tracking-tight text-navy dark:text-navy"
                />
                {s.suffix}
              </p>
              <p className="mt-3 text-sm uppercase tracking-wide text-ink/60">{s.label}</p>
              {s.note && <p className="mt-1 text-xs text-ink/45">{s.note}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Stacked business cards: on desktop each card pins under the previous one as you scroll. */
export function BusinessDirectory({ pages }: { pages: BusinessPageData[] }) {
  return (
    <section className="pb-20 md:pb-28">
      <div className="container-x">
        {pages.map((b, i) => (
          <div
            key={b.slug}
            className="pb-6 md:sticky md:pb-10"
            style={{ top: `calc(6.5rem + ${i * 1.25}rem)` }}
          >
            <motion.article
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease }}
              className="group relative grid overflow-hidden rounded-3xl bg-ink text-white shadow-[0_40px_80px_-40px_rgba(12,17,27,0.6)] ring-1 ring-white/10 md:min-h-[520px] md:grid-cols-[1.05fr_1fr]"
            >
              {/* soft brand glow */}
              <span className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-brand/30 blur-[100px] transition-opacity duration-700 group-hover:opacity-80 md:opacity-50" />

              <div className="relative flex flex-col p-6 sm:p-8 lg:p-12">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm tracking-[0.2em] text-white/50">
                    / {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                    {b.companies.length} {b.companies.length === 1 ? "company" : "companies"}
                  </span>
                </div>
                <h2 className="mt-6 text-3xl font-normal tracking-tight md:text-[2.6rem] md:leading-[1.1]">{b.label}</h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-white/65 md:text-lg">{b.tagline}</p>

                <ul className="mt-8 flex flex-wrap gap-2">
                  {b.companies.map((c) => (
                    <li
                      key={c.name}
                      className="rounded-full bg-white/[0.07] px-3.5 py-1.5 text-xs text-white/80 ring-1 ring-white/10 transition-colors hover:bg-white/15 md:text-[13px]"
                    >
                      {c.name}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 md:mt-auto md:pt-10">
                  <ArrowButton href={`/${b.slug}`} variant="brand">
                    Explore {b.label}
                  </ArrowButton>
                </div>
              </div>

              <Link
                href={`/${b.slug}`}
                aria-label={`Explore ${b.label}`}
                className="relative block min-h-64 overflow-hidden md:m-3 md:ml-0 md:rounded-2xl"
              >
                <Image
                  src={b.heroImage}
                  alt={b.heroAlt}
                  fill
                  sizes="(min-width: 768px) 48vw, 100vw"
                  className={`object-cover transition-transform duration-1000 ease-out group-hover:scale-105 ${b.heroPosition ?? ""}`}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent md:bg-gradient-to-r md:from-ink/40" />
                <span className="absolute bottom-5 right-5 grid size-12 place-items-center rounded-full bg-white text-ink transition-all duration-500 group-hover:rotate-45 group-hover:bg-brand group-hover:text-white">
                  <ArrowUpRight className="size-5" />
                </span>
              </Link>
            </motion.article>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CompanyLogos({ pages }: { pages: BusinessPageData[] }) {
  const withLogos = pages.flatMap((p) => p.companies).filter((c) => c.logo);
  if (withLogos.length === 0) return null;
  return (
    <section className="border-y border-black/5 bg-paper py-14 md:py-20">
      <div className="container-x text-center">
        <BlurFade inView>
          <Eyebrow className="justify-center">The group</Eyebrow>
        </BlurFade>
        <BlurFade inView delay={0.05}>
          <h2 className="mt-3 text-2xl tracking-tight text-ink md:text-4xl">Companies of the JLSmith Group</h2>
        </BlurFade>
      </div>
      <div className="relative mt-10 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <Marquee pauseOnHover className="[--duration:35s] [--gap:1.25rem]">
          {withLogos.map((c) => (
            <a
              key={c.name}
              href={c.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${c.name} website (opens in a new tab)`}
              className="grid h-24 w-56 place-items-center rounded-2xl bg-white px-6 ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(27,43,64,0.35)] md:h-28 md:w-64"
            >
              <span className="relative h-10 w-full md:h-12">
                <Image src={c.logo!} alt={`${c.name} logo`} fill sizes="256px" className="object-contain" />
              </span>
            </a>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

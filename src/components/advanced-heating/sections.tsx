"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Link2 } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { ArrowButton, Eyebrow } from "@/components/shared";
import { RevealHeading } from "@/components/about/ui";
import { PageHero } from "@/components/page-hero";

const ease = [0.22, 1, 0.36, 1] as const;

export const heatingImages = {
  hero: "/images/advance-heating/hero-welding.png",
  company: "/images/advance-heating/company-shanghai-qianka.png",
};

export function HeatingHero() {
  return (
    <PageHero
      image={heatingImages.hero}
      alt="Technician welding steel beams"
      lines={["Advanced Heating & Thermal", "Solutions for Industry"]}
      imageClassName="object-[70%_center]"
    />
  );
}

const body =
  "The group's flagship company in this sector, TCS was founded in the truly entrepreneurial and pioneering spirit that is the hallmark of the Tatas and began as a computer operation meant to serve other companies in the group. Today, the corporation is India's largest by far, and ranks among the world's top three. The group's flagship company in this sector, TCS was founded in the truly entrepreneurial and pioneering spirit that is the hallmark of the Tatas and began as a computer operation meant to serve other companies in the group. Today, the corporation is India's largest by far, and ranks among the world's top three.";

export function HeatingOverview() {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <BlurFade inView>
          <Eyebrow>About us</Eyebrow>
        </BlurFade>
        <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <RevealHeading
            lines={["Advanced Heating & Thermal", "Solutions for Industry."]}
            className="text-ink sm:text-4xl lg:text-[2.6rem]"
          />
          <BlurFade inView delay={0.2} className="shrink-0 md:pt-3">
            <ArrowButton href="/#insights">View All Articles</ArrowButton>
          </BlurFade>
        </div>
        <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-ink/85 md:text-base">
          <BlurFade inView delay={0.1}>
            <p>{body}</p>
          </BlurFade>
          <BlurFade inView delay={0.2}>
            <p>{body}</p>
          </BlurFade>
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

const companies = [
  {
    name: "SHANGHAI QIANKA TRADING co",
    text: "Solid-state batteries could redefine energy density, safety, and charging performance. Discover the technology behind the next generation of energy storage. Solid-state batteries could redefine energy density, safety, and charging performance.",
    image: heatingImages.company,
    website: "#",
    linkedin: "#",
    href: "#",
  },
];

export function HeatingCompanies() {
  return (
    <section className="pb-10 md:pb-16">
      <div className="container-x space-y-8">
        {companies.map((c) => (
          <motion.article
            key={c.name}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="group grid items-center gap-8 rounded-2xl border border-black/10 bg-paper p-4 md:grid-cols-2 md:gap-10 md:p-5 lg:p-6"
          >
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl md:aspect-[1.86]">
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <div className="px-2 pb-4 md:px-0 md:pb-0 md:pr-4">
              <h3 className="text-lg font-medium text-ink md:text-xl">{c.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{c.text}</p>
              <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
                <div className="flex gap-3">
                  <a
                    href={c.website}
                    aria-label={`${c.name} website`}
                    className="grid size-9 place-items-center rounded-full bg-brand text-white transition hover:-translate-y-0.5 hover:bg-brand-dark"
                  >
                    <Link2 className="size-4" />
                  </a>
                  <a
                    href={c.linkedin}
                    aria-label={`${c.name} on LinkedIn`}
                    className="grid size-9 place-items-center rounded-full bg-brand text-white transition hover:-translate-y-0.5 hover:bg-brand-dark"
                  >
                    <LinkedinIcon className="size-4" />
                  </a>
                </div>
                <Link
                  href={c.href}
                  aria-label={`Learn more about ${c.name}`}
                  className="grid size-9 place-items-center rounded-md border-2 border-ink bg-brand text-white transition hover:bg-brand-dark"
                >
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

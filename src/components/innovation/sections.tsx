"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { ArrowButton, Eyebrow } from "@/components/shared";
import { RevealHeading } from "@/components/about/ui";
import { PageHero } from "@/components/page-hero";

const ease = [0.22, 1, 0.36, 1] as const;

const images = {
  hero: "/images/innovation/hero-robotics.png",
  platform: "/images/innovation/ev-battery-platform.png",
};

const features = ["Silicon-anode cell architecture", "800V ultra-fast charging capability", "Extreme-temperature active cooling"];
const blurb =
  "High-performance battery platforms built for the next generation of electric mobility, delivering ultra-fast charging and superior range.";

export const pillars = [
  { id: "research-development", title: ["Research & Development"], text: blurb, features, image: images.platform, href: "#" },
  { id: "engineering-operational-excellence", title: ["Engineering &", "Operational Excellence"], text: blurb, features, image: images.platform, href: "#" },
  { id: "smart-sustainable-manufacturing", title: ["Smart & Sustainable", "Manufacturing"], text: blurb, features, image: images.platform, href: "#" },
];

export function InnovationHero() {
  return <PageHero image={images.hero} alt="Robotic assembly line in a modern factory" lines={["Innovation &", "Sustainability"]} />;
}

export function InnovationIntro() {
  return (
    <section className="pb-10 pt-20 md:pb-12 md:pt-28">
      <div className="container-x grid gap-6 md:grid-cols-2 md:items-end md:gap-12">
        <div>
          <BlurFade inView>
            <Eyebrow>Innovation &amp; Sustainability</Eyebrow>
          </BlurFade>
          <RevealHeading
            lines={["Innovation That Moves", "Business Forward."]}
            className="mt-3 text-ink sm:text-4xl lg:text-[2.6rem]"
          />
        </div>
        <BlurFade inView delay={0.15}>
          <p className="max-w-xl text-[15px] leading-relaxed text-ink/85 md:pb-3">
            From research and engineering to manufacturing and market development, we continuously look for better ways
            to solve problems, create value and respond to a changing world.
          </p>
        </BlurFade>
      </div>
    </section>
  );
}

export function InnovationPillars() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="container-x space-y-10 md:space-y-14">
        {pillars.map((p, i) => (
          <motion.article
            key={p.id}
            id={p.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="group grid scroll-mt-28 gap-8 rounded-2xl border border-black/5 bg-[#f3f3f3] p-5 md:grid-cols-2 md:gap-12 md:p-7 lg:p-8"
          >
            <div className="flex flex-col">
              <p className="text-2xl text-ink md:text-3xl">/ {String(i + 1).padStart(2, "0")}</p>
              <RevealHeading lines={p.title} as="h3" className="mt-6 text-ink sm:text-3xl lg:text-[2.1rem]" />
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink/60">{p.text}</p>
              <ul className="mt-6 max-w-sm">
                {p.features.map((f, j) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease, delay: 0.2 + j * 0.1 }}
                    className="flex items-center gap-4 border-black/10 py-3.5 text-sm text-ink [&:not(:last-child)]:border-b"
                  >
                    <span className="size-2 shrink-0 rounded-full bg-brand" />
                    {f}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 md:mt-auto md:pt-10">
                <ArrowButton href={p.href} variant="brand">
                  Explore More
                </ArrowButton>
              </div>
            </div>
            <div className="relative aspect-[654/571] overflow-hidden rounded-2xl">
              <Image
                src={p.image}
                alt=""
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

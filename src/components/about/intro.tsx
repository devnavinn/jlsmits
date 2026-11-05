"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { IconCard, PillLink, RevealHeading } from "./ui";
import { aboutImages, coreValues, introStats } from "@/lib/about-data";

export function Intro() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <RevealHeading lines={["From material innovation", "to industrial performance"]} />

        <div className="space-y-8 lg:pt-24">
          <BlurFade inView>
            <p className="text-base leading-relaxed text-ink/55 md:text-[17px]">
              With decades of manufacturing experience and a growing global supply network, we support customers who
              need more than a catalogue supplier. At Smith Qianka, we deliver composite, mica and carbon fiber
              solutions for industries that cannot compromise on material reliability - from standard material forms
              to custom fabricated components built around real-world application performance.
            </p>
          </BlurFade>
          <BlurFade inView delay={0.1}>
            <h3 className="text-lg uppercase text-navy">Our Mission</h3>
            <p className="mt-3 text-base leading-relaxed text-ink/55 md:text-[17px]">
              Our mission is to help industries source materials with confidence - not just by supplying products, but
              by supporting the full journey from material selection to application-ready performance. We aim to be a
              trusted global partner for composite, mica and carbon fiber solutions where quality, consistency and
              long-term reliability matter.
            </p>
          </BlurFade>

          <div className="grid border border-black/15 sm:grid-cols-3">
            {introStats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.6 }}
                className="group relative flex flex-col justify-between gap-8 border-black/15 p-6 transition-colors hover:bg-[#f6f8fb] max-sm:[&:not(:last-child)]:border-b sm:[&:not(:last-child)]:border-r"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                <p className="text-sm uppercase leading-snug text-ink/55">{s.label}</p>
                <div>
                  <p className="text-5xl font-light text-navy">
                    <NumberTicker value={s.value} delay={0.2 + i * 0.15} className="tracking-tight text-navy dark:text-navy" />
                    {s.suffix}
                  </p>
                  <p className="mt-1 text-navy/80">{s.unit}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CoreValues() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="container-x">
        <RevealHeading lines={["Our Core Values"]} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {coreValues.map((v, i) => (
            <IconCard key={v.title} {...v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ParallaxPhoto({ src, alt, delay = 0 }: { src: string; alt: string; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-80px" }}
      className="group relative aspect-[560/530] overflow-hidden rounded-2xl"
    >
      <motion.div
        className="absolute inset-0"
        variants={{ hidden: { scale: 1.3 }, shown: { scale: 1 } }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width:1024px) 32vw, (min-width:640px) 50vw, 100vw"
          className="scale-110 object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-100"
        />
      </motion.div>
      {/* curtain wipe */}
      <motion.span
        aria-hidden
        className="absolute inset-0 origin-top bg-white"
        variants={{ hidden: { scaleY: 1 }, shown: { scaleY: 0 } }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay }}
      />
    </motion.div>
  );
}

export function People() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <RevealHeading lines={["Our People"]} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr] lg:gap-7">
          <ParallaxPhoto src={aboutImages.peopleFactory} alt="Two managers talking on the factory floor" />
          <ParallaxPhoto src={aboutImages.peopleOffice} alt="Colleagues walking through the office" delay={0.15} />
          <BlurFade inView delay={0.3} className="sm:col-span-2 lg:col-span-1 lg:pl-6 lg:pt-12">
            <p className="text-lg leading-relaxed text-ink/55">
              Our team brings together manufacturing experience, technical knowledge and customer-focused thinking to
              support industries that depend on reliable material performance. From leadership to production, every
              team works with one goal — delivering dependable solutions with clarity, quality and commitment.
            </p>
            <PillLink className="mt-10">Meet our team</PillLink>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}

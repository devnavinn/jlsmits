"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { IconCard, PillLink, RevealHeading } from "./ui";
import { aboutImages, discover, features, globalShifts, infraStats } from "@/lib/about-data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* ---------------------------------- Infrastructure ---------------------------------- */

export function Infrastructure() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section className="pb-20 md:pb-28">
      <div className="container-x">
        <RevealHeading lines={["Our Infrastructure"]} />
      </div>
      <div className="mt-12 px-3 md:px-5">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease }}
          className="grid overflow-hidden rounded-3xl lg:grid-cols-2"
        >
          <div className="relative min-h-[320px] overflow-hidden sm:min-h-[420px] lg:min-h-[640px]">
            <motion.div style={{ y: imgY }} className="absolute -inset-y-[10%] inset-x-0">
              <Image src={aboutImages.infrastructure} alt="Aerial view of the manufacturing campus" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
            </motion.div>
          </div>
          <div className="flex flex-col justify-center bg-gradient-to-b from-[#66788a] to-[#a3b4c6] p-8 text-white sm:p-12 xl:p-16">
            <RevealHeading lines={["Infrastructure built for", "industrial scale"]} as="h3" className="text-white" />
            <p className="mt-8 max-w-2xl leading-relaxed text-white/75">
              Across four specialised manufacturing units, Smith Composite brings together material preparation,
              impregnation, composite sheet production and precision fabrication within one integrated production
              network.
            </p>
            <div className="mt-12 grid gap-8 sm:flex sm:gap-0">
              {infraStats.map((s, i) => (
                <div
                  key={s.label}
                  className={cn("sm:px-5 xl:px-7", i === 0 && "sm:pl-0 xl:pl-0", i > 0 && "sm:border-l sm:border-white/40")}
                >
                  <p className="whitespace-nowrap text-4xl font-light 2xl:text-5xl">
                    <NumberTicker value={s.value} delay={0.2 * i} className="tracking-tight text-white dark:text-white" />
                    {s.suffix}
                    {s.unit && <span className="ml-2 text-xl">{s.unit}</span>}
                  </p>
                  <p className="mt-2 max-w-[9rem] text-sm text-white/75 xl:text-base">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <PillLink variant="white">Explore our infrastructure</PillLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------------------- Global shifts ---------------------------------- */

export function GlobalShifts() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="container-x">
        <RevealHeading lines={["Global shifts shaping", "our material direction"]} />
        <BlurFade inView delay={0.2}>
          <p className="mt-6 max-w-3xl leading-relaxed text-ink/60">
            Industrial materials are evolving with electrification, energy transition, automation and sustainability.
            Smith Composite aligns its development with these future industry needs.
          </p>
        </BlurFade>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {globalShifts.map((v, i) => (
            <IconCard key={v.title} {...v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Sustainability ---------------------------------- */

function RatingBadge() {
  // Placeholder for the official sustainability rating badge — swap for the real badge image.
  return (
    <motion.div
      initial={{ scale: 0, rotate: -120 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.4 }}
      className="relative grid size-36 place-items-center rounded-full bg-gradient-to-br from-[#f6e3a1] via-[#c99a3b] to-[#f2d98a] p-1.5 shadow-2xl md:size-40"
    >
      <div className="grid size-full place-items-center rounded-full bg-white text-center">
        <div>
          <p className="text-[11px] font-semibold text-[#8a6a1f]">GOLD | Top 5%</p>
          <p className="mt-1 text-xl font-medium tracking-tight text-[#2d3a35]">ecovadis</p>
          <p className="text-[10px] text-[#2d3a35]/70">Sustainability Rating</p>
          <p className="mt-1 text-xs font-semibold text-[#2d3a35]">FEB 2026</p>
        </div>
      </div>
      <motion.span
        className="pointer-events-none absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0_80%,rgba(255,255,255,0.8)_88%,transparent_96%)] mix-blend-overlay"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}

export function Sustainability() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.08, 1.2]);

  return (
    <section className="px-3 pb-20 md:px-5 md:pb-28">
      <div ref={ref} className="relative isolate overflow-hidden rounded-3xl py-20 md:py-28">
        <motion.div style={{ y: bgY, scale: bgScale }} className="absolute -inset-y-[15%] inset-x-0 -z-10">
          <Image src={aboutImages.leaves} alt="" fill sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-black/20" />

        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
            className="relative mt-16 max-w-xl rounded-3xl bg-[#1d1d1b]/85 p-8 pt-24 backdrop-blur-md sm:p-12 sm:pt-28 lg:ml-[10%]"
          >
            <div className="absolute -top-16 left-8 sm:left-1/2 sm:-translate-x-1/2 lg:left-[38%]">
              <RatingBadge />
            </div>
            <h2 className="text-3xl font-normal leading-tight text-white md:text-5xl">
              Sustainable Manufacturing for Long-Term Value
            </h2>
            <p className="mt-10 leading-relaxed text-white/75">
              We focus on efficient manufacturing, durable material performance, and long product life to help reduce
              waste, replacements, and overall greenhouse gas impact.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- Stacking feature cards ---------------------------------- */

function FeatureCard({
  f,
  i,
  total,
  progress,
}: {
  f: (typeof features)[number];
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Earlier cards shrink slightly as later ones stack over them.
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.04]);
  const dark = f.tone === "dark";

  return (
    <div className="sticky top-24 md:top-28" style={{ paddingTop: `${i * 24}px` }}>
      <motion.article
        style={{ scale }}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
        className={cn(
          "group grid origin-top overflow-hidden rounded-3xl shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.35)] md:grid-cols-2",
          dark ? "bg-[#202d3b] text-white" : "bg-[#f3f3f3] text-navy",
        )}
      >
        <div className={cn("relative min-h-[260px] overflow-hidden md:min-h-[520px]", f.imageSide === "right" && "md:order-2")}>
          <Image
            src={f.image}
            alt=""
            fill
            sizes="(min-width:768px) 40vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center p-8 sm:p-12 xl:p-14">
          <h3 className="text-3xl font-normal leading-tight tracking-tight md:text-[2.6rem]">{f.title}</h3>
          <div className={cn("mt-8 space-y-5 text-[15px] leading-relaxed", dark ? "text-white/60" : "text-ink/55")}>
            {f.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function FeatureStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="pb-20 md:pb-28">
      <div ref={ref} className="mx-auto flex max-w-[1340px] flex-col gap-8 px-5 md:px-10 lg:px-24">
        {features.map((f, i) => (
          <FeatureCard key={i} f={f} i={i} total={features.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------- Discover ---------------------------------- */

export function Discover() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="container-x">
        <RevealHeading lines={["Discover more about how we work"]} />
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-7">
          {discover.map((d, i) => (
            <motion.article
              key={d.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.12 }}
              className="group"
            >
              <Link href="#" className="block">
                <div className="relative aspect-[555/373] overflow-hidden rounded-2xl">
                  <Image
                    src={d.image}
                    alt=""
                    fill
                    sizes="(min-width:768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-navy/0 transition-colors duration-500 group-hover:bg-navy/20" />
                  <span className="absolute right-4 top-4 grid size-11 translate-y-2 place-items-center rounded-full bg-white text-navy opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="size-5" />
                  </span>
                </div>
                <h3 className="mt-6 text-2xl text-navy">{d.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/55">{d.text}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-wide text-navy">
                  <span className="relative">
                    {d.cta}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-navy transition-transform duration-500 group-hover:scale-x-100" />
                  </span>
                  <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

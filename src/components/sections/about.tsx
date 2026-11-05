"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { ArrowButton, Eyebrow } from "@/components/shared";
import { images } from "@/lib/data";
import { cn } from "@/lib/utils";

type StatProps = {
  title: string;
  text: string;
  value: number;
  suffix: string;
  tone: "brand" | "light" | "navy";
  className?: string;
};

function StatCard({ title, text, value, suffix, tone, className }: StatProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "relative flex h-full flex-col justify-between overflow-hidden rounded-xl p-5 md:p-6",
        tone === "brand" && "bg-brand text-white",
        tone === "navy" && "bg-navy text-white",
        tone === "light" && "border border-black/5 bg-paper text-ink",
        className,
      )}
    >
      {tone === "brand" && (
        <svg className="pointer-events-none absolute -right-2 -top-2 h-40 w-40 opacity-30" viewBox="0 0 100 100" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="95" y1="5" x2={20 + i * 18} y2={70 + (i % 2) * 10} stroke="white" strokeWidth="0.6" />
          ))}
        </svg>
      )}
      <div className="relative">
        <h3 className="text-xl font-medium leading-tight md:text-2xl">{title}</h3>
        <p className={cn("mt-2 max-w-[16rem] text-sm leading-snug", tone === "light" ? "text-ink/75" : "text-white/85")}>
          {text}
        </p>
      </div>
      <p className="relative mt-10 text-5xl font-light tracking-tight md:text-6xl">
        <NumberTicker value={value} className="tracking-tight text-inherit dark:text-inherit" />
        {suffix}
      </p>
    </motion.div>
  );
}

function Photo({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={cn("group relative overflow-hidden rounded-xl bg-ink", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 20vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
    </div>
  );
}

export function About() {
  const global = { title: "Global Locations", text: "A growing business presence across markets and industries.", value: 15, suffix: "+" };
  const growth = { title: "Operational Growth", text: "A measurable indicator of operational growth and progress.", value: 30, suffix: "%" };
  const markets = { title: "Markets Served", text: "Customers, products or annual production capacity, depending on actual data.", value: 500, suffix: "K+" };
  const brands = { title: "Businesses & Brands", text: "Specialized businesses serving diverse markets and industries.", value: 12, suffix: "+" };

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container-x">
        <BlurFade inView>
          <Eyebrow>Who we are</Eyebrow>
        </BlurFade>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <BlurFade inView delay={0.05}>
            <h2 className="max-w-3xl text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.4rem]">
              One Group. Diverse Businesses.
              <br className="hidden sm:block" /> A Shared Vision.
            </h2>
          </BlurFade>
          <BlurFade inView delay={0.1}>
            <ArrowButton href="#business">Discover our story</ArrowButton>
          </BlurFade>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-16 lg:mt-12">
          <BlurFade inView delay={0.15}>
            <p className="max-w-xl text-base leading-relaxed text-ink/85 md:text-lg">
              JLSmith Group is a diversified business group bringing together specialized companies across
              manufacturing, materials, consumer products, commerce and innovation.
            </p>
          </BlurFade>
          <BlurFade inView delay={0.2} className="space-y-3 md:justify-self-end">
            <p className="max-w-xl text-base leading-relaxed text-ink/55 md:text-lg">
              Each business operates with its own expertise and market focus, while benefiting from the
              Group&apos;s broader capabilities, entrepreneurial approach and long-term vision.
            </p>
            <p className="max-w-xl text-base leading-relaxed text-ink/85 md:text-lg">
              From industrial materials to consumer solutions and new business opportunities, we continue to
              build businesses that create lasting value.
            </p>
          </BlurFade>
        </div>

        {/* Desktop staggered bento */}
        <div className="mt-16 hidden grid-cols-5 gap-4 lg:grid xl:gap-5">
          <BlurFade inView delay={0.05} className="mt-[13.5rem] h-[22rem]">
            <StatCard {...global} tone="brand" />
          </BlurFade>
          <div className="flex flex-col gap-4 xl:gap-5">
            <BlurFade inView delay={0.1} className="h-[22rem]">
              <Photo src={images.statsDark} alt="Battery energy storage unit" className="h-full" />
            </BlurFade>
            <BlurFade inView delay={0.15} className="h-[22rem]">
              <StatCard {...growth} tone="light" />
            </BlurFade>
          </div>
          <BlurFade inView delay={0.2} className="mt-[13.5rem] h-[22rem]">
            <Photo src={images.statsFactory} alt="Automated factory production line" className="h-full" />
          </BlurFade>
          <div className="flex flex-col gap-4 xl:gap-5">
            <BlurFade inView delay={0.25} className="h-[22rem]">
              <StatCard {...markets} tone="light" />
            </BlurFade>
            <BlurFade inView delay={0.3} className="h-[22rem]">
              <Photo src={images.statsMachine} alt="Industrial machining equipment" className="h-full" />
            </BlurFade>
          </div>
          <BlurFade inView delay={0.35} className="mt-[13.5rem] h-[22rem]">
            <StatCard {...brands} tone="navy" />
          </BlurFade>
        </div>

        {/* Mobile / tablet grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
          <BlurFade inView className="h-64"><StatCard {...global} tone="brand" /></BlurFade>
          <BlurFade inView delay={0.05} className="h-64"><Photo src={images.statsDark} alt="Battery energy storage unit" className="h-full" /></BlurFade>
          <BlurFade inView delay={0.1} className="h-64"><StatCard {...growth} tone="light" /></BlurFade>
          <BlurFade inView delay={0.15} className="h-64"><Photo src={images.statsFactory} alt="Automated factory production line" className="h-full" /></BlurFade>
          <BlurFade inView delay={0.2} className="h-64"><StatCard {...markets} tone="light" /></BlurFade>
          <BlurFade inView delay={0.25} className="h-64"><Photo src={images.statsMachine} alt="Industrial machining equipment" className="h-full" /></BlurFade>
          <BlurFade inView delay={0.3} className="h-64 sm:col-span-2"><StatCard {...brands} tone="navy" /></BlurFade>
        </div>
      </div>
    </section>
  );
}

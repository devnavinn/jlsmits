"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { ArrowButton, Eyebrow } from "@/components/shared";
import { businesses } from "@/lib/data";
import { cn } from "@/lib/utils";

const DURATION = 6000;

export function Portfolio() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const item = businesses[active];

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % businesses.length), DURATION);
    return () => clearTimeout(t);
  }, [active, paused]);

  return (
    <section id="business" className="pt-8 md:pt-16">
      <div className="container-x text-center">
        <BlurFade inView>
          <Eyebrow className="justify-center">Our businesses</Eyebrow>
        </BlurFade>
        <BlurFade inView delay={0.05}>
          <h2 className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl lg:text-[3.4rem]">
            A Portfolio Built for Tomorrow.
          </h2>
        </BlurFade>
        <BlurFade inView delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink/80 md:text-lg">
            Our diverse businesses operate across industries, combining specialist expertise with a shared
            commitment to innovation, quality and sustainable growth.
          </p>
        </BlurFade>
      </div>

      <div
        className="relative mt-12 md:mt-16"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Banner */}
        <div className="relative isolate h-[560px] overflow-hidden bg-[radial-gradient(ellipse_at_70%_40%,#8a8f96_0%,#5d636b_40%,#2b3038_100%)] md:h-[620px] lg:h-[680px]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={item.image}
              initial={{ opacity: 0, x: 60, scale: 1.05 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 right-0 -z-10 w-full md:w-[62%] [mask-image:linear-gradient(to_right,transparent,black_30%)]"
            >
              <Image src={item.image} alt={item.title} fill sizes="(min-width:768px) 62vw, 100vw" className="object-cover object-center" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#22272e]/90 via-[#2a2f37]/30 to-transparent" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/10 to-transparent md:hidden" />

          <div className="container-x flex h-full flex-col justify-start pt-16 md:justify-center md:pb-24 md:pt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={item.tab}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(8px)" }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl text-white"
              >
                <p className="font-mono text-sm uppercase tracking-[0.2em] text-white/90">{item.brand}</p>
                <h3 className="mt-2 text-3xl font-medium leading-tight tracking-tight md:text-5xl">{item.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">{item.description}</p>
                <ArrowButton href="#" className="mt-8">Discover More</ArrowButton>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Tabs card overlapping the banner */}
        <div className="container-x relative -mt-28 md:-mt-16">
          <div
            role="tablist"
            aria-label="Our businesses"
            className="grid grid-cols-2 overflow-hidden rounded-xl border border-black/10 bg-paper shadow-[0_30px_60px_-20px_rgba(0,0,0,0.25)] sm:grid-cols-3 lg:inline-grid lg:grid-cols-5"
          >
            {businesses.map((b, i) => (
              <button
                key={b.tab}
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "relative px-5 py-5 text-left text-[15px] leading-tight transition-colors md:px-8 md:py-7 md:text-lg lg:min-w-44",
                  i === active ? "font-medium text-brand" : "text-ink hover:text-brand",
                  i === businesses.length - 1 && "col-span-2 sm:col-span-1",
                )}
              >
                <span className="absolute inset-x-0 top-0 h-[3px] bg-black/5">
                  {i === active && (
                    <motion.span
                      key={`${active}-${paused}`}
                      className="block h-full origin-left bg-brand"
                      initial={{ scaleX: paused ? 1 : 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: paused ? 0 : DURATION / 1000, ease: "linear" }}
                    />
                  )}
                </span>
                <span className="block max-w-[9rem]">{b.tab}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

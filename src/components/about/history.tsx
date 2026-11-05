"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "motion/react";
import { aboutImages, founder, milestones } from "@/lib/about-data";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/** Greyscale building photo with an orbiting blue crescent behind it. */
function OrbitPhoto({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease }}
      className={cn("group relative size-44 shrink-0 md:size-56 lg:size-64", className)}
    >
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute inset-0 -translate-x-2.5 -translate-y-1.5 rounded-full bg-brand" />
      </motion.div>
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <Image
          src={aboutImages.timeline}
          alt="Smith Group heritage building"
          fill
          sizes="256px"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
    </motion.div>
  );
}

function Milestone({ m, i }: { m: (typeof milestones)[number]; i: number }) {
  const left = i % 2 === 0;
  return (
    <div className="relative grid grid-cols-[2rem_1fr] gap-x-5 pb-14 lg:grid-cols-[1fr_4rem_1fr] lg:gap-x-6 lg:pb-10">
      {/* Dot */}
      <div className="relative col-start-1 flex justify-center pt-4 lg:col-start-2 lg:row-start-1">
        <motion.span
          initial={{ scale: 0.6, backgroundColor: "#4a5d73" }}
          whileInView={{ scale: 1, backgroundColor: "#ffffff" }}
          viewport={{ once: false, margin: "-45% 0px -45% 0px" }}
          transition={{ duration: 0.4 }}
          className="relative z-10 block size-5 rounded-full ring-4 ring-[#3d84c6]/50"
        />
      </div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: left ? -50 : 50, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease }}
        className={cn(
          "col-start-2 row-start-1 max-w-md",
          left ? "lg:col-start-1 lg:justify-self-end lg:text-right" : "lg:col-start-3",
        )}
      >
        <p className="text-5xl font-extralight tracking-tight text-white md:text-6xl">{m.year}</p>
        <h3 className="mt-2 text-lg text-white md:text-xl">{m.title}</h3>
        <p className="mt-4 text-[15px] leading-relaxed text-white/50">{m.text}</p>
        {m.image && <OrbitPhoto className="mt-8 lg:hidden" />}
      </motion.div>

      {/* Photo on the opposite side (desktop) */}
      {m.image && (
        <div
          className={cn(
            "row-start-1 hidden items-center lg:flex",
            left ? "lg:col-start-3 lg:justify-start lg:pl-[12%]" : "lg:col-start-1 lg:justify-end lg:pr-[12%]",
          )}
        >
          <OrbitPhoto />
        </div>
      )}
    </div>
  );
}

export function History() {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: lineRef, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="px-3 md:px-5">
      <div className="relative isolate overflow-hidden rounded-3xl bg-[#2b3745] px-5 py-20 md:px-10 md:py-28">
        {/* drifting diagonal light streaks */}
        <motion.div
          aria-hidden
          className="absolute -inset-[20%] -z-10 opacity-70"
          animate={{ x: ["0%", "6%", "0%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "linear-gradient(135deg, transparent 0 22%, rgba(255,255,255,0.035) 22% 34%, transparent 34% 52%, rgba(255,255,255,0.04) 52% 60%, transparent 60% 74%, rgba(255,255,255,0.03) 74% 86%, transparent 86%)",
          }}
        />

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="text-center text-[2rem] font-normal tracking-tight text-white sm:text-5xl lg:text-[3.6rem]"
        >
          A History of Success
        </motion.h2>

        {/* Founder */}
        <div className="mx-auto mt-14 grid max-w-6xl items-center gap-10 md:mt-20 md:grid-cols-[minmax(0,26rem)_1fr] md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease }}
            className="group relative mx-auto aspect-[416/450] w-full max-w-sm overflow-hidden rounded-2xl bg-[#202c39] md:max-w-none"
          >
            <span className="absolute inset-x-10 bottom-0 top-1/4 rounded-full bg-[#3d84c6]/20 blur-3xl transition-opacity duration-700 group-hover:opacity-100 md:opacity-60" />
            <Image
              src={aboutImages.founder}
              alt={founder.name}
              fill
              sizes="(min-width:768px) 26rem, 90vw"
              className="object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease, delay: 0.15 }}
          >
            <h3 className="text-3xl text-white md:text-4xl">{founder.name}</h3>
            <p className="mt-1 text-[#6f7bff]">{founder.role}</p>
            <div className="mt-8 space-y-6 text-[15px] leading-relaxed text-white/60">
              {founder.paragraphs.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div ref={lineRef} className="relative mx-auto mt-20 max-w-6xl md:mt-28">
          {/* track + scroll-driven fill */}
          <div className="absolute bottom-0 left-4 top-0 w-px -translate-x-1/2 border-l border-dashed border-white/25 lg:left-1/2" />
          <motion.div
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-4 top-0 w-0.5 origin-top -translate-x-1/2 bg-gradient-to-b from-[#3d84c6] via-white to-brand lg:left-1/2"
          />
          {milestones.map((m, i) => (
            <Milestone key={m.year + m.title} m={m} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

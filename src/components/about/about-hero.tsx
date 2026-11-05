"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { aboutImages } from "@/lib/about-data";

const ease = [0.22, 1, 0.36, 1] as const;

/** Concentric-outline "50 YEARS" emblem: strokes draw in, then a silver shine sweeps across. */
function FiftyEmblem() {
  // Alternating white/black strokes in a mask produce the parallel "inline" outlines.
  const layers = [
    { w: 30, c: "white" },
    { w: 23, c: "black" },
    { w: 15, c: "white" },
    { w: 8, c: "black" },
    { w: 2.5, c: "white" },
  ];
  return (
    <svg viewBox="0 0 640 380" className="w-[min(78vw,600px)] overflow-visible" role="img" aria-label="50 years">
      <defs>
        <linearGradient id="silver" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5f7fa" />
          <stop offset="0.45" stopColor="#9aa3ad" />
          <stop offset="0.6" stopColor="#ffffff" />
          <stop offset="1" stopColor="#7d8692" />
        </linearGradient>
        <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.5" stopColor="white" stopOpacity="0.95" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="fifty" maskUnits="userSpaceOnUse" x="-50" y="-50" width="760" height="500">
          <rect x="-50" y="-50" width="760" height="500" fill="black" />
          {layers.map((l, i) => (
            <motion.text
              key={i}
              x="18"
              y="338"
              fontSize="420"
              fontWeight={300}
              letterSpacing="-28"
              fill="none"
              stroke={l.c}
              strokeWidth={l.w}
              strokeLinejoin="round"
              style={{ fontFamily: "var(--font-grotesk)" }}
              strokeDasharray="2600"
              initial={{ strokeDashoffset: 2600 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 2.6, ease: [0.65, 0, 0.35, 1], delay: 0.4 }}
            >
              50
            </motion.text>
          ))}
          {/* cut-out behind YEARS */}
          <rect x="395" y="148" width="250" height="66" fill="black" />
        </mask>
      </defs>

      <rect x="-50" y="-50" width="760" height="500" fill="url(#silver)" mask="url(#fifty)" />
      {/* moving shine */}
      <motion.rect
        x="-300"
        y="-50"
        width="260"
        height="500"
        fill="url(#shine)"
        mask="url(#fifty)"
        opacity={0.8}
        animate={{ x: [-300, 760] }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut", delay: 2.8 }}
        style={{ mixBlendMode: "overlay" }}
      />

      {/* YEARS lockup */}
      <motion.g
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease, delay: 2.2 }}
      >
        <line x1="400" y1="150" x2="640" y2="150" stroke="#dfe4ea" strokeWidth="3" />
        <line x1="400" y1="212" x2="640" y2="212" stroke="#dfe4ea" strokeWidth="3" />
        <text
          x="404"
          y="196"
          fill="white"
          fontSize="40"
          letterSpacing="14"
          style={{ fontFamily: "var(--font-grotesk)" }}
        >
          YEARS
        </text>
      </motion.g>
    </svg>
  );
}

export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bar = useTransform(scrollYProgress, [0, 1], [0.35, 1]);

  return (
    <section ref={ref} className="relative isolate h-[86svh] min-h-[560px] overflow-hidden bg-[#0f1724] md:h-[100svh] md:max-h-[980px]">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
        <motion.div
          className="relative h-full w-full"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 6, ease: "easeOut" }}
        >
          <Image src={aboutImages.heroBg} alt="" fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[#0d1626]/55" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(13,22,38,0.2)_0%,rgba(13,22,38,0.85)_75%)]" />

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="flex h-full flex-col items-center justify-center px-5 pt-16 text-center"
      >
        <FiftyEmblem />
        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(8px)" }}
          animate={{ opacity: 1, letterSpacing: "0.06em", filter: "blur(0px)" }}
          transition={{ duration: 1.4, ease, delay: 2.4 }}
          className="mt-6 text-lg font-normal uppercase text-white sm:text-2xl md:text-4xl"
        >
          Five Decades of Material Reliability
        </motion.h1>
      </motion.div>

      {/* bottom gradient progress strip, as in the design */}
      <div className="absolute inset-x-0 bottom-0 h-2.5 bg-white/10 md:inset-x-5">
        <motion.div
          style={{ scaleX: bar }}
          className="h-full origin-left rounded-r-full bg-gradient-to-r from-[#6f8fb5] via-[#b8c6d8] to-[#9aa3ad]"
        />
      </div>
    </section>
  );
}

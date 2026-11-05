"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Pause, Play } from "lucide-react";
import { images } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;
const lines = [
  ["Building", "the", "Foundations", "of"],
  ["Tomorrow’s", "Industries"],
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const reduce = useReducedMotion();

  // scroll parallax
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // cursor spotlight
  const mx = useMotionValue(-500);
  const my = useMotionValue(-500);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, rgba(255,255,255,0.14), transparent 70%)`;

  useEffect(() => {
    if (reduce && videoRef.current) {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, [reduce]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  let wordIndex = 0;

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      className="relative isolate h-[88svh] min-h-[560px] overflow-hidden bg-[#2a2d33] md:h-[100svh] md:max-h-[1040px]"
    >
      {/* Background video with cinematic reveal */}
      <motion.div style={{ y: videoY, scale: videoScale }} className="absolute inset-0 -z-20">
        <motion.div
          className="h-full w-full"
          initial={{ clipPath: "inset(14% 10% 14% 10% round 28px)", scale: 1.25, filter: "blur(12px)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)", scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.8, ease }}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={images.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          />
        </motion.div>
      </motion.div>

      {/* Overlays: legibility gradient, cursor spotlight, faint grid */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/25 to-black/5" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
      <motion.div className="pointer-events-none absolute inset-0 -z-10 hidden md:block" style={{ background: spotlight }} />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at 30% 50%, black, transparent 70%)",
        }}
      />

      {/* Content */}
      <motion.div style={{ y: textY, opacity: fade }} className="container-x flex h-full flex-col justify-center pt-20">
        <h1 className="max-w-5xl text-[2.4rem] font-medium leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
          {lines.map((line, li) => (
            <span key={li} className="block">
              {line.map((word) => {
                const i = wordIndex++;
                return (
                  <span key={word} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "110%", rotate: 4, opacity: 0, filter: "blur(8px)" }}
                      animate={{ y: 0, rotate: 0, opacity: 1, filter: "blur(0px)" }}
                      transition={{ duration: 0.9, ease, delay: 0.9 + i * 0.08 }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease, delay: 1.5 }}
          className="mt-7 h-px w-24 origin-left bg-gradient-to-r from-brand to-white/60"
        />

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease, delay: 1.6 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/90 md:text-xl"
        >
          A Global Group Creating Advanced Materials, Industrial Solutions, and Innovative Businesses
          that Power the Future.
        </motion.p>
      </motion.div>

      {/* Bottom-left: video control + scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="container-x absolute inset-x-0 bottom-6 flex items-center gap-5 md:bottom-10"
      >
        <button
          onClick={toggle}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className="grid size-10 place-items-center rounded-full border border-white/30 text-white backdrop-blur-sm transition-colors hover:bg-white/15"
        >
          {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
        <a
          href="#about"
          className="hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white sm:flex"
        >
          <span className="relative block h-9 w-5 rounded-full border border-white/40">
            <motion.span
              className="absolute left-1/2 top-1.5 block size-1 -translate-x-1/2 rounded-full bg-white"
              animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
          Scroll to explore
        </a>
      </motion.div>

      {/* Decorative stepped blocks (bottom-right) */}
      <div className="pointer-events-none absolute bottom-0 right-0 flex flex-col items-end" aria-hidden>
        <motion.span
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 1.8, ease }}
          className="block h-10 w-8 origin-bottom bg-white md:h-16 md:w-14"
        />
        <div className="flex items-end">
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 1.9, ease }}
            className="block h-10 w-8 origin-right bg-white md:h-16 md:w-14"
          />
          <motion.span
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.7, delay: 2, ease }}
            className="block h-20 w-8 origin-bottom bg-brand md:h-32 md:w-14"
          />
        </div>
      </div>
    </section>
  );
}

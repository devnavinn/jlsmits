"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { RevealHeading } from "@/components/about/ui";
import { cn } from "@/lib/utils";

/** Full-bleed photo banner with a large white title, used by inner pages. */
export function PageHero({
  image,
  alt,
  lines,
  subtitle,
  imageClassName,
  className,
  lightOverlay,
  children,
}: {
  image: string;
  alt: string;
  lines: string[];
  subtitle?: string;
  imageClassName?: string;
  className?: string;
  lightOverlay?: boolean;
  children?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className={cn("relative isolate h-[60svh] min-h-[420px] overflow-hidden bg-ink md:h-[78svh] md:max-h-[820px]", className)}>
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
        <motion.div
          className="relative h-full w-full"
          initial={{ scale: 1.15 }}
          animate={{ scale: 1.03 }}
          transition={{ duration: 5, ease: "easeOut" }}
        >
          <Image src={image} alt={alt} fill priority sizes="100vw" className={cn("object-cover", imageClassName)} />
        </motion.div>
      </motion.div>
      <div className={cn("absolute inset-0 -z-10 bg-gradient-to-r to-transparent", lightOverlay ? "from-ink/50 via-ink/10" : "from-ink/80 via-ink/40")} />
      {!lightOverlay && <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/60 via-transparent to-ink/40" />}

      <motion.div style={{ opacity: fade }} className="container-x flex h-full items-end pb-16 md:items-center md:pb-0 md:pt-24">
        <div>
          <RevealHeading as="h1" lines={lines} className="max-w-4xl text-white sm:text-5xl lg:text-[4rem]" />
          {subtitle && <p className="mt-4 max-w-2xl text-sm text-white/90 md:text-base">{subtitle}</p>}
          {children}
        </div>
      </motion.div>
    </section>
  );
}

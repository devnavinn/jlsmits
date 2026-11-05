"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Download, Hammer, MessageCircleMore, PencilRuler, type LucideIcon } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Eyebrow } from "@/components/shared";

const options: { icon: LucideIcon; lines: [string, string] }[] = [
  { icon: Hammer, lines: ["I Want", "To Remodel"] },
  { icon: PencilRuler, lines: ["I Want", "To New Build"] },
  { icon: MessageCircleMore, lines: ["I Need To Meet", "In Person"] },
  { icon: Download, lines: ["Download", "Brochure"] },
];

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-20 md:py-28">
      {/* faint geometric lines */}
      <svg className="pointer-events-none absolute -left-10 top-10 h-80 w-[28rem] text-ink/5" viewBox="0 0 400 300" fill="none" stroke="currentColor" aria-hidden>
        <path d="M0 0 L140 230 M0 280 L380 60 M300 0 L360 110" />
      </svg>

      <div className="container-x text-center">
        <BlurFade inView><Eyebrow dot={false} className="justify-center">Contact us</Eyebrow></BlurFade>
        <BlurFade inView delay={0.05}>
          <h2 className="mt-5 text-5xl font-semibold uppercase tracking-tight md:text-7xl" aria-label="Let's talk">
            <span aria-hidden>
              L<sup className="-top-[0.35em] text-[0.85em]">E</sup>T<span className="relative -top-[0.35em]">’</span>S{" "}
              <span className="ml-2">Talk</span>
            </span>
          </h2>
        </BlurFade>
        <BlurFade inView delay={0.1}>
          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-ink/85 md:text-lg">
            From research and engineering to manufacturing and market development,
            <br className="hidden md:block" /> we continuously look for better ways to solve problems, create
            value and respond to a changing world.
          </p>
        </BlurFade>

        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {options.map(({ icon: Icon, lines }, i) => (
            <BlurFade key={lines.join()} inView delay={0.1 + i * 0.07}>
              <motion.div whileHover={{ y: -8 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}>
                <Link
                  href="#"
                  className={`group relative flex aspect-square flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl p-4 text-white transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand/30 ${
                    i === 0 ? "bg-brand" : "bg-[#141414]"
                  }`}
                >
                  {/* hover fill */}
                  <span className="absolute inset-0 translate-y-full bg-brand transition-transform duration-500 ease-out group-hover:translate-y-0" />
                  <Icon strokeWidth={1} className="relative size-12 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 md:size-20" />
                  <span className="relative text-sm leading-snug md:text-lg">
                    {lines[0]}
                    <br />
                    {lines[1]}
                  </span>
                </Link>
              </motion.div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

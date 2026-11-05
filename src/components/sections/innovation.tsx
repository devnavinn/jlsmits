"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Eyebrow } from "@/components/shared";
import { innovations } from "@/lib/data";

export function Innovation() {
  return (
    <section id="innovation" className="bg-paper py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-2 md:items-center md:gap-12">
          <div>
            <BlurFade inView><Eyebrow>Innovation &amp; Sustainability</Eyebrow></BlurFade>
            <BlurFade inView delay={0.05}>
              <h2 className="mt-4 max-w-2xl text-3xl font-medium leading-[1.12] tracking-tight sm:text-4xl lg:text-[3.4rem]">
                Innovation That Moves Business Forward.
              </h2>
            </BlurFade>
          </div>
          <BlurFade inView delay={0.1}>
            <p className="max-w-xl text-base leading-relaxed text-ink/80 md:ml-auto">
              From research and engineering to manufacturing and market development, we continuously look for
              better ways to solve problems, create value and respond to a changing world.
            </p>
          </BlurFade>
        </div>

        <BlurFade inView delay={0.15}>
          <div className="mt-12 grid overflow-hidden rounded-2xl border border-black/10 bg-white sm:grid-cols-2 lg:grid-cols-4">
            {innovations.map((item, i) => (
              <article
                key={item.title}
                className="group relative flex flex-col justify-between gap-6 border-black/10 p-6 transition-colors duration-500 hover:bg-[#fafaff] max-sm:border-b max-sm:last:border-b-0 sm:max-lg:[&:nth-child(-n+2)]:border-b sm:max-lg:odd:border-r lg:[&:not(:last-child)]:border-r md:p-8"
              >
                <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand transition-transform duration-500 group-hover:scale-x-100" />
                <div>
                  <p className="font-mono text-sm text-ink/70">{`//0${i + 1}`}</p>
                  <h3 className="mt-2 text-xl font-medium tracking-tight md:text-2xl">{item.title}</h3>
                  <p className="mt-3 max-w-xs text-[15px] leading-snug text-ink/80">{item.description}</p>
                </div>
                {/* line-art "draws in" from left on scroll, lifts + sharpens on hover */}
                <motion.div
                  initial="hidden"
                  whileInView="shown"
                  viewport={{ once: true, margin: "-60px" }}
                  className="relative mx-auto aspect-[350/231] w-full max-w-sm"
                >
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 z-10 origin-right bg-white transition-colors duration-500 group-hover:bg-[#fafaff]"
                    variants={{ hidden: { scaleX: 1 }, shown: { scaleX: 0 } }}
                    transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.15 * i }}
                  />
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 90vw"
                    className="object-contain transition-all duration-700 ease-out group-hover:-translate-y-2 group-hover:scale-105 group-hover:contrast-150"
                  />
                </motion.div>
              </article>
            ))}
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

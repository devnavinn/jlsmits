"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Eyebrow } from "@/components/shared";
import { ContactOptions } from "@/components/contact/options";

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

        <ContactOptions className="mt-12" />
      </div>
    </section>
  );
}

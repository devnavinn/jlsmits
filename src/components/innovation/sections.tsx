"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { ArrowButton, Eyebrow } from "@/components/shared";
import { RevealHeading } from "@/components/about/ui";
import { PageHero } from "@/components/page-hero";

const ease = [0.22, 1, 0.36, 1] as const;

const images = {
  hero: "/images/innovation/hero-robotics.png",
  research: "/images/innovation-rnd.png",
  engineering: "/images/innovation-technology.png",
  manufacturing: "/images/innovation-manufacturing.png",
};

const highlights = [
  { title: "Research-led", text: "Ideas explored and tested before they are put into practice." },
  { title: "Quality-driven", text: "Consistent standards in everything we deliver." },
  { title: "Responsibility-minded", text: "Efficiency and sustainability considered from the start." },
];

export const pillars = [
  {
    id: "research-development",
    title: ["Innovation & Research"],
    text: "Innovation starts with curiosity. We encourage our people to question, explore and improve, so we can respond to change and keep creating value for our customers, partners and communities.",
    features: [
      "A culture that welcomes new ideas and fresh thinking",
      "Learning from research, data and customer feedback",
      "Partnerships with universities, experts and industry peers",
      "Practical solutions that move from idea to action",
    ],
    image: images.research,
    cta: "Explore Our Research",
    href: "/insights",
  },
  {
    id: "engineering-operational-excellence",
    title: ["Engineering &", "Operational Excellence"],
    text: "Strong engineering and disciplined operations help us deliver consistent quality, reliable timelines, and efficient resource use.",
    features: [
      "Design and engineering practices built around quality and safety",
      "Lean processes that reduce waste and improve efficiency",
      "Data-driven decision-making across operations",
      "Strong supply chain planning and supplier partnerships",
    ],
    image: images.engineering,
    cta: "See How We Work",
    href: "/about",
  },
  {
    id: "smart-sustainable-manufacturing",
    title: ["Smart & Sustainable", "Manufacturing"],
    text: "We are modernizing our manufacturing with smarter technology and more responsible practices, so we can produce more while using fewer resources.",
    features: [
      "Automation and digital tools that improve precision and reduce waste",
      "Efficient use of energy, water, and raw materials",
      "Waste reduction, reuse and recycling programs",
      "A safe, healthy and inclusive workplace",
    ],
    image: images.manufacturing,
    cta: "Our Sustainability Commitments",
    href: "#sustainability-commitments",
  },
];

const commitments = [
  { title: "Energy & Emissions", text: "Using energy more efficiently and moving toward cleaner sources" },
  { title: "Materials & Waste", text: "Reducing waste and increasing reuse and recycling" },
  { title: "Responsible Sourcing", text: "Working with suppliers who share our environmental and ethical standards" },
  { title: "People & Safety", text: "Safe, inclusive workplaces with ongoing skills development" },
];

export function InnovationHero() {
  return (
    <PageHero
      image={images.hero}
      alt="Robotic assembly line in a modern factory"
      eyebrow="Innovation & Sustainability"
      lines={["Innovation That Moves", "Business Forward."]}
      subtitle="We combine research, engineering, and responsible manufacturing to create lasting value for our customers, our people, and the communities we serve."
    >
      <div className="mt-8">
        <ArrowButton href="#our-approach" variant="brand">
          Explore Our Approach
        </ArrowButton>
      </div>
    </PageHero>
  );
}

export function InnovationIntro() {
  return (
    <section id="our-approach" className="scroll-mt-24 pb-14 pt-20 md:pb-20 md:pt-28">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <BlurFade inView>
              <Eyebrow>Our Approach</Eyebrow>
            </BlurFade>
            <RevealHeading lines={["Progress With Purpose"]} className="mt-3 text-ink sm:text-4xl lg:text-[2.6rem]" />
          </div>
          <BlurFade inView delay={0.15}>
            <p className="max-w-xl text-[15px] leading-relaxed text-ink/85 md:pb-3">
              At JLSmith Group, innovation is part of how we work every day. We look for better ways to solve problems,
              improve how we operate, and prepare for a changing world. We measure success by the value we create and
              the responsibility we show along the way.
            </p>
          </BlurFade>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3 md:mt-16 md:gap-6">
          {highlights.map((h, i) => (
            <BlurFade key={h.title} inView delay={0.1 + i * 0.08}>
              <div className="h-full rounded-2xl border border-black/5 bg-[#f3f3f3] p-6 md:p-7">
                <p className="font-mono text-xs text-brand">0{i + 1}</p>
                <h3 className="mt-6 text-xl tracking-tight text-ink md:text-2xl">{h.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/60">{h.text}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InnovationPillars() {
  return (
    <section className="pb-16 md:pb-24">
      <div className="container-x space-y-10 md:space-y-14">
        {pillars.map((p, i) => (
          <motion.article
            key={p.id}
            id={p.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="group grid scroll-mt-28 gap-8 rounded-2xl border border-black/5 bg-[#f3f3f3] p-5 md:grid-cols-2 md:gap-12 md:p-7 lg:p-8"
          >
            <div className="flex flex-col">
              <p className="text-2xl text-ink md:text-3xl">/ {String(i + 1).padStart(2, "0")}</p>
              <RevealHeading lines={p.title} as="h3" className="mt-6 text-ink sm:text-3xl lg:text-[2.1rem]" />
              <p className="mt-5 max-w-md text-base leading-relaxed text-ink/60">{p.text}</p>
              <ul className="mt-6 max-w-md">
                {p.features.map((f, j) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease, delay: 0.2 + j * 0.1 }}
                    className="flex items-start gap-4 border-black/10 py-3.5 text-sm text-ink [&:not(:last-child)]:border-b"
                  >
                    <span className="mt-1.5 size-2 shrink-0 rounded-full bg-brand" />
                    {f}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 md:mt-auto md:pt-10">
                <ArrowButton href={p.href} variant="brand">
                  {p.cta}
                </ArrowButton>
              </div>
            </div>
            <div className="relative aspect-[654/571] overflow-hidden rounded-2xl">
              <Image
                src={p.image}
                alt=""
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function SustainabilityCommitments() {
  return (
    <section id="sustainability-commitments" className="scroll-mt-24 bg-ink py-20 text-white md:py-28">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <BlurFade inView>
              <Eyebrow className="text-white/80">Sustainability Commitments</Eyebrow>
            </BlurFade>
            <RevealHeading
              lines={["Building Responsibly,", "Measured Honestly."]}
              className="mt-3 text-white sm:text-4xl lg:text-[2.6rem]"
            />
          </div>
          <BlurFade inView delay={0.15}>
            <p className="max-w-xl text-[15px] leading-relaxed text-white/75 md:pb-3">
              We set clear goals, track our progress, and share it openly.
            </p>
          </BlurFade>
        </div>

        <div className="mt-12 border-t border-white/15 md:mt-16">
          <div className="hidden grid-cols-[1fr_1.6fr] gap-12 border-b border-white/15 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 md:grid">
            <span>Commitment</span>
            <span>What it means</span>
          </div>
          {commitments.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              className="grid gap-2 border-b border-white/15 py-6 md:grid-cols-[1fr_1.6fr] md:gap-12 md:py-8"
            >
              <h3 className="flex items-center gap-3 text-xl tracking-tight md:text-2xl">
                <span className="size-2 shrink-0 rounded-full bg-brand brightness-150" />
                {c.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-white/70 md:text-base">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

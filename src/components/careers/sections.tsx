import Image from "next/image";
import { FileText, Mail, UsersRound } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { ApplicationForm } from "@/components/careers/application-form";
import { cn } from "@/lib/utils";

const reasons = [
  { title: "Team Culture", text: "Work with experienced people who value discipline, responsibility and continuous improvement." },
  { title: "Industrial Impact", text: "Contribute to materials and components used across power, railways, defence, oil and gas and other sectors." },
  { title: "Practical Learning", text: "Build real-world skills through production, engineering, quality and customer-driven requirements." },
  { title: "Manufacturing Exposure", text: "Work around composite, mica and carbon fiber materials used in demanding industrial applications." },
];

const gallery = [
  { src: "/images/careers/life-factory.jpg", alt: "Two colleagues talking on the factory floor", tall: true },
  { src: "/images/careers/life-corridor.jpg", alt: "Two colleagues walking through an office corridor" },
  { src: "/images/careers/life-campus.jpg", alt: "Aerial view of a manufacturing campus" },
  { src: "/images/careers/life-meeting.jpg", alt: "A team meeting around a table", tall: true },
  { src: "/images/careers/life-office.jpg", alt: "An employee working at her desk" },
  { src: "/images/about/people-factory.png", alt: "People at work in a factory" },
];

const steps = [
  { icon: FileText, title: "Submit your profile", text: "Fill out the application form with your details" },
  { icon: UsersRound, title: "Our team reviews applications", text: "We carefully review each application to find the right fit" },
  { icon: Mail, title: "We contact relevant candidates", text: "Qualified candidates will be contacted for next steps." },
];

export function CareersIntro() {
  return (
    <section className="container-x pb-14 pt-16 text-center md:pb-20 md:pt-20">
      <BlurFade inView>
        <h2 className="text-3xl tracking-tight text-navy sm:text-4xl lg:text-5xl">Careers with purpose</h2>
      </BlurFade>
      <BlurFade inView delay={0.05}>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-ink/60 md:text-base">
          At Smith Composite, our teams work across manufacturing, engineering, quality, sales and operations to support
          industries that depend on reliable material performance. Every role contributes to real production, better
          processes and dependable solutions for customers worldwide.
        </p>
      </BlurFade>
    </section>
  );
}

export function WhyJoin() {
  return (
    <section className="px-3 md:px-5">
      <BlurFade inView>
        <div className="grid overflow-hidden rounded-xl bg-navy lg:grid-cols-[1.05fr_1fr]">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[560px]">
            <Image src="/images/careers/why-join.jpg" alt="Two colleagues walking through an office corridor" fill sizes="(min-width:1024px) 52vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col justify-center px-6 py-12 md:px-16 lg:px-24">
            <h2 className="text-3xl tracking-tight text-white sm:text-4xl lg:text-5xl">Why join us?</h2>
            <dl className="mt-8 space-y-6">
              {reasons.map((r) => (
                <div key={r.title}>
                  <dt className="text-lg text-white md:text-xl">{r.title}</dt>
                  <dd className="mt-2 max-w-lg text-sm leading-snug text-white/55">{r.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}

export function LifeAt() {
  return (
    <section className="px-3 py-14 md:px-5 md:py-20">
      <BlurFade inView>
        <h2 className="text-center text-3xl tracking-tight text-navy sm:text-4xl lg:text-5xl">Life at JL Smith</h2>
      </BlurFade>
      <BlurFade inView delay={0.05}>
        <div className="mt-10 grid grid-flow-dense auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] md:gap-5 lg:auto-rows-[15rem] lg:grid-cols-4">
          {gallery.map((g) => (
            <div key={g.src} className={cn("group relative overflow-hidden", g.tall && "row-span-2")}>
              <Image src={g.src} alt={g.alt} fill sizes="(min-width:1024px) 24vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </BlurFade>
    </section>
  );
}

export function ApplySection({ positions, departments }: { positions: string[]; departments: string[] }) {
  return (
    <section id="apply" className="container-x scroll-mt-20 pb-20 md:pb-28">
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
        <BlurFade inView>
          <h2 className="text-3xl tracking-tight text-navy sm:text-4xl lg:text-5xl">Apply to join us</h2>
          <p className="mt-6 max-w-sm text-sm leading-snug text-ink/60">
            We&apos;re always looking for talented individuals who share our passion for innovation and excellence. Take
            the next step in your career with Smith Composite.
          </p>
          <ol className="mt-6">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-navy text-white"><Icon className="size-5" aria-hidden /></span>
                  {i < steps.length - 1 && <span className="min-h-8 flex-1 border-l border-dashed border-navy/40" aria-hidden />}
                </div>
                <div className="max-w-xs pb-6">
                  <p className="text-sm text-ink">{title}</p>
                  <p className="mt-1 text-[13px] leading-snug text-ink/60">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </BlurFade>
        <BlurFade inView delay={0.05}>
          <div className="relative rounded-2xl bg-paper p-6 md:p-10">
            <ApplicationForm positions={positions} departments={departments} />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

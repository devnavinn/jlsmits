"use client";

import { motion } from "motion/react";
import { Mail, MapPin } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Eyebrow } from "@/components/shared";
import { RevealHeading } from "@/components/about/ui";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { CONTACT_EMAIL, offices, type EnquiryType } from "@/lib/contact";

const ease = [0.22, 1, 0.36, 1] as const;

function FormCard({ slug, title }: { slug: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease }}
      className="relative rounded-3xl border border-black/5 bg-[#f3f3f3] p-6 shadow-[0_40px_80px_-50px_rgba(27,43,64,0.45)] sm:p-8 lg:p-10"
    >
      <h2 className="mb-8 text-2xl tracking-tight text-ink md:text-3xl">{title}</h2>
      <EnquiryForm slug={slug} />
    </motion.div>
  );
}

function EmailCard() {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="group flex items-center gap-4 rounded-2xl border border-black/10 p-5 transition-colors hover:border-brand hover:bg-brand/5"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-brand text-white transition-transform duration-500 group-hover:rotate-12">
        <Mail className="size-5" />
      </span>
      <span>
        <span className="block text-sm text-ink/55">Prefer email? Write to us at</span>
        <span className="block text-lg text-ink group-hover:text-brand">{CONTACT_EMAIL}</span>
      </span>
    </a>
  );
}

export function OfficeList() {
  return (
    <ul className="divide-y divide-black/10 border-y border-black/10">
      {offices.map((o, i) => (
        <motion.li
          key={o.name}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: i * 0.08 }}
          className="flex gap-4 py-5"
        >
          <MapPin className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden />
          <div>
            <p className="font-medium text-ink">{o.name}</p>
            {o.lines.map((l) => (
              <p key={l} className="text-sm leading-relaxed text-ink/60">
                {l}
              </p>
            ))}
          </div>
        </motion.li>
      ))}
    </ul>
  );
}

/** /contact — offices, map and a general enquiry form. */
export function ContactMain() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <BlurFade inView>
            <Eyebrow>Our offices</Eyebrow>
          </BlurFade>
          <RevealHeading lines={["Find Us"]} className="mt-3 text-ink sm:text-4xl lg:text-[2.6rem]" />
          <div className="mt-8">
            <OfficeList />
          </div>
          <div className="mt-8">
            <EmailCard />
          </div>
          <BlurFade inView delay={0.2}>
            <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-black/10">
              <iframe
                title="Map of JLSmith Group headquarters, Giridih"
                src="https://www.google.com/maps?q=Argha+Ghat+Road,+Giridih,+Jharkhand&output=embed"
                className="h-64 w-full grayscale transition duration-500 hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </BlurFade>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <FormCard slug="general" title="Send us a message" />
        </div>
      </div>
    </section>
  );
}

/** /contact/[type] — what happens next, plus the matching form. */
export function EnquiryMain({ type }: { type: EnquiryType }) {
  return (
    <section className="py-16 md:py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <BlurFade inView>
            <Eyebrow>How it works</Eyebrow>
          </BlurFade>
          <RevealHeading lines={["What Happens Next"]} className="mt-3 text-ink sm:text-4xl lg:text-[2.6rem]" />
          <ol className="relative mt-10 space-y-8 before:absolute before:bottom-4 before:left-[1.2rem] before:top-4 before:w-px before:bg-black/10">
            {type.steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease, delay: i * 0.12 }}
                className="relative flex gap-5"
              >
                <span className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-ink font-mono text-sm text-white ring-8 ring-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-lg text-ink">{s.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink/60">{s.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
          <div className="mt-12">
            <EmailCard />
          </div>
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <FormCard slug={type.slug} title={type.title} />
        </div>
      </div>
    </section>
  );
}

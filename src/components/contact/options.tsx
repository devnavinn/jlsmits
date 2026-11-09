"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Download, Hammer, MessageCircleMore, PencilRuler, type LucideIcon } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { enquiryTypes } from "@/lib/contact";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  remodel: Hammer,
  "new-build": PencilRuler,
  meet: MessageCircleMore,
  brochure: Download,
};

/** The four "how can we help" cards; each opens its own enquiry page. */
export function ContactOptions({ exclude, className }: { exclude?: string; className?: string }) {
  const items = enquiryTypes.filter((t) => t.slug !== exclude);
  return (
    <div
      className={cn(
        "mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-6",
        items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {items.map((t, i) => {
        const Icon = icons[t.slug];
        return (
          <BlurFade key={t.slug} inView delay={0.1 + i * 0.07} className={cn(items.length === 3 && i === 2 && "max-lg:col-span-2")}>
            <motion.div whileHover={{ y: -8 }} whileTap={{ scale: 0.97 }} transition={{ type: "spring", stiffness: 300, damping: 18 }}>
              <Link
                href={`/contact/${t.slug}`}
                className={cn(
                  "group relative flex aspect-square flex-col items-center justify-center gap-6 overflow-hidden rounded-2xl p-4 text-center text-white transition-shadow duration-300 hover:shadow-2xl hover:shadow-brand/30 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand",
                  i === 0 ? "bg-brand" : "bg-[#141414]",
                  items.length === 3 && i === 2 && "max-lg:aspect-[2/1]",
                )}
              >
                <span className="absolute inset-0 translate-y-full bg-brand transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <Icon strokeWidth={1} className="relative size-12 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 md:size-20" />
                <span className="relative text-sm leading-snug md:text-lg">
                  {t.card[0]}
                  <br />
                  {t.card[1]}
                </span>
              </Link>
            </motion.div>
          </BlurFade>
        );
      })}
    </div>
  );
}

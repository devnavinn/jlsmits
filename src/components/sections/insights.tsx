"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { ArrowButton, Eyebrow } from "@/components/shared";
import type { ArticleCard } from "@/lib/content";

function Meta({ category, date }: { category: string; date: string }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm uppercase text-ink/80">
      <span>{category}</span>
      <time className="normal-case">{date}</time>
    </div>
  );
}

export function Insights({ articles }: { articles: ArticleCard[] }) {
  const [featured, ...rest] = articles;
  if (!featured) return null;

  return (
    <section id="insights" className="py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-12">
          <div>
            <BlurFade inView><Eyebrow>Insights</Eyebrow></BlurFade>
            <BlurFade inView delay={0.05}>
              <h2 className="mt-4 max-w-xl text-3xl font-medium leading-[1.12] tracking-tight sm:text-4xl lg:text-[3.4rem]">
                Ideas Driving the Future of Energy.
              </h2>
            </BlurFade>
          </div>
          <BlurFade inView delay={0.1} className="space-y-6">
            <p className="max-w-xl text-base leading-relaxed text-ink/85 md:text-lg">
              Explore expert perspectives, industry trends, and technical breakthroughs shaping a smarter,
              cleaner energy future.
            </p>
            <ArrowButton href="/insights">View All Articles</ArrowButton>
          </BlurFade>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          {/* Featured */}
          <BlurFade inView delay={0.1}>
            <motion.article
              whileHover={{ y: -4 }}
              className="group relative grid h-full gap-6 overflow-hidden rounded-2xl border border-black/10 bg-paper p-4 sm:grid-cols-[1fr_1.1fr] md:p-6"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-auto sm:min-h-[420px]">
                <Image src={featured.coverImage} alt={featured.title} fill sizes="(min-width:1024px) 25vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col py-1">
                <Meta category={featured.category} date={featured.date} />
                <h3 className="mt-5 text-2xl font-medium leading-tight tracking-tight transition-colors group-hover:text-brand">
                  {featured.title}
                </h3>
                <p className="mt-6 text-[15px] leading-snug text-ink/80">{featured.excerpt}</p>
                <div className="mt-auto pt-8">
                  {featured.authorName && (
                    <div className="flex items-center gap-3 border-t border-black/10 pt-6">
                      {featured.authorImage && (
                        <Image src={featured.authorImage} alt={featured.authorName} width={48} height={48} className="size-12 rounded-md object-cover" />
                      )}
                      <div>
                        <p className="text-base">{featured.authorName}</p>
                        <p className="text-sm text-ink/70">{featured.authorRole}</p>
                      </div>
                    </div>
                  )}
                  <ArrowButton href={`/insights/${featured.slug}`} variant="brand" className="mt-6">Read More</ArrowButton>
                </div>
              </div>
              <BorderBeam size={120} duration={8} colorFrom="#1f14ff" colorTo="#7c74ff" />
            </motion.article>
          </BlurFade>

          {/* Side list */}
          <div className="grid gap-5">
            {rest.map((a, i) => (
              <BlurFade key={a.slug} inView delay={0.15 + i * 0.05}>
                <motion.article
                  whileHover={{ y: -4 }}
                  className="group grid h-full gap-5 rounded-2xl border border-black/10 bg-paper p-4 sm:grid-cols-[minmax(0,13rem)_1fr] md:p-5"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl sm:aspect-auto sm:min-h-52">
                    <Image src={a.coverImage} alt={a.title} fill sizes="(min-width:640px) 13rem, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-col">
                    <Meta category={a.category} date={a.date} />
                    <h3 className="mt-3 text-xl font-medium leading-tight tracking-tight transition-colors group-hover:text-brand md:text-2xl">
                      {a.title}
                    </h3>
                    <ArrowButton href={`/insights/${a.slug}`} variant="outline" className="mt-6 self-start sm:mt-auto">Read More</ArrowButton>
                  </div>
                </motion.article>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

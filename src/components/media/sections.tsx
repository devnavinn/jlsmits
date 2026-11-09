import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Eyebrow } from "@/components/shared";
import type { ArticleCard } from "@/lib/content";
import { cn } from "@/lib/utils";

export function MediaHeading({ eyebrow, children }: { eyebrow: string; children: React.ReactNode }) {
  return (
    <div className="text-center">
      <BlurFade inView><Eyebrow className="justify-center">{eyebrow}</Eyebrow></BlurFade>
      <BlurFade inView delay={0.05}>
        <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-medium leading-[1.2] tracking-tight sm:text-4xl lg:text-5xl">
          {children}
        </h2>
      </BlurFade>
    </div>
  );
}

function MediaCard({ article }: { article: ArticleCard }) {
  return (
    <Link
      href={`/insights/${article.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-black/10 bg-paper p-3 transition hover:-translate-y-1"
    >
      <div className="relative aspect-[2/1] overflow-hidden rounded-xl">
        <Image src={article.coverImage} alt="" fill sizes="(min-width:1024px) 22vw, (min-width:640px) 45vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="mt-3 flex justify-between gap-4 px-1 text-xs uppercase text-ink/80">
        <span>{article.category}</span>
        <time className="normal-case">{article.date}</time>
      </div>
      <div className="mt-2 flex items-end justify-between gap-3 px-1 pb-1">
        <h3 className="text-[15px] font-medium leading-tight tracking-tight transition-colors group-hover:text-brand">{article.title}</h3>
        <span className="grid size-8 shrink-0 place-items-center rounded-md border border-ink/60 transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}

export function MediaGrid({ articles, page, pageCount }: { articles: ArticleCard[]; page: number; pageCount: number }) {
  return (
    <>
      <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((a) => <MediaCard key={a.slug} article={a} />)}
      </div>
      {pageCount > 1 && (
        <nav aria-label="Article pages" className="mt-10 flex justify-center gap-2">
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
            <Link
              key={n}
              href={n === 1 ? "/media#articles" : `/media?page=${n}#articles`}
              aria-current={n === page ? "page" : undefined}
              className={cn(
                "grid size-11 place-items-center rounded-lg text-sm transition-colors",
                n === page ? "bg-brand text-white" : "hover:bg-black/5",
              )}
            >
              {n}
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}

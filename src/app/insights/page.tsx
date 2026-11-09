import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContentHeader } from "@/components/content-header";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { getLatestArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insights — JLSmith Group",
  description: "Expert perspectives, industry trends and technical breakthroughs from JLSmith Group.",
};

export default async function InsightsPage() {
  const articles = await getLatestArticles();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ContentHeader
          eyebrow="Insights"
          title="Ideas Driving the Future of Energy."
          intro="Expert perspectives, industry trends, and technical breakthroughs shaping a smarter, cleaner energy future."
        />
        <div className="container-x grid gap-6 py-14 sm:grid-cols-2 md:py-20 lg:grid-cols-3">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/insights/${a.slug}`}
              className="group flex flex-col rounded-2xl border border-black/10 bg-paper p-4 transition hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                <Image src={a.coverImage} alt="" fill sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="mt-5 flex justify-between gap-4 px-1 text-sm uppercase text-ink/70">
                <span>{a.category}</span>
                <time className="normal-case">{a.date}</time>
              </div>
              <h2 className="mt-3 px-1 pb-2 text-xl font-medium leading-tight tracking-tight transition-colors group-hover:text-brand">{a.title}</h2>
            </Link>
          ))}
          {articles.length === 0 && <p className="text-ink/60">New articles are on the way.</p>}
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Contact } from "@/components/sections/contact";
import { ArticleShowcase } from "@/components/sections/insights";
import { PageHero } from "@/components/page-hero";
import { MediaGrid, MediaHeading } from "@/components/media/sections";
import { getLatestArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Media — JLSmith Group",
  description: "Ideas, insights and developments driving innovation, industry and responsible growth.",
};

const LATEST_COUNT = 3;
const PER_PAGE = 8;

export default async function MediaPage({ searchParams }: PageProps<"/media">) {
  const { page: pageParam } = await searchParams;
  const articles = await getLatestArticles();
  const latest = articles.slice(0, LATEST_COUNT);
  const others = articles.slice(LATEST_COUNT);

  const pageCount = Math.max(1, Math.ceil(others.length / PER_PAGE));
  const requested = Number(pageParam);
  const page = Number.isInteger(requested) ? Math.min(Math.max(requested, 1), pageCount) : 1;

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          image="/images/innovation/hero-robotics.png"
          alt="Robotic arms working on a factory production line"
          lines={["Perspectives That", "Shape Tomorrow."]}
          subtitle="Ideas, insights and developments driving innovation, industry and responsible growth."
          className="md:h-[62svh]"
          lightOverlay
        />

        <section className="py-14 md:py-20">
          <div className="container-x">
            <MediaHeading eyebrow="Latest article">Ideas, Trends, and Inspiration for a Brighter Future</MediaHeading>
            {latest.length > 0 ? (
              <ArticleShowcase articles={latest} className="mt-12" />
            ) : (
              <p className="mt-12 text-center text-ink/60">New articles are on the way.</p>
            )}
          </div>
        </section>

        {others.length > 0 && (
          <section id="articles" className="scroll-mt-20 bg-[#f3f3f3] py-14 md:py-20">
            <div className="container-x">
              <MediaHeading eyebrow="Discover by category">Ideas, Trends, and Inspiration for a Brighter Future</MediaHeading>
              <MediaGrid articles={others.slice((page - 1) * PER_PAGE, page * PER_PAGE)} page={page} pageCount={pageCount} />
            </div>
          </section>
        )}

        <Contact />
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { PageHero } from "@/components/page-hero";
import { ApplySection, CareersIntro, LifeAt, WhyJoin } from "@/components/careers/sections";
import { getCareerOptions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Careers — JLSmith Group",
  description: "Build a career in manufacturing, engineering, quality, sales and operations at JLSmith Group.",
};

export default async function CareersPage() {
  const { positions, departments } = await getCareerOptions();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <PageHero
          image="/images/careers/hero.jpg"
          alt="A professional in a suit on an office staircase"
          lines={["Your Ambition. Our", "Collective Future."]}
          className="md:h-[72svh]"
          lightOverlay
        >
          <Link href="#apply" className="mt-7 inline-flex h-11 items-center gap-2 rounded-full border border-white px-9 text-sm uppercase text-white transition-colors hover:bg-white hover:text-ink">
            View openings <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </PageHero>
        <CareersIntro />
        <WhyJoin />
        <LifeAt />
        <ApplySection positions={positions} departments={departments} />
      </main>
      <Footer />
    </>
  );
}

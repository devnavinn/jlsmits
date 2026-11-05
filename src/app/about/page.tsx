import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { AboutHero } from "@/components/about/about-hero";
import { CoreValues, Intro, People } from "@/components/about/intro";
import { History } from "@/components/about/history";
import { Discover, FeatureStack, GlobalShifts, Infrastructure, Sustainability } from "@/components/about/sections";

export const metadata: Metadata = {
  title: "About Us — JLSmith Group | Five Decades of Material Reliability",
  description:
    "From material innovation to industrial performance: the history, people, infrastructure and values behind JLSmith Group.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <AboutHero />
        <Intro />
        <CoreValues />
        <History />
        <People />
        <Infrastructure />
        <GlobalShifts />
        <Sustainability />
        <FeatureStack />
        <Discover />
      </main>
      <Footer />
    </>
  );
}

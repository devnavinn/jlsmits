import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Contact } from "@/components/sections/contact";
import { InnovationHero, InnovationIntro, InnovationPillars } from "@/components/innovation/sections";

export const metadata: Metadata = {
  title: "Innovation & Sustainability — JLSmith Group",
  description:
    "Research & development, engineering excellence and smart, sustainable manufacturing across the JLSmith Group.",
};

export default function InnovationPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <InnovationHero />
        <InnovationIntro />
        <InnovationPillars />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

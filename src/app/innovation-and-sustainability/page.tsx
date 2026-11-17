import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Contact } from "@/components/sections/contact";
import { InnovationHero, InnovationIntro, InnovationPillars, SustainabilityCommitments } from "@/components/innovation/sections";

export const metadata: Metadata = {
  title: "Innovation & Sustainability — JLSmith Group",
  description:
    "We combine research, engineering, and responsible manufacturing to create lasting value for our customers, our people, and the communities we serve.",
};

export default function InnovationPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <InnovationHero />
        <InnovationIntro />
        <InnovationPillars />
        <SustainabilityCommitments />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

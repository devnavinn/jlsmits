import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Contact } from "@/components/sections/contact";
import { HeatingCompanies, HeatingHero, HeatingOverview } from "@/components/advanced-heating/sections";

export const metadata: Metadata = {
  title: "Advanced Heating & Thermal Solutions for Industry — JLSmith Group",
  description: "Advanced heating and thermal solutions for industry from the JLSmith Group of companies.",
};

export default function AdvancedHeatingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <HeatingHero />
        <HeatingOverview />
        <HeatingCompanies />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

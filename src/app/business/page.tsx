import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Contact } from "@/components/sections/contact";
import {
  BusinessDirectory,
  BusinessOverviewHero,
  BusinessOverviewIntro,
  CompanyLogos,
} from "@/components/business/overview";
import { getBusinessPages } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Businesses — JLSmith Group",
  description:
    "Advanced materials, industrial solutions, technology, commerce and international operations: the businesses and companies of JLSmith Group.",
};

export default async function BusinessesPage() {
  const pages = await getBusinessPages();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <BusinessOverviewHero />
        <BusinessOverviewIntro pages={pages} />
        <BusinessDirectory pages={pages} />
        <CompanyLogos pages={pages} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

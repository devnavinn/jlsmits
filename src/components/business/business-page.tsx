import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Contact } from "@/components/sections/contact";
import { BusinessCompanies, BusinessHero, BusinessOverview } from "@/components/business/sections";
import type { BusinessPageData } from "@/lib/content";

/** Shared layout for every page under the Business menu. */
export function BusinessPage({ page }: { page: BusinessPageData }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <BusinessHero page={page} />
        <BusinessOverview page={page} />
        <BusinessCompanies page={page} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

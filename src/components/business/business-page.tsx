import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Contact } from "@/components/sections/contact";
import { BusinessCompanies, BusinessHero, BusinessOverview } from "@/components/business/sections";
import { getBusinessPage } from "@/lib/business-pages";

export function businessMetadata(slug: string): Metadata {
  const page = getBusinessPage(slug);
  return { title: `${page.title.join(" ")} — JLSmith Group`, description: page.description };
}

/** Shared layout for every page under the Business menu. */
export function BusinessPage({ slug }: { slug: string }) {
  const page = getBusinessPage(slug);
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

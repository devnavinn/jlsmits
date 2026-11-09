import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Portfolio } from "@/components/sections/portfolio";
import { Innovation } from "@/components/sections/innovation";
import { Insights } from "@/components/sections/insights";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { getBusinessPages, getLatestArticles } from "@/lib/content";

export default async function Home() {
  const [businesses, articles] = await Promise.all([getBusinessPages(), getLatestArticles(3)]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Portfolio businesses={businesses} />
        <Innovation />
        <Insights articles={articles} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

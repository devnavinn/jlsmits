import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Portfolio } from "@/components/sections/portfolio";
import { Innovation } from "@/components/sections/innovation";
import { Insights } from "@/components/sections/insights";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Portfolio />
        <Innovation />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

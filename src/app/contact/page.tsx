import type { Metadata } from "next";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Eyebrow } from "@/components/shared";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactOptions } from "@/components/contact/options";
import { ContactMain } from "@/components/contact/contact-page";

export const metadata: Metadata = {
  title: "Contact Us — JLSmith Group",
  description: "Get in touch with JLSmith Group: start a project, upgrade an existing one, book a meeting or request our brochure.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ContactHero
          crumbs={[{ label: "Contact" }]}
          title={["Let's Talk"]}
          intro="From research and engineering to manufacturing and market development, we continuously look for better ways to solve problems, create value and respond to a changing world. Tell us how we can help."
        />
        <section className="py-16 md:py-24">
          <div className="container-x">
            <Eyebrow className="justify-center">How can we help?</Eyebrow>
            <ContactOptions className="mt-8" />
          </div>
        </section>
        <ContactMain />
      </main>
      <Footer />
    </>
  );
}

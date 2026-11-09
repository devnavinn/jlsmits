import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Eyebrow } from "@/components/shared";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactOptions } from "@/components/contact/options";
import { EnquiryMain } from "@/components/contact/contact-page";
import { enquiryTypes } from "@/lib/contact";

export const dynamicParams = false;

export function generateStaticParams() {
  return enquiryTypes.map((t) => ({ type: t.slug }));
}

const find = (slug: string) => enquiryTypes.find((t) => t.slug === slug);

export async function generateMetadata({ params }: PageProps<"/contact/[type]">): Promise<Metadata> {
  const type = find((await params).type);
  return type ? { title: `${type.title} — JLSmith Group`, description: type.intro } : {};
}

export default async function EnquiryPage({ params }: PageProps<"/contact/[type]">) {
  const type = find((await params).type);
  if (!type) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ContactHero
          crumbs={[{ label: "Contact", href: "/contact" }, { label: type.eyebrow }]}
          title={[type.title]}
          intro={type.intro}
        />
        <EnquiryMain type={type} />
        <section className="border-t border-black/5 bg-paper py-16 md:py-24">
          <div className="container-x">
            <Eyebrow className="justify-center">Other ways we can help</Eyebrow>
            <ContactOptions exclude={type.slug} className="mt-8 max-w-4xl" />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

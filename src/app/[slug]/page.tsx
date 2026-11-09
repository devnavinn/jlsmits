import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BusinessPage } from "@/components/business/business-page";
import { ContentHeader } from "@/components/content-header";
import { Markdown } from "@/components/markdown";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { formatDate, getBusinessPage, getSitePage } from "@/lib/content";

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusinessPage(slug);
  if (business) return { title: `${business.title.join(" ")} — JLSmith Group`, description: business.description };
  const page = await getSitePage(slug);
  return page ? { title: `${page.title} — JLSmith Group`, description: page.summary || undefined } : {};
}

/** One top-level route for every business and for admin-created pages such as the legal pages. */
export default async function SlugPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const business = await getBusinessPage(slug);
  if (business) return <BusinessPage page={business} />;

  const page = await getSitePage(slug);
  if (!page) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ContentHeader eyebrow={`Last updated ${formatDate(page.updatedAt)}`} title={page.title} intro={page.summary} />
        <div className="mx-auto max-w-3xl px-5 py-14 md:px-8 md:py-20">
          <Markdown>{page.body}</Markdown>
        </div>
      </main>
      <Footer />
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ContentHeader } from "@/components/content-header";
import { Markdown } from "@/components/markdown";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { formatDate, getArticle } from "@/lib/content";

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  return article ? { title: `${article.title} — JLSmith Group`, description: article.excerpt || undefined } : {};
}

export default async function ArticlePage({ params }: PageProps<"/insights/[slug]">) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ContentHeader
          eyebrow={`${article.category} · ${formatDate(article.publishedAt)}`}
          title={article.title}
          intro={article.excerpt}
        />
        <article className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src={article.coverImage} alt="" fill priority sizes="(min-width:768px) 720px, 100vw" className="object-cover" />
          </div>
          <Markdown className="mt-10">{article.body}</Markdown>
          {article.authorName && (
            <div className="mt-12 flex items-center gap-3 border-t border-black/10 pt-6">
              {article.authorImage && (
                <Image src={article.authorImage} alt="" width={48} height={48} className="size-12 rounded-md object-cover" />
              )}
              <div>
                <p>{article.authorName}</p>
                {article.authorRole && <p className="text-sm text-ink/70">{article.authorRole}</p>}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}

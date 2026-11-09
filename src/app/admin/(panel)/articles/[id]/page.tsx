import { notFound } from "next/navigation";
import { ArticleForm } from "@/components/admin/article-form";
import { PageHeader, buttonClass } from "@/components/admin/ui";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export default async function EditArticlePage({ params }: PageProps<"/admin/articles/[id]">) {
  await requireAdmin();
  const article = await prisma.article.findUnique({ where: { id: (await params).id } });
  if (!article) notFound();

  return (
    <>
      <PageHeader back={{ href: "/admin/articles", label: "Articles" }} title="Edit article">
        {article.status === "PUBLISHED" && (
          <a href={`/insights/${article.slug}`} target="_blank" rel="noopener" className={buttonClass.secondary}>View live</a>
        )}
      </PageHeader>
      <ArticleForm article={article} />
    </>
  );
}

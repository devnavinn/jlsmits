import { ArticleForm } from "@/components/admin/article-form";
import { PageHeader } from "@/components/admin/ui";
import { requireAdmin } from "@/lib/auth";

export default async function NewArticlePage() {
  await requireAdmin();
  return (
    <>
      <PageHeader back={{ href: "/admin/articles", label: "Articles" }} title="New article" />
      <ArticleForm />
    </>
  );
}

import { ConfirmDelete, AdminForm, CheckboxField, ImageField, MarkdownField, StatusField, TextAreaField, TextField } from "@/components/admin/form";
import { Card } from "@/components/admin/ui";
import { deleteArticle, saveArticle } from "@/app/admin/actions";
import type { Article } from "@/generated/prisma/client";

export function ArticleForm({ article }: { article?: Article }) {
  return (
    <AdminForm
      action={saveArticle}
      submitLabel={article ? "Save changes" : "Create article"}
      extraActions={article && <ConfirmDelete action={deleteArticle} fields={{ id: article.id }} />}
    >
      <input type="hidden" name="id" value={article?.id ?? ""} />
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_18rem]">
        <div className="min-w-0 space-y-4">
          <Card className="space-y-4">
            <TextField name="title" label="Title" defaultValue={article?.title} />
            <TextAreaField name="excerpt" label="Excerpt" rows={3} defaultValue={article?.excerpt} hint="Shown on cards and in search results." />
            <MarkdownField name="body" label="Body" defaultValue={article?.body} hint="Use Markdown: ## for headings, **bold**, - for lists, [text](link) for links." />
          </Card>
        </div>
        <div className="space-y-4">
          <Card title="Publishing" className="space-y-4">
            <StatusField defaultValue={article?.status ?? "DRAFT"} />
            <TextField name="publishedAt" label="Publish date" type="date" defaultValue={article?.publishedAt?.toISOString().slice(0, 10)} hint="Leave empty to use today's date when published. Future dates stay hidden until then." />
            <TextField name="category" label="Category" defaultValue={article?.category} />
            <TextField name="slug" label="URL slug" defaultValue={article?.slug} hint="Leave empty to create it from the title." />
            <CheckboxField name="featured" label="Featured" hint="Leads the home page Insights section." defaultChecked={article?.featured} />
          </Card>
          <Card title="Cover image" className="space-y-4">
            <ImageField name="coverImage" label="Image" defaultValue={article?.coverImage} />
          </Card>
          <Card title="Author" className="space-y-4">
            <TextField name="authorName" label="Name" defaultValue={article?.authorName} />
            <TextField name="authorRole" label="Role" defaultValue={article?.authorRole} />
            <ImageField name="authorImage" label="Photo" defaultValue={article?.authorImage} />
          </Card>
        </div>
      </div>
    </AdminForm>
  );
}

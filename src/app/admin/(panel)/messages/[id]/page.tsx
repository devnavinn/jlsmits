import { notFound } from "next/navigation";
import { Reply } from "lucide-react";
import { deleteMessage, setMessageStatus } from "@/app/admin/actions";
import { ConfirmDelete } from "@/components/admin/form";
import { MarkRead } from "@/components/admin/mark-read";
import { Card, PageHeader, StatusBadge, buttonClass, formatDateTime } from "@/components/admin/ui";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export default async function MessagePage({ params }: PageProps<"/admin/messages/[id]">) {
  await requireAdmin();
  const message = await prisma.contactMessage.findUnique({ where: { id: (await params).id } });
  if (!message) notFound();

  const answers = message.fields as { label: string; value: string }[];
  const replyHref = `mailto:${encodeURIComponent(message.email).replace("%40", "@")}?subject=${encodeURIComponent(`Re: ${message.subject}`)}`;
  const nextStatus = message.status === "ARCHIVED" ? "READ" : "ARCHIVED";

  return (
    <>
      {message.status === "NEW" && <MarkRead id={message.id} />}
      <PageHeader back={{ href: "/admin/messages", label: "Messages" }} title={message.name} description={`${message.subject} · ${formatDateTime(message.createdAt)}`}>
        <StatusBadge status={message.status} />
      </PageHeader>

      <Card>
        <dl className="divide-y divide-black/[0.05]">
          {answers.map((a, i) => (
            <div key={i} className="grid gap-1 py-3 first:pt-0 last:pb-0 sm:grid-cols-[11rem_1fr] sm:gap-4">
              <dt className="text-[13px] text-ink/50">{a.label}</dt>
              <dd className="whitespace-pre-wrap break-words text-[13px] leading-relaxed text-ink">{a.value}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <div className="mt-4 flex flex-wrap gap-2">
        <a href={replyHref} className={buttonClass.primary}><Reply className="size-4" /> Reply by email</a>
        <form action={setMessageStatus}>
          <input type="hidden" name="id" value={message.id} />
          <input type="hidden" name="status" value={nextStatus} />
          <button className={buttonClass.secondary}>{nextStatus === "ARCHIVED" ? "Archive" : "Restore"}</button>
        </form>
        {message.status === "READ" && (
          <form action={setMessageStatus}>
            <input type="hidden" name="id" value={message.id} />
            <input type="hidden" name="status" value="NEW" />
            <button className={buttonClass.secondary}>Mark as new</button>
          </form>
        )}
        <ConfirmDelete action={deleteMessage} fields={{ id: message.id }} />
      </div>
    </>
  );
}

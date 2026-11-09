import { AdminShell } from "@/components/admin/shell";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/db";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await requireAdmin();
  const unread = await prisma.contactMessage.count({ where: { status: "NEW" } });
  return (
    <AdminShell admin={{ name: admin.name, email: admin.email }} unread={unread}>
      {children}
    </AdminShell>
  );
}

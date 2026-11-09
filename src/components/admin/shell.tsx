"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Briefcase, Building2, Factory, FileText, Inbox, LayoutDashboard, LogOut, Menu, Newspaper, X } from "lucide-react";
import { logout } from "@/app/admin/actions";
import { cn } from "@/lib/utils";

const groups = [
  {
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/messages", label: "Messages", icon: Inbox },
    ],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/articles", label: "Articles", icon: Newspaper },
      { href: "/admin/businesses", label: "Businesses", icon: Building2 },
      { href: "/admin/companies", label: "Companies", icon: Factory },
      { href: "/admin/pages", label: "Pages", icon: FileText },
      { href: "/admin/careers", label: "Job openings", icon: Briefcase },
    ],
  },
];

function Brand() {
  return (
    <Link href="/admin" className="flex items-center gap-2 text-ink">
      <Image src="/images/logo.png" alt="" width={50} height={35} className="h-5 w-auto" />
      <span className="text-[15px] tracking-tight">jlsmith group</span>
    </Link>
  );
}

export function AdminShell({
  admin,
  unread,
  children,
}: {
  admin: { name: string; email: string };
  unread: number;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === "/admin" ? pathname === href : pathname.startsWith(href));

  return (
    <div className="min-h-screen bg-[#f8f8f7] text-ink lg:pl-56">
      <div className="sticky top-0 z-30 flex h-13 items-center justify-between border-b border-black/[0.06] bg-white px-4 lg:hidden">
        <Brand />
        <button onClick={() => setOpen(true)} aria-label="Open menu" className="relative grid size-9 place-items-center text-ink/70">
          <Menu className="size-5" />
          {unread > 0 && <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-brand" />}
        </button>
      </div>
      {open && <button aria-label="Close menu" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-ink/30 lg:hidden" />}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-56 flex-col border-r border-black/[0.06] bg-white transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-14 items-center justify-between px-4">
          <Brand />
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="text-ink/50 lg:hidden"><X className="size-5" /></button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2.5 pt-2">
          {groups.map((group, i) => (
            <div key={i} className={cn(i > 0 && "mt-5")}>
              {group.title && <p className="mb-1 px-2 text-[11px] font-medium text-ink/40">{group.title}</p>}
              <div className="space-y-px">
                {group.items.map(({ href, label, icon: Icon }) => {
                  const active = isActive(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px] transition-colors",
                        active ? "bg-black/[0.05] font-medium text-ink" : "text-ink/60 hover:bg-black/[0.03] hover:text-ink",
                      )}
                    >
                      <Icon className={cn("size-4", active ? "text-brand" : "text-ink/40")} aria-hidden />
                      {label}
                      {href === "/admin/messages" && unread > 0 && (
                        <span aria-label={`${unread} new`} className="ml-auto grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand px-1 text-[11px] font-medium text-white">
                          {unread}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-2.5">
          <a href="/" target="_blank" rel="noopener" className="flex h-8 items-center justify-between rounded-md px-2 text-[13px] text-ink/60 transition-colors hover:bg-black/[0.03] hover:text-ink">
            View website <ArrowUpRight className="size-3.5 text-ink/40" aria-hidden />
          </a>
          <div className="mt-1.5 flex items-center gap-1 border-t border-black/[0.06] pt-2.5">
            <Link href="/admin/account" onClick={() => setOpen(false)} className="flex min-w-0 flex-1 items-center gap-2 rounded-md p-1 transition-colors hover:bg-black/[0.03]">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand/10 text-xs font-medium text-brand">
                {admin.name.charAt(0).toUpperCase()}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[13px] leading-tight text-ink">{admin.name}</span>
                <span className="block truncate text-[11px] leading-tight text-ink/45">{admin.email}</span>
              </span>
            </Link>
            <form action={logout}>
              <button aria-label="Sign out" title="Sign out" className="grid size-8 place-items-center rounded-md text-ink/40 transition-colors hover:bg-black/[0.04] hover:text-ink">
                <LogOut className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </aside>

      <main className="mx-auto max-w-[68rem] px-4 py-6 md:px-8 md:py-8">{children}</main>
    </div>
  );
}

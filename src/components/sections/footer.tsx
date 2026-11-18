"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Mail, MapPin, ShoppingCart, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared";
import { footerLinks, navLinks, portalLinks } from "@/lib/data";

const businessLinks = navLinks.find((l) => l.href === "/business")?.children ?? [];
const portalIcons = [Truck, ShoppingCart];

function LinkColumn({ title, links }: { title: string; links: readonly { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-brand brightness-150">{title}</h3>
      <ul className="mt-6 space-y-3 text-[15px]">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="transition-colors hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const [done, setDone] = useState(false);

  return (
    <footer className="bg-ink text-white/70">
      <div className="container-x py-14 md:py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-6 max-w-md text-[15px] leading-relaxed">
              A Diversified Global Enterprise Delivering Advanced Materials, Industrial Solutions, Technology
              Solutions, and Future-Focused Ventures.
            </p>
            <div className="mt-8 grid max-w-md gap-3 sm:grid-cols-2">
              {portalLinks.map((portal, i) => {
                const Icon = portalIcons[i];
                return (
                  <a
                    key={portal.label}
                    href={portal.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-brand/60 hover:bg-white/[0.06]"
                  >
                    <Icon className="size-5 shrink-0 text-brand brightness-150" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-white">{portal.label}</span>
                      <span className="block truncate text-xs text-white/50">{portal.description}</span>
                    </span>
                    <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                );
              })}
            </div>
          </div>

          <LinkColumn title="Company" links={footerLinks.company} />
          <LinkColumn title="Business" links={businessLinks} />

          <div className="space-y-10 sm:col-span-2 lg:col-span-1">
          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-brand brightness-150">Office</h3>
            <address className="mt-6 space-y-4 text-[15px] not-italic">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>
                  Webel More, EN 9, EN Block, Sector V
                  <br /> Bidhannagar, Kolkata, West Bengal 700091
                </span>
              </p>
              <a href="mailto:info@jlsmiths.com" className="flex items-center gap-3 transition-colors hover:text-white">
                <Mail className="size-4 shrink-0" /> info@jlsmiths.com
              </a>
            </address>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-brand brightness-150">Newsletter</h3>
            <p className="mt-6 text-[15px] leading-relaxed">
              Get the latest insights, group updates, and news from JLSmith Group.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
              className="mt-6 flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] p-1.5 focus-within:border-brand/60"
            >
              <Input
                type="email"
                required
                placeholder="Enter email address"
                aria-label="Email address"
                className="h-9 border-0 bg-transparent text-white placeholder:text-white/40 focus-visible:ring-0 dark:bg-transparent"
              />
              <Button type="submit" className="h-9 shrink-0 rounded-md px-4 font-mono text-[11px] uppercase tracking-widest">
                Subscribe
              </Button>
            </form>
            <AnimatePresence>
              {done && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-sm text-emerald-400"
                >
                  Thanks — you&apos;re subscribed.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:gap-8">
          <p>© {new Date().getFullYear()} JLSmith Group. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {footerLinks.legal.map((link) => (
              <Link key={link.href} href={link.href} className="underline underline-offset-4 hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

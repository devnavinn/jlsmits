"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared";

export function Footer() {
  const [done, setDone] = useState(false);

  return (
    <footer className="bg-ink text-white/70">
      <div className="container-x py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-16">
          <div>
            <Logo />
            <p className="mt-6 max-w-md text-[15px] leading-relaxed">
              A Diversified Global Enterprise Delivering Advanced Materials, Manufacturing Excellence, Technology
              Solutions, and Future-Focused Ventures.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-brand brightness-150">Headquarters</h3>
            <address className="mt-6 space-y-4 text-[15px] not-italic">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>
                  Vishwakarma House, Argha Ghat Road
                  <br /> Giridih-81501, Jharkhand (INDIA)
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
              Subscribe to receive our latest research developments, system updates, and material innovation reports.
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

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:gap-8">
          <p>© {new Date().getFullYear()} JLSmith Group. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="underline underline-offset-4 hover:text-white">Privacy Policy</Link>
            <Link href="#" className="underline underline-offset-4 hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

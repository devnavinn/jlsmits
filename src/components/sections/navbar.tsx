"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Grip, Menu, Phone, Search, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { Logo } from "@/components/shared";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const isActive = (link: (typeof navLinks)[number]) =>
    link.href === pathname || !!link.children?.some((c) => c.href === pathname);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 40));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-ink/80 py-3 shadow-lg backdrop-blur-xl" : "py-5 md:py-7",
      )}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Grip className="hidden size-5 text-white/80 md:block" aria-hidden />
          <Logo />
        </div>

        {/* Desktop nav */}
        <nav
          className="hidden items-center gap-1 rounded-lg bg-white/10 px-2 py-1.5 ring-1 ring-white/10 backdrop-blur-md lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {navLinks.map((link) => (
            <div key={link.label} className="relative" onMouseEnter={() => setHovered(link.label)}>
              <Link
                href={link.href}
                className={cn(
                  "relative z-10 flex items-center gap-1 px-3.5 py-2 text-[13px] transition-colors hover:text-white",
                  isActive(link) ? "font-semibold text-white" : "text-white/80",
                )}
              >
                {link.label}
                {link.children && (
                  <ChevronDown
                    className={cn("size-3.5 transition-transform", hovered === link.label && "rotate-180")}
                  />
                )}
              </Link>
              {hovered === link.label && (
                <motion.span
                  layoutId="nav-hover"
                  className="absolute inset-0 rounded-md bg-white/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                />
              )}
              <AnimatePresence>
                {link.children && hovered === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <ul className="min-w-60 rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black/5">
                      {link.children.map((c) => (
                        <li key={c.label}>
                          <Link
                            href={c.href}
                            onClick={() => setHovered(null)}
                            className={cn(
                              "block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-paper hover:text-brand",
                              c.href === pathname ? "bg-paper text-brand" : "text-ink/80",
                            )}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          <span className="mx-2 h-4 w-px bg-white/25" />
          <button aria-label="Search" className="grid size-8 place-items-center rounded-md text-white/90 hover:bg-white/10">
            <Search className="size-4" />
          </button>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/#contact"
            className="hidden items-center gap-2 rounded-md bg-brand px-5 py-3 text-[13px] font-medium text-white transition-all hover:bg-brand-dark hover:shadow-lg hover:shadow-brand/40 sm:flex lg:px-8"
          >
            <Phone className="size-4" /> Contact Us
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid size-11 place-items-center rounded-md bg-white/10 text-white ring-1 ring-white/15 backdrop-blur lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <nav className="container-x mt-4 pb-6">
              <ul className="rounded-2xl bg-ink/95 p-3 ring-1 ring-white/10 backdrop-blur-xl">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-4 py-3 text-base text-white/90 hover:bg-white/10"
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <ul className="mb-2 ml-4 border-l border-white/10 pl-2">
                        {link.children.map((c) => (
                          <li key={c.label}>
                            <Link
                              href={c.href}
                              onClick={() => setOpen(false)}
                              className={cn(
                                "block rounded-lg px-4 py-2 text-sm hover:bg-white/10",
                                c.href === pathname ? "text-white" : "text-white/60",
                              )}
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
                <li className="p-2 sm:hidden">
                  <Link
                    href="/#contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-brand py-3 text-sm font-medium text-white"
                  >
                    <Phone className="size-4" /> Contact Us
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

"use client";

import { useEffect } from "react";

/**
 * Smooth-scrolls only for in-page "#section" links (e.g. "/#contact" while already on "/").
 * We deliberately avoid a global `scroll-behavior: smooth`, because that also animates
 * Next.js route changes and browser back/forward restoration — making pages appear to
 * open at the old scroll position and slowly glide.
 */
export function SmoothAnchors() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement | null)?.closest?.("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank") return;

      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;

      const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!el) return;

      // Same page + target exists: handle it ourselves before Next's <Link> does.
      e.preventDefault();
      e.stopPropagation();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.pushState(history.state, "", url.hash);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}

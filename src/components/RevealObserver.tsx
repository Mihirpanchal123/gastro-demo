"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Elements that have already been revealed (survives page changes)
const revealed = new WeakSet<Element>();

/**
 * Fades `.reveal` elements in as they scroll into view.
 *
 * Uses the Web Animations API instead of toggling a class, so it never changes
 * attributes React manages — that keeps hydration clean even when this runs
 * before a page section has finished hydrating. Re-runs on each page change.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          if (revealed.has(el)) return;
          revealed.add(el);
          el.animate(
            [
              { opacity: 0, transform: "translateY(28px)" },
              { opacity: 1, transform: "none" },
            ],
            {
              duration: reduce ? 0 : 900,
              delay: reduce ? 0 : parseFloat(el.style.transitionDelay) || 0,
              easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
              fill: "forwards",
            }
          );
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => {
      if (!revealed.has(el)) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}

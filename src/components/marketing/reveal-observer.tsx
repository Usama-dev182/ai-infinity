"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = ".reveal, .reveal-stagger";

/**
 * Drives the `.reveal` / `.reveal-stagger` animations for the current page.
 *
 * One IntersectionObserver handles every element. Its first callback reports where each
 * element is without forcing a synchronous layout, so elements already on screen are left
 * alone and only those below the fold are hidden (`.reveal-pending`) until they scroll in.
 * All class changes happen inside the observer callback, in one batch.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
    if (elements.length === 0) return;

    const measured = new WeakSet<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const el = entry.target;
        if (!measured.has(el)) {
          measured.add(el);
          // Visible now, or already scrolled past: never hide it.
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            observer.unobserve(el);
          } else {
            el.classList.add("reveal-pending");
          }
          continue;
        }
        if (entry.isIntersecting) {
          el.classList.remove("reveal-pending");
          observer.unobserve(el);
        }
      }
    });

    for (const el of elements) observer.observe(el);
    return () => {
      observer.disconnect();
      for (const el of elements) el.classList.remove("reveal-pending");
    };
  }, [pathname]);

  return null;
}

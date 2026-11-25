"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Progressive-enhancement reveal animations.
 *
 * Server HTML is always fully visible. After hydration, only elements that start
 * below the fold get `.reveal-pending` (hidden); they are revealed when they scroll
 * into view. Elements already on screen are never hidden, so there is no flash and
 * the LCP element is never delayed. With JS disabled or `prefers-reduced-motion`,
 * content is simply shown. Styles live in `globals.css` (`.reveal`, `.reveal-stagger`).
 */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Only hide content that has not been seen yet (below the current viewport).
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.classList.add("reveal-pending");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.remove("reveal-pending");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.classList.remove("reveal-pending");
    };
  }, []);

  return ref;
}

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before the reveal transition starts. */
  delay?: number;
}

export function FadeUp({ children, delay = 0, className }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  const style: CSSProperties | undefined = delay ? { transitionDelay: `${delay}s` } : undefined;
  return (
    <div ref={ref} className={cn("reveal", className)} style={style}>
      {children}
    </div>
  );
}

export function StaggerContainer({ children, className }: Omit<RevealProps, "delay">) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={cn("reveal-stagger", className)}>
      {children}
    </div>
  );
}

export function StaggerItem({ children, className }: Omit<RevealProps, "delay">) {
  return <div className={className}>{children}</div>;
}

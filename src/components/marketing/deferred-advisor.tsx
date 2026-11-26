"use client";

import { lazy, Suspense, type ComponentProps } from "react";
import type { AiSolutionAdvisor as Advisor } from "@/components/marketing/ai-solution-advisor";

const SLOT_ID = "ai-advisor-slot";

/** Resolves when the slot comes within ~one screen of the viewport (immediately on the server). */
function whenNearViewport(id: string) {
  return new Promise<void>((resolve) => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return resolve();
    const el = document.getElementById(id);
    if (!el) return resolve();
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          resolve();
        }
      },
      { rootMargin: "800px 0px" }
    );
    observer.observe(el);
  });
}

const LazyAdvisor = lazy(() =>
  whenNearViewport(SLOT_ID)
    .then(() => import("@/components/marketing/ai-solution-advisor"))
    .then((m) => ({ default: m.AiSolutionAdvisor }))
);

/**
 * The AI Solution Advisor for pages where it sits below the fold.
 *
 * The advisor is still server-rendered, so its markup is in the HTML and there is no layout
 * shift. Its JavaScript is only downloaded and hydrated once the visitor scrolls near it:
 * until then React keeps the server HTML in place (selective hydration of a suspended
 * boundary), which takes its script work out of the initial page load.
 */
export function DeferredAdvisor(props: ComponentProps<typeof Advisor>) {
  return (
    <div id={SLOT_ID}>
      <Suspense fallback={null}>
        <LazyAdvisor {...props} />
      </Suspense>
    </div>
  );
}

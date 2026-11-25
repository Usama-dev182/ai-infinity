"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import { trackEvent, type AnalyticsParams } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Copies a URL and confirms it visibly and to screen readers. */
export function CopyLinkButton({
  url,
  label = "Copy link",
  eventParams,
  className,
}: {
  url: string;
  label?: string;
  eventParams?: AnalyticsParams;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setState("copied");
      if (eventParams) trackEvent("share_click", { ...eventParams, network: "copy-link" });
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2500);
  }

  // The live region sits outside the button so it isn't read as part of the button's name.
  return (
    <>
    <button
      type="button"
      onClick={copy}
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-card)] px-3.5 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--brand-primary)]/50 hover:text-[var(--text-brand)] transition-colors",
        className
      )}
    >
      {state === "copied" ? (
        <Check aria-hidden="true" className="w-4 h-4 text-[var(--feedback-success-text,#059669)]" />
      ) : (
        <Link2 aria-hidden="true" className="w-4 h-4" />
      )}
      {label}
    </button>
    <span role="status" aria-live="polite" className="sr-only">
      {state === "copied" ? "Link copied" : state === "failed" ? "Couldn't copy the link" : ""}
    </span>
    </>
  );
}

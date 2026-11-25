"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { trackEvent, type AnalyticsParams } from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: string;
  params?: AnalyticsParams;
};

/** `next/link` that records a GA4 event on click. Accepts every Link/anchor prop. */
export function TrackedLink({ eventName, params, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, params);
        onClick?.(event);
      }}
    />
  );
}

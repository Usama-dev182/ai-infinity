"use client";

import type { AnchorHTMLAttributes } from "react";
import { trackEvent, type AnalyticsParams } from "@/lib/analytics";

interface TrackedAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  eventName: string;
  params?: AnalyticsParams;
}

/** Plain anchor (external, mailto, tel) that records a GA4 event on click. */
export function TrackedAnchor({ eventName, params, onClick, ...props }: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent(eventName, params);
        onClick?.(event);
      }}
    />
  );
}

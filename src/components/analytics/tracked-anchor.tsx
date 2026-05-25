"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

interface TrackedAnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  eventName: string;
  params?: Record<string, string | number | boolean>;
}

export function TrackedAnchor({ children, eventName, params, onClick, ...props }: TrackedAnchorProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent(eventName, params);
        onClick?.(event);
      }}
    >
      {children}
    </a>
  );
}
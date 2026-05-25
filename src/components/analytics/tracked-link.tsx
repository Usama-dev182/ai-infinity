"use client";

import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

interface TrackedLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  eventName: string;
  params?: Record<string, string | number | boolean>;
  target?: string;
  rel?: string;
}

export function TrackedLink({ children, eventName, params, onClick, ...props }: TrackedLinkProps & { onClick?: React.MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, params);
        onClick?.(event);
      }}
    >
      {children}
    </Link>
  );
}
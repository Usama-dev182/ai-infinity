"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  ATTRIBUTION_STORAGE_KEY,
  buildAttribution,
  cleanAttribution,
  mergeAttribution,
  type Attribution,
} from "@/lib/leads/attribution";

/** Reads stored attribution for the current visit (never throws). */
export function readAttribution(): Attribution | undefined {
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return undefined;
    return cleanAttribution(JSON.parse(raw));
  } catch {
    return undefined;
  }
}

/**
 * Records UTM parameters, landing page and external referrer for this visit
 * (sessionStorage only, no cookies). Mounted once in the marketing layout.
 */
export function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const incoming = buildAttribution({ href: window.location.href, referrer: document.referrer });
      const next = mergeAttribution(readAttribution(), incoming);
      window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Storage unavailable (private mode, blocked) — attribution is optional.
    }
  }, [pathname]);

  return null;
}

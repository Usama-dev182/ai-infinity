"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const enabled = Boolean(GA_ID && GA_ID !== "G-XXXXXXXXXX");

// Query parameters that are safe and useful to report (campaign attribution only).
const REPORTABLE_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

/** Private areas are never tracked — their URLs can contain personal data (e.g. lead search). */
const isPrivatePath = (pathname: string) => pathname.startsWith("/admin");

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const privatePath = isPrivatePath(pathname);

  useEffect(() => {
    if (!enabled) return;
    // Official GA opt-out flag: also stops enhanced-measurement history events if the script
    // was loaded earlier in the session and the visitor navigates into a private area.
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = privatePath;
    if (privatePath) return;
    const gtag = ensureGtagQueue();

    // Only campaign parameters are kept; anything else in the query string is dropped.
    const kept = new URLSearchParams();
    for (const key of REPORTABLE_PARAMS) {
      const value = searchParams.get(key);
      if (value) kept.set(key, value);
    }
    const query = kept.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    gtag("event", "page_view", {
      page_title: document.title,
      page_location: `${window.location.origin}${pagePath}`,
      page_path: pagePath,
    });
  }, [pathname, searchParams, privatePath]);

  if (!enabled || privatePath) return null;

  // gtag.js (~150 KB) loads once the page is idle, so it never competes with hydration.
  // Events sent before then wait in the dataLayer queue and are processed when it loads.
  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />;
}

/**
 * Installs the standard gtag queue (the snippet Google documents) if it isn't there yet.
 * `gtag.js` reads the queued `arguments` objects when it loads.
 */
function ensureGtagQueue(): (...args: unknown[]) => void {
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") return w.gtag;
  const queue = (w.dataLayer = w.dataLayer || []);
  const gtag = function gtag() {
    // gtag.js expects the Arguments object itself, not an array copy.
    // eslint-disable-next-line prefer-rest-params
    queue.push(arguments);
  } as (...args: unknown[]) => void;
  w.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID, { send_page_view: false });
  return gtag;
}

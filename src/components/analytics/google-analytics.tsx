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
    if (privatePath || typeof window.gtag !== "function") return;

    // Only campaign parameters are kept; anything else in the query string is dropped.
    const kept = new URLSearchParams();
    for (const key of REPORTABLE_PARAMS) {
      const value = searchParams.get(key);
      if (value) kept.set(key, value);
    }
    const query = kept.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: `${window.location.origin}${pagePath}`,
      page_path: pagePath,
    });
  }, [pathname, searchParams, privatePath]);

  if (!enabled || privatePath) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}

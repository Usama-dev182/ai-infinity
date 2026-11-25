import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ogImageUrl, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE } from "@/content/site";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiinfinitylabs.com"),
  title: {
    default: "AI Infinity Labs – AI Product Engineering & Intelligent Automation",
    template: "%s | AI Infinity Labs",
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: "Usama Ali", url: "https://github.com/Usama-dev182" }],
  creator: "Usama Ali",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiinfinitylabs.com",
    siteName: SITE.name,
    images: [
      {
        url: ogImageUrl({ title: SITE.name, description: SITE.tagline }),
        width: 1200,
        height: 630,
        alt: `${SITE.name} – ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    // Handles are added only once verified (see SITE.xSite / SITE.xCreator).
    ...(SITE.xSite ? { site: SITE.xSite } : {}),
    ...(SITE.xCreator ? { creator: SITE.xCreator } : {}),
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--surface-bg)] text-[var(--text-primary)] transition-colors duration-200">
        <Providers>{children}</Providers>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}


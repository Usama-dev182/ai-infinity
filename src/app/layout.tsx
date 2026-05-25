import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  title: {
    default: "AI Infinity Labs – AI Integration & Full Stack Development Agency",
    template: "%s | AI Infinity Labs",
  },
  description:
    "We build cutting-edge AI integrations, agentic AI systems, and full-stack web applications that help businesses scale and automate intelligently.",
  keywords: [
    "AI integration services",
    "AI automation agency",
    "agentic AI development",
    "full stack development company",
    "React TypeScript development",
    "Next.js agency",
    "LLM integration",
    "RAG system development",
    "AI-powered web applications",
  ],
  authors: [{ name: "Usama Ali", url: "https://github.com/Usama-dev182" }],
  creator: "Usama Ali",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiinfinitylabs.com",
    siteName: "AI Infinity Labs",
    images: [
      {
        url: "/images/og-default.png",
        width: 1200,
        height: 630,
        alt: "AI Infinity Labs – Building AI-Powered Products That Matter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@aiinfinitylabs",
    creator: "@usamaali",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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


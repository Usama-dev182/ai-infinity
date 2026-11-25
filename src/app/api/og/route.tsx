import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const ZAP_PATH =
  "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z";

/** Keeps generated text short and single-line-safe (prevents abuse with huge payloads). */
function param(searchParams: URLSearchParams, key: string, fallback: string, max: number) {
  const value = (searchParams.get(key) ?? "").replace(/\s+/g, " ").trim();
  return (value || fallback).slice(0, max);
}

/**
 * Branded Open Graph / X card image: /api/og?title=…&description=…&type=…
 * Used by buildMetadata() for every page that doesn't supply its own image.
 */
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = param(searchParams, "title", "AI Infinity Labs", 110);
  const description = param(
    searchParams,
    "description",
    // Legacy param name used by older links.
    searchParams.get("subtitle") ?? "Building AI-Powered Products That Matter",
    180
  );
  const type = param(searchParams, "type", "", 32);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #020817 0%, #0f172a 55%, #1e1b4b 100%)",
          padding: "64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.35), transparent 70%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #6366F1, #06B6D4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={ZAP_PATH} />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "#ffffff", fontSize: 26, fontWeight: 700 }}>AI Infinity Labs</div>
            <div style={{ color: "#a5b4fc", fontSize: 16 }}>AI Product Engineering & Intelligent Automation</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {type && (
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                background: "rgba(99,102,241,0.2)",
                border: "1px solid rgba(129,140,248,0.5)",
                borderRadius: 999,
                padding: "6px 16px",
                color: "#c7d2fe",
                fontSize: 16,
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              {type}
            </div>
          )}
          <div style={{ color: "#ffffff", fontSize: title.length > 60 ? 50 : 60, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-1.5px", maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ color: "#cbd5e1", fontSize: 24, lineHeight: 1.4, maxWidth: 950 }}>{description}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#94a3b8", fontSize: 18 }}>
          <span>aiinfinitylabs.com</span>
          <span style={{ color: "#a5b4fc" }}>AI Products · AI Agents · Automation · Full-Stack</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400" },
    }
  );
}

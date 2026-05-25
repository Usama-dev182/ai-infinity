import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const title = searchParams.get("title") ?? "AI Infinity Labs";
  const description = searchParams.get("description") ?? "Building AI-Powered Products That Matter";
  const type = searchParams.get("type") ?? "page";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1035 50%, #0f1a35 100%)",
          padding: "60px 70px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.3), transparent 70%)",
          }}
        />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, position: "relative" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ color: "white", fontSize: 24, fontWeight: 700 }}>∞</div>
          </div>
          <div style={{ color: "white", fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px" }}>
            AI Infinity Labs
          </div>
        </div>

        {/* Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
          {type !== "page" && (
            <div
              style={{
                display: "flex",
                background: "rgba(99,102,241,0.2)",
                border: "1px solid rgba(99,102,241,0.4)",
                borderRadius: 8,
                padding: "4px 14px",
                color: "#a5b4fc",
                fontSize: 14,
                width: "fit-content",
                textTransform: "uppercase",
                letterSpacing: "1px",
              }}
            >
              {type}
            </div>
          )}
          <div
            style={{
              color: "white",
              fontSize: 54,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-1px",
              maxWidth: 900,
            }}
          >
            {title}
          </div>
          {description && (
            <div style={{ color: "#94a3b8", fontSize: 22, maxWidth: 800, lineHeight: 1.4 }}>
              {description}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#64748b",
            fontSize: 16,
            position: "relative",
          }}
        >
          <span>aiinfinitylabs.com</span>
          <div
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              color: "#a5b4fc",
              fontSize: 13,
            }}
          >
            AI Integration · Full Stack · Automation
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

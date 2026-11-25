import { NextRequest, NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import {
  advisorRequestSchema,
  buildSystemPrompt,
  clampReply,
  fallbackReply,
  normalizeConversation,
} from "@/lib/advisor";

// AI Solution Advisor endpoint (kept at /api/ai/demo for backwards compatibility).

const MAX_BODY_BYTES = 32_000;
const MAX_OUTPUT_TOKENS = 450;
const DEFAULT_MODEL = "gpt-4o-mini";

const noStore = { "Cache-Control": "no-store" };

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const [perMinute, perDay] = await Promise.all([rateLimit("ai-demo", ip), rateLimit("ai-demo-daily", ip)]);
  if (!perMinute.success || !perDay.success) {
    const retryAfter = Math.max(1, Math.ceil(((perMinute.success ? perDay : perMinute).reset - Date.now()) / 1000));
    return NextResponse.json(
      { error: "You're sending messages quickly. Please wait a moment and try again." },
      { status: 429, headers: { ...noStore, "Retry-After": String(retryAfter) } }
    );
  }

  const length = Number(req.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large." }, { status: 413, headers: noStore });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400, headers: noStore });
  }

  const parsed = advisorRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request. Please enter a message." }, { status: 422, headers: noStore });
  }

  const conversation = normalizeConversation(parsed.data);
  if (!conversation.ok) {
    return NextResponse.json({ error: conversation.error }, { status: 422, headers: noStore });
  }

  const context = parsed.data.context;
  const apiKey = process.env.OPENAI_API_KEY;
  // Unconfigured or failing AI service → deterministic guidance; never reveal configuration.
  if (!apiKey) {
    return NextResponse.json({ reply: fallbackReply(context), fallback: true }, { headers: noStore });
  }

  try {
    const { OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey, timeout: 20_000, maxRetries: 1 });
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || DEFAULT_MODEL,
      max_completion_tokens: MAX_OUTPUT_TOKENS,
      messages: [{ role: "system", content: buildSystemPrompt(context) }, ...conversation.messages],
    });

    const text = completion.choices[0]?.message?.content;
    if (!text?.trim()) {
      return NextResponse.json({ reply: fallbackReply(context), fallback: true }, { headers: noStore });
    }
    return NextResponse.json({ reply: clampReply(text) }, { headers: noStore });
  } catch (error) {
    console.error("[ai-advisor] provider error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ reply: fallbackReply(context), fallback: true }, { headers: noStore });
  }
}

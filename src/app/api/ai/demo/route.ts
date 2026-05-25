import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { checkRateLimit } from "@/lib/rate-limit";

const bodySchema = z.object({
  message: z.string().min(1).max(500),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  const limited = await checkRateLimit("ai-demo", ip);
  if (limited) {
    return NextResponse.json({ error: "Rate limit exceeded. Please wait a moment." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Message is required." }, { status: 422 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { reply: "AI demo is not configured. Add your OPENAI_API_KEY to enable it." },
      { status: 200 }
    );
  }

  try {
    const { OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 300,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant for AI Infinity Labs, a software agency. " +
            "Answer questions about AI integration, full-stack development, and automation briefly. " +
            "Keep responses to 2-3 sentences. Be professional but friendly.",
        },
        { role: "user", content: parsed.data.message },
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "Sorry, I couldn't generate a response.";
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "AI service temporarily unavailable. Please try again." },
      { status: 503 }
    );
  }
}

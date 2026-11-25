import { NextRequest, NextResponse } from "next/server";
import { careerApplicationSchema } from "@/lib/validators";
import { db } from "@/lib/db";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendApplicationNotification } from "@/lib/email";
import { isValidSubmissionTimestamp } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const limited = await checkRateLimit("form", ip);
  if (limited) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = careerApplicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed.", issues: parsed.error.flatten() }, { status: 422 });
  }

  const { _honey, _ts, ...data } = parsed.data;

  if (_honey) {
    return NextResponse.json({ ok: true });
  }

  if (_ts && !isValidSubmissionTimestamp(_ts)) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  try {
    await db.careerApplication.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      coverLetter: data.coverLetter,
      linkedinUrl: data.linkedinUrl || null,
      portfolioUrl: data.portfolioUrl || null,
      jobPostingId: data.jobPostingId || null,
    },
    });
  } catch (error) {
    console.error("[careers] failed to save application:", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "We couldn't save your application right now." }, { status: 503 });
  }

  await sendApplicationNotification({ name: data.name, email: data.email });

  return NextResponse.json({ ok: true });
}

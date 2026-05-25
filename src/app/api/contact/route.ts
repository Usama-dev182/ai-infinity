import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validators";
import { db } from "@/lib/db";
import { checkRateLimit } from "@/lib/rate-limit";
import { sendContactNotification, sendContactConfirmation } from "@/lib/email";
import { isValidSubmissionTimestamp } from "@/lib/utils";

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
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

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed.", issues: parsed.error.flatten() }, { status: 422 });
  }

  const { _honey, _ts, ...data } = parsed.data;

  // Honeypot check
  if (_honey) {
    return NextResponse.json({ ok: true }); // silently drop spam
  }

  // Timestamp check
  if (_ts && !isValidSubmissionTimestamp(_ts)) {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  await db.contactSubmission.create({
    data: {
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      subject: data.subject,
      message: data.message,
    },
  });

  await sendContactNotification(data);
  await sendContactConfirmation(data.email, data.name);

  return NextResponse.json({ ok: true });
}

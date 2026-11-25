import type { NextRequest } from "next/server";
import { handleLeadSubmission } from "@/lib/leads/submit";

export async function POST(req: NextRequest) {
  return handleLeadSubmission(req, "contact");
}

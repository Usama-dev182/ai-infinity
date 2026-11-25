"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/authz";
import { leadUpdateSchema } from "@/lib/validators";
import { updateLeadStage } from "@/lib/leads/repository";

export interface LeadActionState {
  ok: boolean;
  message: string;
}

/**
 * Updates a lead's pipeline stage and notes.
 * Server Functions are reachable by direct POST, so authorization is checked here.
 */
export async function updateLeadAction(_prev: LeadActionState | null, formData: FormData): Promise<LeadActionState> {
  await requireAdmin();

  const parsed = leadUpdateSchema.safeParse({
    id: formData.get("id"),
    type: formData.get("type"),
    stage: formData.get("stage"),
    adminNotes: formData.get("adminNotes") ?? "",
  });
  if (!parsed.success) return { ok: false, message: "Invalid update." };

  try {
    await updateLeadStage(parsed.data);
  } catch {
    return { ok: false, message: "Could not save. Please try again." };
  }
  revalidatePath("/admin/leads");
  revalidatePath("/admin");
  return { ok: true, message: "Saved" };
}

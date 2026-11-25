import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/authz";

// Superseded by the unified lead pipeline; kept so existing bookmarks still work.
export default async function LegacySubmissionsPage() {
  await requireAdmin();
  redirect("/admin/leads?type=contact");
}

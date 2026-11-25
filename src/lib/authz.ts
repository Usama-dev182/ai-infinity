import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export type AppRole = "ADMIN" | "EDITOR";

export interface AppSessionUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  role?: AppRole;
}

export async function getSessionUser(): Promise<AppSessionUser | null> {
  const session = await auth();
  return (session?.user as AppSessionUser | undefined) ?? null;
}

export const isAdmin = (user: AppSessionUser | null): boolean => user?.role === "ADMIN";

/** Server components/actions: any signed-in user, otherwise redirect to the login page. */
export async function requireSession(): Promise<AppSessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  return user;
}

/**
 * Server components/actions handling personal data (leads, applications) or publishing:
 * ADMIN role only. Non-admin users are sent to the dashboard.
 */
export async function requireAdmin(): Promise<AppSessionUser> {
  const user = await requireSession();
  if (!isAdmin(user)) redirect("/admin?denied=1");
  return user;
}

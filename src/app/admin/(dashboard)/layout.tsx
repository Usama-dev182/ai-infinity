import type { ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/sidebar";
import { isAdmin, requireSession } from "@/lib/authz";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const user = await requireSession();

  return (
    <div className="min-h-screen flex bg-[var(--surface-bg-subtle)]">
      <AdminSidebar user={user} isAdmin={isAdmin(user)} />
      <main id="main-content" className="flex-1 min-w-0">
        <div className="max-w-7xl mx-auto p-6 pt-20 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

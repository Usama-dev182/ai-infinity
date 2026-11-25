import type { Metadata } from "next";
import type { ReactNode } from "react";

// Admin is private: never indexed, never followed (also enforced via X-Robots-Tag in next.config.ts).
export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Admin — AI Infinity Labs" },
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Root admin layout — intentionally unauthenticated so /admin/login can render.
 * Authentication is enforced by app/admin/(dashboard)/layout.tsx and inside every
 * admin API route / server action.
 */
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return children;
}

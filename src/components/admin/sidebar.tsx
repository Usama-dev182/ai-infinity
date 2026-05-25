"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  Mail,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/posts", icon: FileText, label: "Blog Posts" },
  { href: "/admin/case-studies", icon: Briefcase, label: "Case Studies" },
  { href: "/admin/jobs", icon: Users, label: "Job Postings" },
  { href: "/admin/submissions/contact", icon: Mail, label: "Contact" },
  { href: "/admin/submissions/quotes", icon: MessageSquare, label: "Quotes" },
  { href: "/admin/submissions/careers", icon: Users, label: "Applications" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
];

interface Props {
  user: { name?: string | null; email?: string | null };
}

export function AdminSidebar({ user }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-[var(--surface-card)] border border-[var(--surface-border)]"
      >
        <Menu className="w-5 h-5 text-[var(--text-primary)]" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed lg:sticky top-0 z-50 h-screen w-64 flex-shrink-0 flex flex-col bg-[var(--surface-card)] border-r border-[var(--surface-border)] transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[var(--surface-border)]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-[var(--text-primary)]">Admin</span>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  active
                    ? "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--surface-bg-subtle)] hover:text-[var(--text-primary)]"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-[var(--surface-border)]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {user.name?.[0] ?? user.email?.[0] ?? "A"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[var(--text-primary)] truncate">{user.name ?? "Admin"}</p>
              <p className="text-xs text-[var(--text-muted)] truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

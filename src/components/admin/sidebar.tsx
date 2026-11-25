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
  Inbox,
  UserCheck,
  LogOut,
  Menu,
  X,
  ExternalLink,
  type LucideIcon,
} from "lucide-react";
import { BrandMark } from "@/components/marketing/brand-logo";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: string;
  adminOnly?: boolean;
}

const NAV: NavItem[] = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/submissions/contact", icon: Inbox, label: "Contact", adminOnly: true },
  { href: "/admin/submissions/quotes", icon: Inbox, label: "Quotes", adminOnly: true },
  { href: "/admin/posts", icon: FileText, label: "Blog Posts" },
  { href: "/admin/case-studies", icon: Briefcase, label: "Case Studies" },
  { href: "/admin/jobs", icon: Users, label: "Job Postings" },
  { href: "/admin/submissions/careers", icon: UserCheck, label: "Applications", adminOnly: true },
];

interface Props {
  user: { name?: string | null; email?: string | null };
  isAdmin: boolean;
}

export function AdminSidebar({ user, isAdmin }: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const items = NAV.filter((item) => isAdmin || !item.adminOnly);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open admin navigation"
        aria-expanded={open}
        aria-controls="admin-sidebar"
        className="lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-[var(--surface-card)] border border-[var(--surface-border)]"
      >
        <Menu aria-hidden="true" className="w-5 h-5 text-[var(--text-primary)]" />
      </button>

      {open && (
        <div aria-hidden="true" className="lg:hidden fixed inset-0 z-40 bg-black/50" onClick={() => setOpen(false)} />
      )}

      <aside
        id="admin-sidebar"
        className={cn(
          "fixed lg:sticky top-0 z-50 h-screen w-64 flex-shrink-0 flex flex-col bg-[var(--surface-card)] border-r border-[var(--surface-border)] transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-[var(--surface-border)]">
          <Link href="/admin" className="flex items-center gap-2">
            <BrandMark />
            <span className="font-bold text-sm text-[var(--text-primary)]">Admin</span>
          </Link>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close admin navigation" className="lg:hidden p-1">
            <X aria-hidden="true" className="w-5 h-5 text-[var(--text-muted)]" />
          </button>
        </div>

        <nav aria-label="Admin" className="flex-1 p-3 overflow-y-auto">
          <ul className="space-y-1">
            {items.map(({ href, icon: Icon, label }) => {
              const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      active
                        ? "bg-[var(--brand-primary)]/10 text-[var(--text-brand)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--surface-bg-subtle)] hover:text-[var(--text-primary)]"
                    )}
                  >
                    <Icon aria-hidden="true" className="w-4 h-4 shrink-0" />
                    {label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--surface-bg-subtle)] hover:text-[var(--text-primary)]"
              >
                <ExternalLink aria-hidden="true" className="w-4 h-4 shrink-0" />
                View website
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-[var(--surface-border)]">
          <div className="flex items-center gap-3 mb-3">
            <div
              aria-hidden="true"
              className="w-8 h-8 rounded-full bg-cta-gradient flex items-center justify-center text-white text-xs font-bold shrink-0"
            >
              {user.name?.[0] ?? user.email?.[0] ?? "A"}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-[var(--text-primary)] truncate">{user.name ?? "Admin"}</p>
              <p className="text-xs text-[var(--text-muted)] truncate">{user.email}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--color-error-text)] hover:bg-red-500/10 transition-colors"
          >
            <LogOut aria-hidden="true" className="w-4 h-4" /> Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

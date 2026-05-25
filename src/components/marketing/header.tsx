"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NAV_ITEMS, SITE } from "@/content/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile nav on route change
  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass-card border-b border-[var(--surface-border)] shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <TrackedLink
            href="/"
            className="flex items-center gap-2 group"
            eventName="nav_click"
            params={{ label: SITE.name, location: "header_logo", destination: "/" }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-[var(--text-primary)] group-hover:gradient-text transition-all">
              {SITE.name}
            </span>
          </TrackedLink>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <TrackedLink
                key={item.href}
                href={item.href}
                eventName="nav_click"
                params={{ label: item.label, location: "header_desktop", destination: item.href }}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "text-[var(--brand-primary)] bg-[var(--brand-primary)]/10"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-bg-muted)]"
                )}
              >
                {item.label}
              </TrackedLink>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <Button asChild variant="gradient" size="default">
              <TrackedLink
                href="/quote"
                eventName="cta_click"
                params={{ label: "Request a Quote", location: "header_desktop", destination: "/quote" }}
              >
                Request a Quote
              </TrackedLink>
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle mobile menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden glass-card border-t border-[var(--surface-border)] overflow-hidden"
          >
            <div className="container mx-auto max-w-7xl px-4 py-4 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <TrackedLink
                  key={item.href}
                  href={item.href}
                  eventName="nav_click"
                  params={{ label: item.label, location: "header_mobile", destination: item.href }}
                  className={cn(
                    "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    pathname === item.href || pathname.startsWith(item.href + "/")
                      ? "text-[var(--brand-primary)] bg-[var(--brand-primary)]/10"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-bg-muted)]"
                  )}
                >
                  {item.label}
                </TrackedLink>
              ))}
              <div className="pt-2 border-t border-[var(--surface-border)]">
                <Button asChild variant="gradient" className="w-full">
                  <TrackedLink
                    href="/quote"
                    eventName="cta_click"
                    params={{ label: "Request a Quote", location: "header_mobile", destination: "/quote" }}
                  >
                    Request a Quote
                  </TrackedLink>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

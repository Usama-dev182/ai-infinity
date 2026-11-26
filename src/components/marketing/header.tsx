"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { BrandMark } from "@/components/marketing/brand-logo";
import { SITE } from "@/content/site";
import {
  PRIMARY_CTA,
  isActivePath,
  isNavGroup,
  type NavEntry,
  type NavGroup,
} from "@/content/nav-constants";
import { cn } from "@/lib/utils";

const navItemClass = (active: boolean) =>
  cn(
    "inline-flex items-center gap-1 px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
    active
      ? "text-[var(--text-brand)] bg-[var(--brand-primary)]/10"
      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-bg-muted)]"
  );

/**
 * Disclosure-pattern dropdown: opens on click/Enter/Space (and hover for fine pointers),
 * closes on Escape (returning focus), outside click, or focus leaving the group.
 */
function NavDropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = group.children.some((c) => isActivePath(pathname, c.href));

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const canHover = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => {
        if (!canHover()) return;
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onMouseLeave={() => {
        if (!canHover()) return;
        closeTimer.current = setTimeout(() => setOpen(false), 150);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
      onBlur={(event) => {
        if (!containerRef.current?.contains(event.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className={navItemClass(active)}
      >
        {group.label}
        <ChevronDown
          aria-hidden="true"
          className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      <div
        id={panelId}
        // Visibility is only transitioned when closing (so the panel fades out before hiding).
        // When opening it must switch immediately: a visibility transition keeps the panel hidden
        // for its first frame, and links in a hidden panel can't take focus, so a fast Tab after
        // Enter would skip the menu and close it.
        className={cn(
          "absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 duration-150",
          open
            ? "visible opacity-100 translate-y-0 transition-[opacity,transform]"
            : "invisible opacity-0 translate-y-1 transition-[opacity,transform,visibility]"
        )}
      >
        <ul className="min-w-[240px] rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] shadow-xl p-1.5">
          {group.children.map((child) => {
            const childActive = isActivePath(pathname, child.href);
            return (
              <li key={child.href}>
                <TrackedLink
                  href={child.href}
                  aria-current={childActive ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  eventName="nav_click"
                  params={{ label: child.label, location: "header_dropdown", destination: child.href }}
                  className={cn(
                    "flex flex-col gap-0.5 px-4 py-3 rounded-lg transition-colors",
                    childActive
                      ? "bg-[var(--brand-primary)]/10 text-[var(--text-brand)]"
                      : "text-[var(--text-primary)] hover:bg-[var(--surface-bg-muted)]"
                  )}
                >
                  <span className="text-sm font-medium">{child.label}</span>
                  {child.description && (
                    <span className="text-xs text-[var(--text-muted)]">{child.description}</span>
                  )}
                </TrackedLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/** `items` is passed from the server layout so menu data stays out of the client bundle. */
export function Header({ items }: { items: NavEntry[] }) {
  const pathname = usePathname();
  // The menu is "open" only for the path it was opened on, so navigation closes it
  // without a state update inside an effect.
  const [menuOpenedAt, setMenuOpenedAt] = useState<string | null>(null);
  const mobileOpen = menuOpenedAt === pathname;
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpenedAt(null);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  const closeMenu = () => setMenuOpenedAt(null);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow,padding] duration-300",
        mobileOpen
          ? "bg-[var(--surface-bg)] border-b border-[var(--surface-border)] shadow-md py-3"
          : scrolled
            ? "header-surface border-b border-[var(--surface-border)] shadow-sm py-3"
            : "bg-transparent py-4 xl:py-5"
      )}
    >
      <nav aria-label="Main" className="container-page">
        <div className="flex items-center justify-between gap-4">
          <TrackedLink
            href="/"
            className="flex items-center gap-2 group rounded-lg"
            eventName="nav_click"
            params={{ label: SITE.name, location: "header_logo", destination: "/" }}
          >
            <BrandMark />
            <span className="font-bold text-lg text-[var(--text-primary)] whitespace-nowrap">{SITE.name}</span>
          </TrackedLink>

          {/* Desktop navigation */}
          <ul className="hidden xl:flex items-center gap-0.5">
            {items.map((item) => (
              <li key={item.label}>
                {isNavGroup(item) ? (
                  <NavDropdown group={item} pathname={pathname} />
                ) : (
                  <TrackedLink
                    href={item.href}
                    aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                    eventName="nav_click"
                    params={{ label: item.label, location: "header_desktop", destination: item.href }}
                    className={navItemClass(isActivePath(pathname, item.href))}
                  >
                    {item.label}
                  </TrackedLink>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden xl:flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="gradient">
              <TrackedLink
                href={PRIMARY_CTA.href}
                eventName="cta_click"
                params={{ label: PRIMARY_CTA.label, location: "header_desktop", destination: PRIMARY_CTA.href }}
              >
                {PRIMARY_CTA.label}
              </TrackedLink>
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex xl:hidden items-center gap-1">
            <ThemeToggle />
            <Button
              ref={menuButtonRef}
              variant="ghost"
              size="icon"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpenedAt(mobileOpen ? null : pathname)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — scrollable on short screens */}
      <div
        id="mobile-menu"
        hidden={!mobileOpen}
        className="xl:hidden border-t border-[var(--surface-border)] mt-3 max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain"
      >
        <div className="container-page py-4 flex flex-col gap-5">
          {items.map((item) =>
            isNavGroup(item) ? (
              <div key={item.label}>
                <p className="px-4 pb-1 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  {item.label}
                </p>
                <ul>
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <MobileLink href={child.href} label={child.label} pathname={pathname} onNavigate={closeMenu} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <MobileLink key={item.href} href={item.href} label={item.label} pathname={pathname} onNavigate={closeMenu} />
            )
          )}
          <div className="pt-4 border-t border-[var(--surface-border)]">
            <Button asChild variant="gradient" size="lg" className="w-full">
              <TrackedLink
                href={PRIMARY_CTA.href}
                onClick={closeMenu}
                eventName="cta_click"
                params={{ label: PRIMARY_CTA.label, location: "header_mobile", destination: PRIMARY_CTA.href }}
              >
                {PRIMARY_CTA.label}
              </TrackedLink>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileLink({
  href,
  label,
  pathname,
  onNavigate,
}: {
  href: string;
  label: string;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = isActivePath(pathname, href);
  return (
    <TrackedLink
      href={href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      eventName="nav_click"
      params={{ label, location: "header_mobile", destination: href }}
      className={cn(
        "flex items-center min-h-11 px-4 rounded-lg text-base font-medium transition-colors",
        active
          ? "text-[var(--text-brand)] bg-[var(--brand-primary)]/10"
          : "text-[var(--text-primary)] hover:bg-[var(--surface-bg-muted)]"
      )}
    >
      {label}
    </TrackedLink>
  );
}

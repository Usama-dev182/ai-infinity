// Lightweight navigation primitives safe to import from client components.
// (Menu data that depends on the full service/industry catalogues lives in navigation.ts
// and is passed to the client header as props, keeping that copy out of the JS bundle.)

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  /** Optional landing page for the group. */
  href?: string;
  children: NavLink[];
}

export type NavEntry = NavLink | NavGroup;

export const isNavGroup = (item: NavEntry): item is NavGroup => "children" in item;

export const PRIMARY_CTA = { label: "Discuss Your Project", href: "/contact" } as const;
export const SECONDARY_CTA = { label: "Explore Our Work", href: "/case-studies" } as const;

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

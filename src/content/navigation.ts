// Site navigation — single source for header (desktop + mobile) and footer.

import { SERVICES, serviceHref } from "@/content/services";
import { INDUSTRY_PAGES } from "@/content/industries";
import type { NavEntry, NavLink } from "@/content/nav-constants";

export type { NavEntry, NavGroup, NavLink } from "@/content/nav-constants";
export { PRIMARY_CTA, SECONDARY_CTA, isActivePath, isNavGroup } from "@/content/nav-constants";

export const HEADER_NAV: NavEntry[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All services", href: "/services", description: "Overview of how we can help" },
      ...SERVICES.map((s) => ({ label: s.title, href: serviceHref(s) })),
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      ...INDUSTRY_PAGES.map((i) => ({ label: i.name, href: `/industries/${i.slug}`, description: i.shortDescription })),
      { label: "All industries", href: "/industries", description: "Sectors we work with" },
    ],
  },
  {
    label: "Work",
    children: [
      { label: "Case Studies", href: "/case-studies", description: "Engineering projects we've delivered" },
      { label: "Products", href: "/products", description: "In-house AI tools in development" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/blog", description: "AI and engineering articles" },
      { label: "Tech Talks", href: "/tech-talks", description: "Video series on YouTube" },
      { label: "AI Solution Advisor", href: "/tools/ai-solution-advisor", description: "Explore AI for your business" },
      { label: "AI ROI Calculator", href: "/tools/ai-roi-calculator", description: "Estimate automation value" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Company",
    children: [
      { label: "About", href: "/about", description: "Founder and how we work" },
      { label: "Careers", href: "/careers", description: "Join the team" },
      { label: "Contact", href: "/contact", description: "Start a conversation" },
    ],
  },
];

/** Flat list used by the footer "Company" column. */
export const FOOTER_LINKS: NavLink[] = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Consulting", href: "/consulting" },
  { label: "Pricing", href: "/pricing" },
  { label: "Products", href: "/products" },
  { label: "Blog", href: "/blog" },
  { label: "Tech Talks", href: "/tech-talks" },
  { label: "Free AI Tools", href: "/tools" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];


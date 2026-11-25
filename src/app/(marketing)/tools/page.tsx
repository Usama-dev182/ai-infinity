import type { Metadata } from "next";
import { ArrowRight, Bot, Calculator } from "lucide-react";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { PageHero, Section } from "@/components/marketing/section";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free AI Tools — Advisor & ROI Calculator",
  description: "Free interactive tools to explore AI opportunities: an AI Solution Advisor and an AI automation ROI calculator.",
  canonicalPath: "/tools",
  ogType: "Free tools",
});

const TOOLS = [
  {
    href: "/tools/ai-solution-advisor",
    icon: Bot,
    title: "AI Solution Advisor",
    description: "Describe a business challenge and get practical, AI-generated suggestions for where to start.",
  },
  {
    href: "/tools/ai-roi-calculator",
    icon: Calculator,
    title: "AI ROI Calculator",
    description: "Estimate the time and cost value of automating a repetitive workflow, with payback and ROI.",
  },
];

export default function ToolsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Tools", path: "/tools" }])} />
      <PageHero
        eyebrow="Free tools"
        title="Explore AI for your business"
        description="Practical tools to help you think through AI opportunities before talking to anyone."
      />
      <Section>
        <ul className="grid md:grid-cols-2 gap-6">
          {TOOLS.map(({ href, icon: Icon, title, description }) => (
            <li key={href}>
              <TrackedLink
                href={href}
                eventName="tool_card_click"
                params={{ destination: href, location: "tools_index" }}
                className="group flex flex-col h-full rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-7 hover:border-[var(--brand-primary)]/40 hover:shadow-lg transition-[border-color,box-shadow]"
              >
                <span className="w-12 h-12 rounded-xl bg-cta-gradient flex items-center justify-center">
                  <Icon aria-hidden="true" className="w-6 h-6 text-white" />
                </span>
                <h2 className="mt-5 text-heading-3 font-bold text-[var(--text-primary)] group-hover:text-[var(--text-brand)]">{title}</h2>
                <p className="mt-2 text-[var(--text-secondary)] flex-1">{description}</p>
                <span className="mt-5 inline-flex items-center gap-1 font-medium text-[var(--text-brand)]">
                  Open tool <ArrowRight aria-hidden="true" className="w-4 h-4" />
                </span>
              </TrackedLink>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

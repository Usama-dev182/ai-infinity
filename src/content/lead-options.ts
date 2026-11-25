// Allowlisted options for lead forms — shared by the UI and server-side validation.

import { SERVICES } from "@/content/services";
import { ADVISOR_INDUSTRIES } from "@/content/advisor";

export const LEAD_SERVICE_OPTIONS = [
  ...SERVICES.map((s) => ({ value: s.slug, label: s.title })),
  { value: "not-sure", label: "Not sure yet" },
];

export const LEAD_INDUSTRY_OPTIONS = ADVISOR_INDUSTRIES.map((i) => ({ value: i.id, label: i.label }));

export const BUDGET_OPTIONS = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 – $15,000" },
  { value: "15k-50k", label: "$15,000 – $50,000" },
  { value: "50k-plus", label: "$50,000+" },
  { value: "undecided", label: "Not decided yet" },
];

export const TIMELINE_OPTIONS = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-2-months", label: "Within 1–2 months" },
  { value: "3-6-months", label: "In 3–6 months" },
  { value: "exploring", label: "Just exploring" },
];

/** Internal conversion points that link to the contact form (`?topic=`). */
export const ENTRY_POINTS = [
  { value: "advisor", label: "AI Solution Advisor" },
  { value: "roi-calculator", label: "ROI calculator" },
  { value: "discovery-call", label: "Discovery call request" },
];

export const LEAD_STAGES = [
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "QUALIFIED", label: "Qualified" },
  { value: "DISCOVERY_SCHEDULED", label: "Discovery scheduled" },
  { value: "PROPOSAL_SENT", label: "Proposal sent" },
  { value: "WON", label: "Won" },
  { value: "LOST", label: "Lost" },
] as const;

export type LeadStageValue = (typeof LEAD_STAGES)[number]["value"];

const labelMap = (options: readonly { value: string; label: string }[]) =>
  Object.fromEntries(options.map((o) => [o.value, o.label])) as Record<string, string>;

export const LABELS = {
  service: labelMap(LEAD_SERVICE_OPTIONS),
  industry: labelMap(LEAD_INDUSTRY_OPTIONS),
  budget: labelMap(BUDGET_OPTIONS),
  timeline: labelMap(TIMELINE_OPTIONS),
  entryPoint: labelMap(ENTRY_POINTS),
  stage: labelMap(LEAD_STAGES),
};

/** Human label for a stored option value; falls back to the raw value (legacy rows). */
export function optionLabel(kind: keyof typeof LABELS, value?: string | null) {
  if (!value) return undefined;
  return LABELS[kind][value] ?? value;
}

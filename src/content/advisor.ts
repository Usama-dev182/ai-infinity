// AI Solution Advisor — shared, allowlisted options and deterministic guidance.
// Used by the client UI (chips), the API (input allowlist + system context) and as the
// fallback when the AI service is unavailable. No user text is ever stored here.

export interface AdvisorOption {
  id: string;
  label: string;
}

export interface AdvisorChallenge extends AdvisorOption {
  /** Related service slug from src/content/services.ts */
  service: string;
  /** Deterministic guidance used when the AI service is unavailable. */
  guidance: string[];
}

export const ADVISOR_INDUSTRIES: AdvisorOption[] = [
  { id: "real-estate", label: "Real estate & PropTech" },
  { id: "saas", label: "SaaS & startups" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "professional-services", label: "Professional services" },
  { id: "operations", label: "Enterprise operations" },
  { id: "other", label: "Something else" },
];

export const ADVISOR_CHALLENGES: AdvisorChallenge[] = [
  {
    id: "lead-qualification",
    label: "Lead qualification",
    service: "ai-automation",
    guidance: [
      "Start by capturing leads in one place (form, chat, email) and enriching them with the details you already ask for on calls.",
      "An AI step can classify intent and readiness, draft a first reply, and route high-value leads to a person — with your CRM updated automatically.",
      "A good first step is a small pilot on one channel, measuring response time and how often the AI's routing matches your team's judgement.",
    ],
  },
  {
    id: "customer-support",
    label: "Customer support",
    service: "ai-agents",
    guidance: [
      "Most support automation starts with triage: classifying and prioritising requests, then drafting replies grounded in your help content.",
      "Keep people in the loop for refunds, complaints and anything account-specific, and let the assistant escalate when it is unsure.",
      "A practical first step is to run the assistant in 'draft only' mode on real tickets and compare its drafts with your team's replies.",
    ],
  },
  {
    id: "manual-operations",
    label: "Manual operations",
    service: "ai-automation",
    guidance: [
      "List the steps where people copy data between tools; those are usually best solved with reliable integrations rather than AI.",
      "Add AI only where judgement or language is involved — classifying, extracting or summarising — with validation and an exception queue.",
      "Start with the single workflow that takes the most hours each week and has clear inputs and outputs.",
    ],
  },
  {
    id: "document-processing",
    label: "Document processing",
    service: "ai-integrations",
    guidance: [
      "Document AI works best when you define exactly which fields you need and validate them against a schema.",
      "Route low-confidence extractions to a person rather than processing them automatically, and track accuracy over time.",
      "A useful first step is a small evaluation set of real documents (with sensitive data removed) to measure accuracy before building the full pipeline.",
    ],
  },
  {
    id: "ai-saas-product",
    label: "Building an AI SaaS product",
    service: "ai-product-engineering",
    guidance: [
      "Validate the riskiest assumption first — usually whether the model performs well enough on real inputs, at an acceptable cost per request.",
      "A focused prototype on representative data answers that quickly, before you invest in the full product.",
      "Once validated, build the MVP on a production foundation: authentication, data model, evaluations and monitoring for the AI features.",
    ],
  },
  {
    id: "other",
    label: "Something else",
    service: "ai-product-engineering",
    guidance: [
      "Describe the workflow: who does it, how often, which tools are involved, and what a better outcome would look like.",
      "The best AI opportunities usually combine high volume, repetitive judgement and clear success criteria.",
      "If you're unsure where to start, a short discovery conversation can map the options — including simpler, non-AI solutions.",
    ],
  },
];

export const ADVISOR_LIMITS = {
  /** Characters per visitor message. */
  maxInputChars: 600,
  /** Visitor messages per conversation before handing off to a consultation. */
  maxUserTurns: 8,
  /** Messages (user + assistant) sent to the model as context. */
  maxContextMessages: 8,
  /** Total characters of conversation context sent to the model. */
  maxContextChars: 4000,
  /** Characters accepted per assistant message echoed back by the client. */
  maxAssistantChars: 2000,
} as const;

export const getAdvisorChallenge = (id?: string) => ADVISOR_CHALLENGES.find((c) => c.id === id);
export const getAdvisorIndustry = (id?: string) => ADVISOR_INDUSTRIES.find((i) => i.id === id);

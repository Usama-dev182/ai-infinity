// Industries. Only industries with validated experience get a detail page; others are listed
// as areas we work in, without thin SEO pages.
//
// Use-case copy describes potential offerings. Do not present unbuilt solutions as delivered work.

export interface IndustryUseCase {
  title: string;
  description: string;
}

export interface Industry {
  slug: string;
  name: string;
  shortDescription: string;
  /** Detail page at /industries/[slug] exists only when true. */
  hasDetailPage: boolean;
  /** Lower-case label used in headings, e.g. "real estate". */
  audienceLabel?: string;
  heroTitle?: string;
  heroDescription?: string;
  challenges?: IndustryUseCase[];
  solutions?: IndustryUseCase[];
  approach?: string[];
  relatedServices?: string[];
  /** Case study slugs; only published ones are rendered. */
  relatedCaseStudies?: string[];
  faqs?: { question: string; answer: string }[];
  seo?: { title: string; description: string; keywords: string[] };
}

export const INDUSTRIES: Industry[] = [
  {
    slug: "real-estate",
    name: "Real Estate & PropTech",
    shortDescription:
      "Conversational AI, lead qualification and follow-up automation for agencies, brokerages and PropTech products.",
    hasDetailPage: true,
    audienceLabel: "real estate",
    heroTitle: "AI for Real Estate & PropTech",
    heroDescription:
      "We engineer conversational AI and automation for real estate — helping buyers, sellers and renters get timely answers, and helping professionals focus on the conversations that need them.",
    challenges: [
      {
        title: "Inquiries arrive around the clock",
        description: "Property questions come in evenings and weekends across portals, websites and messaging apps, and slow replies lose interest.",
      },
      {
        title: "Lead quality varies widely",
        description: "Agents spend time on contacts who aren't ready, while serious buyers and sellers wait for a call back.",
      },
      {
        title: "Context gets lost between conversations",
        description: "Preferences, budgets and timelines are scattered across calls, emails and notes, so clients repeat themselves.",
      },
      {
        title: "Follow-up is manual",
        description: "Updating the CRM, scheduling viewings and sending reminders takes time away from client work.",
      },
    ],
    solutions: [
      {
        title: "Conversational AI assistants",
        description: "Assistants that answer routine questions about listings, process and next steps in a consistent, on-brand voice.",
      },
      {
        title: "Lead capture & qualification",
        description: "Collect requirements conversationally, score readiness, and route each lead to the right person.",
      },
      {
        title: "Property inquiry assistants",
        description: "Help visitors narrow down options by location, budget and features, grounded in your listing data.",
      },
      {
        title: "CRM & follow-up automation",
        description: "Log conversations, update records, schedule viewings and trigger follow-ups automatically.",
      },
      {
        title: "Customer context & memory",
        description: "Carry relevant, user-visible preferences between sessions so clients don't start over each time.",
      },
      {
        title: "Professional handoffs",
        description: "Hand conversations to an agent with a concise, permissioned summary at the moments that need human judgement.",
      },
    ],
    approach: [
      "Start from your lead flow and the questions your team answers most often.",
      "Ground the assistant in your listings, policies and process — not generic market knowledge.",
      "Design handoff rules with your agents so the AI escalates early rather than guessing.",
      "Integrate with your CRM and calendar, and measure response time and conversion with your own data.",
    ],
    relatedServices: ["ai-product-engineering", "ai-integrations", "ai-automation", "ai-agents"],
    relatedCaseStudies: ["real-estate-conversational-ai"],
    faqs: [
      {
        question: "Can the assistant work with our existing CRM?",
        answer:
          "Usually, yes — through the CRM's API or an automation platform such as n8n or Make.com. We confirm integration options during discovery.",
      },
      {
        question: "Will it replace our agents?",
        answer:
          "No. The goal is to handle routine questions and qualification so agents spend more of their time on clients who are ready to talk.",
      },
      {
        question: "How is client data protected?",
        answer:
          "We design for data minimisation, role-based access and clear retention rules, and agree data-handling requirements with you before launch.",
      },
    ],
    seo: {
      title: "Real Estate AI Solutions & PropTech AI Development",
      description:
        "Conversational AI, lead qualification, property inquiry assistants and CRM automation for real estate agencies, brokerages and PropTech companies.",
      keywords: ["real estate AI solutions", "PropTech AI development", "real estate chatbot", "AI lead qualification real estate", "conversational AI real estate"],
    },
  },
  {
    slug: "saas-startups",
    name: "SaaS & Startups",
    shortDescription: "AI product engineering for founders and product teams, from prototype to production SaaS.",
    hasDetailPage: false,
    relatedServices: ["ai-product-engineering", "frontend-engineering", "full-stack-development"],
  },
  {
    slug: "ecommerce",
    name: "E-commerce",
    shortDescription: "Support automation, product search and content workflows for online retail teams.",
    hasDetailPage: false,
    relatedServices: ["ai-automation", "ai-integrations"],
  },
  {
    slug: "enterprise-operations",
    name: "Enterprise Operations",
    shortDescription: "Document processing, internal assistants and workflow automation across business systems.",
    hasDetailPage: false,
    relatedServices: ["ai-automation", "ai-agents"],
  },
];

export const INDUSTRY_PAGES = INDUSTRIES.filter((i) => i.hasDetailPage);

export function getIndustry(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}

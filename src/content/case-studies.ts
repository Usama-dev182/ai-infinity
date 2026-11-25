// Code-managed case studies.
//
// Publication rules
// - `status: "draft"` entries are never listed, never in the sitemap, and 404 publicly.
//   Admins can preview them at /admin/case-studies/preview/[slug].
// - Outcomes render only when `verified: true` (confirmed by the owner with evidence).
// - Capability status must reflect the real project state; use "unconfirmed" until the
//   owner confirms it.
// - This repository may be public: never add client names (unless approved), private URLs,
//   proprietary prompts, internal architecture, screenshots, or invented metrics.

export type PublicationStatus = "draft" | "published";
export type CapabilityStatus = "implemented" | "in-progress" | "planned" | "unconfirmed";

export interface CaseStudyOutcome {
  label: string;
  value: string;
  description: string;
  /** Only verified outcomes are rendered. */
  verified: boolean;
}

export interface CaseStudyCapability {
  title: string;
  description: string;
  status: CapabilityStatus;
}

export interface CaseStudySection {
  title: string;
  description: string;
}

export interface ArchitectureLayer {
  name: string;
  items: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  /** One or two sentences for cards and meta descriptions. */
  summary: string;
  /** Display name. Use an anonymised description unless the client approved naming. */
  client: string;
  clientUrl?: string | null;
  industry: string;
  industrySlug?: string;
  role?: string;
  status: PublicationStatus;
  featured: boolean;
  /** Service slugs from src/content/services.ts */
  services: string[];
  techStack: string[];
  overview?: string[];
  challenge?: string[];
  vision?: string[];
  contributions?: string[];
  capabilities?: CaseStudyCapability[];
  architecture?: { caption: string; layers: ArchitectureLayer[] };
  engineeringChallenges?: CaseStudySection[];
  projectStatus?: string;
  outcomes: CaseStudyOutcome[];
  lessons?: string[];
  seo?: { title?: string; description?: string; keywords?: string[] };
  coverImage?: string | null;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "real-estate-conversational-ai",
    title: "Engineering a Conversational AI Platform for Real Estate",
    summary:
      "Platform architecture and engineering for a conversational AI product that helps real estate consumers and professionals hold contextual conversations and hand off to the right person at the right time.",
    client: "Real estate technology venture (confidential)",
    industry: "Real Estate & PropTech",
    industrySlug: "real-estate",
    role: "Lead Platform Architect & Engineer",
    // Approval-gated: keep as draft until the owner confirms every statement below.
    status: "draft",
    featured: false,
    services: ["ai-product-engineering", "ai-integrations", "full-stack-development"],
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "LLM APIs", "Cloud hosting"],
    overview: [
      "This project is a conversational AI platform for the real estate market. It serves two audiences: consumers exploring properties and next steps, and the real estate professionals who support them.",
      "We lead the platform architecture and engineering: the conversational web application, the AI integration layer, identity and permissions, conversation persistence, and the infrastructure that lets the assistant keep context across interactions.",
    ],
    challenge: [
      "Real estate conversations are long-running and personal. A buyer or seller may return over weeks, and each conversation builds on what was said before — preferences, constraints, timelines and questions.",
      "Generic chatbots tend to reset with every session and can't tell when a question needs a qualified human. Professionals need a clean handoff with the relevant context rather than a transcript to read from scratch.",
    ],
    vision: [
      "A conversational experience that remembers relevant context with the user's knowledge, answers routine questions consistently, and recognises when to bring in a professional — passing along a concise, permissioned summary so the conversation continues without repetition.",
    ],
    contributions: [
      "Platform architecture and technical direction",
      "Conversational web application (frontend and backend)",
      "AI integration infrastructure behind a provider-agnostic interface",
      "Authentication and role-based access for consumers, professionals and administrators",
      "User, conversation and message management with persistence",
      "Context and memory infrastructure for continuity across sessions",
      "Secure backend APIs and permission checks",
      "Professional handoff workflows",
      "Data architecture, security model and deployment architecture",
    ],
    capabilities: [
      {
        title: "Conversational web application",
        description: "Responsive chat experience with conversation history and streaming responses.",
        status: "unconfirmed",
      },
      {
        title: "Role-based access",
        description: "Separate permissions for consumers, real estate professionals and administrators.",
        status: "unconfirmed",
      },
      {
        title: "Conversation persistence",
        description: "Durable storage of conversations and messages, scoped to their owners.",
        status: "unconfirmed",
      },
      {
        title: "Context & memory",
        description: "Carrying relevant, user-visible context between sessions so users don't repeat themselves.",
        status: "unconfirmed",
      },
      {
        title: "Professional handoff",
        description: "Routing a conversation to a professional with a concise, permissioned summary.",
        status: "unconfirmed",
      },
      {
        title: "Scalable deployment",
        description: "Stateless application tier with managed data services and environment separation.",
        status: "unconfirmed",
      },
    ],
    architecture: {
      caption:
        "Simplified, public-safe view. Component names are generic and intentionally omit proprietary implementation details.",
      layers: [
        { name: "Experience", items: ["Conversational web app", "Professional workspace", "Admin console"] },
        { name: "Application", items: ["Auth & roles", "Conversation service", "Handoff workflow", "Secure APIs"] },
        { name: "Intelligence", items: ["LLM provider interface", "Context assembly", "Memory store", "Safety checks"] },
        { name: "Data & infrastructure", items: ["Relational database", "Audit logging", "Managed cloud hosting"] },
      ],
    },
    engineeringChallenges: [
      {
        title: "Continuity without over-collection",
        description:
          "Memory has to make conversations feel continuous while keeping stored context minimal, scoped to the user, and removable.",
      },
      {
        title: "Knowing when to hand off",
        description:
          "Deciding when a professional should step in — and passing along the right context — matters more than answering every question automatically.",
      },
      {
        title: "Provider independence",
        description:
          "Isolating model calls behind an internal interface keeps the platform able to change providers or models as cost and quality evolve.",
      },
      {
        title: "Permissions across roles",
        description:
          "Consumers, professionals and administrators see different data; every API path enforces those boundaries server-side.",
      },
    ],
    projectStatus:
      "Active engagement. Capability status is shown per item above and will be updated as the platform progresses.",
    outcomes: [],
    lessons: [
      "Design memory and data-retention rules together, at the start.",
      "Treat the human handoff as a core product feature, not a fallback.",
      "Keep model providers behind an interface from day one.",
    ],
    seo: {
      title: "Real Estate Conversational AI Platform — Case Study",
      description:
        "How we approach the architecture of a conversational AI platform for real estate: contextual conversations, memory, role-based access and professional handoff.",
      keywords: ["real estate AI", "PropTech AI development", "conversational AI development", "real estate chatbot"],
    },
  },
  {
    slug: "daspire-platform",
    title: "Daspire",
    summary:
      "Redesigned and optimised the Daspire platform for enhanced user engagement and performance, implementing a modern frontend architecture with improved data visualisation.",
    client: "Daspire",
    clientUrl: "https://www.daspire.com/",
    industry: "SaaS / Data",
    status: "published",
    featured: true,
    services: ["full-stack-development"],
    techStack: ["React", "TypeScript", "Node.js"],
    outcomes: [
      { label: "Performance", value: "40%", description: "faster page loads", verified: false },
      { label: "UX", value: "Redesigned", description: "complete UI overhaul", verified: false },
    ],
  },
  {
    slug: "cohere-saas",
    title: "Cohere",
    summary:
      "Architected the frontend for a SaaS platform focused on seamless virtual collaboration, building scalable components and optimising API integrations.",
    client: "Cohere",
    clientUrl: "https://www.cohere.live/",
    industry: "SaaS / Collaboration",
    status: "published",
    featured: true,
    services: ["full-stack-development"],
    techStack: ["React", "TypeScript", "Redux"],
    outcomes: [
      { label: "Architecture", value: "Scalable", description: "feature-based component system", verified: false },
      { label: "Integrations", value: "10+", description: "API integrations delivered", verified: false },
    ],
  },
  {
    slug: "cazvid-job-board",
    title: "Cazvid",
    summary:
      "Contributed to a video resume-based job board, focusing on user journey optimisations and UI performance across a high-traffic global platform.",
    client: "Cazvid",
    clientUrl: "https://desktop.cazvid.app/en/auth",
    industry: "HR Tech / Job Board",
    status: "published",
    featured: true,
    services: ["full-stack-development"],
    techStack: ["React", "TypeScript", "REST APIs"],
    outcomes: [
      { label: "Users", value: "Global", description: "international user base", verified: false },
      { label: "Focus", value: "Performance", description: "UI speed optimisations", verified: false },
    ],
  },
  {
    slug: "ai-support-automation",
    title: "AI Customer Support Automation",
    summary:
      "Designed and built a multi-agent AI system that classifies, prioritises and drafts responses to inbound customer support emails, integrating with the client's helpdesk and CRM.",
    client: "E-commerce SaaS client",
    industry: "AI Automation / E-commerce",
    status: "published",
    featured: false,
    services: ["ai-automation", "ai-agents", "ai-integrations"],
    techStack: ["Python", "OpenAI", "LangChain", "FastAPI", "PostgreSQL", "n8n"],
    outcomes: [
      { label: "Volume", value: "500+", description: "inbound emails per day", verified: false },
      { label: "Tickets Automated", value: "70%", description: "of tier-1 support volume", verified: false },
      { label: "Response Time", value: "6 hrs → 4 min", description: "average first response", verified: false },
    ],
  },
];

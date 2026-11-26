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

export interface CaseStudySection {
  title: string;
  description: string;
}

export interface CaseStudyCapability {
  title: string;
  description: string;
  status: CapabilityStatus;
  /** Optional grouping label shown with the capability (e.g. "Core platform"). */
  group?: string;
}

export interface ArchitectureLayer {
  name: string;
  description?: string;
  items: string[];
}

/**
 * Public-safe architecture for the illustrative diagram. Use generic component names only;
 * never a client's real system diagram, vendors, prompts or proprietary mechanisms.
 */
export interface CaseStudyArchitecture {
  caption: string;
  /** Who uses the system (top row of the diagram). */
  actors?: string[];
  layers: ArchitectureLayer[];
  /** Key flows through the layers, described in plain language. */
  flows?: CaseStudySection[];
}

export interface CaseStudyCover {
  /** Path under /public or an absolute image URL. */
  src: string;
  /** Describes the image. Cards treat covers as decorative and ignore this. */
  alt: string;
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
  /** Short classification shown on cards, e.g. "Conversational AI platform". */
  projectType?: string;
  /**
   * Who delivered the work, when it was not an AI Infinity Labs engagement
   * (e.g. the founder's freelance contracts). Shown on cards and in the article.
   */
  engagement?: string;
  role?: string;
  status: PublicationStatus;
  featured: boolean;
  /** Service slugs from src/content/services.ts */
  services: string[];
  /** Leave empty until the stack is confirmed; an empty list is not rendered. */
  techStack: string[];
  overview?: string[];
  challenge?: string[];
  vision?: string[];
  contributions?: string[];
  capabilities?: CaseStudyCapability[];
  architecture?: CaseStudyArchitecture;
  /** Rendered as "Architectural considerations". */
  considerations?: CaseStudySection[];
  /** What the product is designed to achieve. Always labelled as intended, never as results. */
  intendedBenefits?: string[];
  projectStatus?: string;
  outcomes: CaseStudyOutcome[];
  lessons?: string[];
  seo?: { title?: string; description?: string; keywords?: string[] };
  cover?: CaseStudyCover | null;
}

const FREELANCE = "Founder's freelance project";

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "real-estate-conversational-ai",
    title: "Engineering a Conversational AI Platform for Real Estate",
    summary:
      "Platform architecture and engineering for an intelligent conversational AI platform where real estate consumers and professionals hold contextual, continuous conversations, with structured handoff to the right professional.",
    client: "Real estate technology venture (confidential)",
    industry: "Real Estate & PropTech",
    industrySlug: "real-estate",
    projectType: "Conversational AI platform",
    role: "Lead Platform Architect & Engineer",
    // Approval-gated. To publish after the owner approves: status "published", featured true.
    status: "draft",
    featured: false,
    services: ["ai-product-engineering", "ai-integrations", "full-stack-development"],
    // Not confirmed yet, so nothing is shown. Add the confirmed stack before publishing.
    techStack: [],
    cover: {
      src: "/images/case-studies/real-estate-conversational-ai.svg",
      alt: "Illustration of a conversational AI interface connecting a home search with a real estate professional",
    },
    overview: [
      "An intelligent conversational AI platform for the real estate market. Consumers and real estate professionals hold contextual conversations that continue across sessions, rather than talking to a scripted chatbot bolted onto a website.",
      "AI Infinity Labs leads the platform engineering as Lead Platform Architect & Engineer: the architecture, the conversational web application, the AI integration infrastructure, identity and permissions, conversation persistence, the context and memory infrastructure, and the professional handoff workflows.",
      "The client owns the product vision, the real estate expertise and its proprietary intelligence approach. This case study describes our engineering contribution only, and neither the client nor the product is named.",
    ],
    challenge: [
      "Real estate conversations are long-running and personal. A buyer or seller may come back over weeks, and each conversation builds on what was said before: preferences, constraints, timelines and open questions.",
      "Typical website chatbots reset with every session and can't tell when a question needs a qualified person. Professionals end up re-reading transcripts, or starting from scratch, instead of picking up the conversation where it stands.",
    ],
    vision: [
      "A platform where the conversation is the product. It keeps relevant context with the user's knowledge, answers routine questions consistently, and brings in a real estate professional at the right moment, with the context they need to continue without starting over.",
    ],
    contributions: [
      "Platform architecture and technical direction",
      "Conversational web application",
      "AI integration infrastructure",
      "Authentication and role-based access",
      "User and conversation management",
      "Conversation persistence",
      "Context and memory infrastructure",
      "Secure backend APIs",
      "Professional handoff workflows",
      "Data architecture, security and permissions",
      "Scalable deployment architecture",
    ],
    // Status confirmed by the owner (2026-11-25): all capability groups implemented,
    // with the platform still under active development.
    capabilities: [
      {
        group: "Core platform",
        title: "Platform architecture",
        description: "The overall system design: how the application, AI integration and data layers fit together.",
        status: "implemented",
      },
      {
        group: "Core platform",
        title: "Conversational web application",
        description: "The responsive web experience where consumers and professionals hold their conversations.",
        status: "implemented",
      },
      {
        group: "Core platform",
        title: "Secure backend APIs",
        description: "Authenticated APIs behind the conversational experience, with permission checks on users and conversations.",
        status: "implemented",
      },
      {
        group: "Accounts & data",
        title: "Authentication and role-based access",
        description: "Sign-in and distinct roles for the platform's different users, such as consumers and real estate professionals.",
        status: "implemented",
      },
      {
        group: "Accounts & data",
        title: "User and conversation management",
        description: "Managing users, their conversations and messages across the platform.",
        status: "implemented",
      },
      {
        group: "Accounts & data",
        title: "Data architecture, security and permissions",
        description: "A data model and access rules designed so each user and role reaches only the data they should.",
        status: "implemented",
      },
      {
        group: "AI & continuity",
        title: "AI integration infrastructure",
        description: "The integration layer that connects the platform to large language model services.",
        status: "implemented",
      },
      {
        group: "AI & continuity",
        title: "Conversation persistence",
        description: "Durable storage of conversations, so they can be resumed and reviewed.",
        status: "implemented",
      },
      {
        group: "AI & continuity",
        title: "Context and memory infrastructure",
        description:
          "Infrastructure that stores and retrieves conversation context, so returning users don't have to start over. The client's own intelligence approach is separate and not described here.",
        status: "implemented",
      },
      {
        group: "Handoff & scale",
        title: "Professional handoff workflows",
        description: "Workflows that bring a real estate professional into a conversation, together with the relevant context.",
        status: "implemented",
      },
      {
        group: "Handoff & scale",
        title: "Scalable deployment architecture",
        description: "A deployment architecture designed to grow with users and conversations.",
        status: "implemented",
      },
    ],
    architecture: {
      caption:
        "Illustrative architecture, created for this case study. It is a simplified, public-safe view with generic names. It is not the client's system design and omits proprietary details.",
      actors: ["Consumers", "Real estate professionals"],
      layers: [
        { name: "Experience", description: "Where conversations happen", items: ["Conversational web app", "Professional handoff"] },
        {
          name: "Platform services",
          description: "Identity, conversations and workflows",
          items: ["Authentication & roles", "User & conversation management", "Handoff workflows", "Secure APIs"],
        },
        { name: "AI integration", description: "Connecting to language models", items: ["LLM service integration", "Context & memory infrastructure"] },
        {
          name: "Data & infrastructure",
          description: "Storage and deployment",
          items: ["Conversation persistence", "Application data model", "Scalable deployment"],
        },
      ],
      flows: [
        {
          title: "Conversation",
          description: "A message passes through the secure API to the platform services, which use the stored context and the AI integration layer to respond.",
        },
        {
          title: "Continuity",
          description: "Conversations and context are persisted, so the next session continues where the last one ended.",
        },
        {
          title: "Handoff",
          description: "When a professional is needed, the handoff workflow brings them in with the relevant conversation context and the right permissions.",
        },
      ],
    },
    considerations: [
      {
        title: "Continuity without over-collection",
        description: "Context has to make conversations feel continuous while staying minimal, scoped to the right user and removable.",
      },
      {
        title: "Roles and data boundaries",
        description: "Consumers and professionals see different information, so permissions belong in the backend and the data model, not only in the interface.",
      },
      {
        title: "Handoff as a product feature",
        description: "Bringing in a professional is a first-class workflow with its own states and permissions, not an error path.",
      },
      {
        title: "Room for the AI layer to evolve",
        description: "Models and providers change quickly. Keeping AI integration as its own layer lets it evolve without reworking the rest of the platform.",
      },
    ],
    intendedBenefits: [
      "Prompt, consistent first responses to property enquiries at any hour.",
      "Conversations that pick up where they left off, so consumers don't repeat themselves.",
      "Professionals receive context with every handoff, so their time goes to conversations that need them.",
      "A platform foundation that can grow in users and features without re-architecture.",
    ],
    projectStatus:
      "In active development. Every capability listed above is implemented, and the platform continues to be extended. Measured outcomes will be added only when they are available and approved for publication.",
    outcomes: [],
    lessons: [
      "Design memory and data-retention rules together, at the start.",
      "Treat the human handoff as a core product feature, not a fallback.",
      "Plan the AI integration layer so models and providers can change as cost and quality evolve.",
    ],
    seo: {
      title: "Real Estate Conversational AI Platform — Case Study",
      description:
        "How AI Infinity Labs engineered an intelligent conversational AI platform for real estate: platform architecture, context and memory infrastructure, role-based access and professional handoff.",
      keywords: ["real estate AI", "PropTech AI development", "conversational AI platform", "real estate conversational AI"],
    },
  },
  {
    slug: "daspire-platform",
    title: "Daspire",
    summary:
      "Frontend engineering for the Daspire platform, focused on a modern frontend architecture, data visualisation and performance.",
    client: "Daspire",
    clientUrl: "https://www.daspire.com/",
    industry: "SaaS / Data",
    projectType: "SaaS analytics platform",
    engagement: FREELANCE,
    role: "Frontend engineer (freelance)",
    cover: { src: "/images/case-studies/daspire-platform.svg", alt: "Illustration of an analytics dashboard" },
    status: "published",
    featured: true,
    services: ["frontend-engineering", "full-stack-development"],
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
      "Frontend architecture for a SaaS platform for virtual collaboration: reusable components and API integrations.",
    client: "Cohere",
    clientUrl: "https://www.cohere.live/",
    industry: "SaaS / Collaboration",
    projectType: "SaaS collaboration platform",
    engagement: FREELANCE,
    role: "Frontend engineer (freelance)",
    cover: { src: "/images/case-studies/cohere-saas.svg", alt: "Illustration of a video collaboration workspace" },
    status: "published",
    featured: true,
    services: ["frontend-engineering", "full-stack-development"],
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
      "Contributed to a video resume-based job board, focusing on user journey improvements and UI performance.",
    client: "Cazvid",
    clientUrl: "https://desktop.cazvid.app/en/auth",
    industry: "HR Tech / Job Board",
    projectType: "Video job board",
    engagement: FREELANCE,
    role: "Frontend engineer (freelance)",
    cover: { src: "/images/case-studies/cazvid-job-board.svg", alt: "Illustration of video resume cards on a job board" },
    status: "published",
    featured: true,
    services: ["frontend-engineering", "full-stack-development"],
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
    projectType: "AI automation system",
    // Confirmed by the owner (2026-11-25) as a real project; outcomes stay hidden until verified.
    cover: { src: "/images/case-studies/ai-support-automation.svg", alt: "Illustration of support emails routed by AI agents" },
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

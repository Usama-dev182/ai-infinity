// Service catalogue. Existing slugs (full-stack-development, ai-integrations, ai-automation)
// are preserved; their URLs must not change.
//
// Copy describes capabilities and approach — not past results. Do not add outcome claims
// here; verified outcomes belong to individual case studies.

export type ServiceIconName = "Rocket" | "Brain" | "Bot" | "Workflow" | "Code2" | "Compass" | "MonitorSmartphone";

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceStep {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  title: string;
  shortTitle: string;
  icon: ServiceIconName;
  tagline: string;
  description: string;
  /** Present when the service lives on another page instead of /services/[slug]. */
  href?: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  capabilities: string[];
  audience: string[];
  problems: string[];
  solution: string[];
  useCases: ServiceStep[];
  deliverables: string[];
  approach: ServiceStep[];
  techStack: string[];
  faqs: ServiceFaq[];
  related: string[];
}

export const SERVICES: Service[] = [
  {
    slug: "ai-product-engineering",
    title: "AI Product Engineering",
    shortTitle: "AI Products",
    icon: "Rocket",
    tagline: "From AI idea to production-ready product",
    description:
      "We take AI product ideas through discovery, prototyping, MVP engineering and production deployment — on an architecture you can keep building on after launch.",
    metaTitle: "AI Product Engineering & AI SaaS Development",
    metaDescription:
      "AI product engineering from discovery and feasibility to prototypes, MVPs and production deployment. Custom AI SaaS development on a maintainable architecture.",
    keywords: [
      "AI product engineering",
      "custom AI SaaS development",
      "AI MVP development",
      "AI prototype development",
      "AI product development company",
    ],
    capabilities: [
      "Product discovery and feasibility assessment",
      "Proof-of-concept development",
      "Rapid AI prototyping",
      "MVP engineering",
      "AI SaaS development",
      "System architecture",
      "Production deployment",
      "Product iteration",
    ],
    audience: [
      "Founders validating an AI product idea before committing a full budget",
      "Product teams launching a new AI-first product or feature line",
      "Companies turning an internal AI prototype into a supported product",
    ],
    problems: [
      "An AI idea that hasn't yet been tested against real data, real users or real costs",
      "Prototypes that work in a demo but break on edge cases, latency or cost at scale",
      "No clear path from a proof of concept to a secure, maintainable production system",
      "Uncertainty about which parts of the product genuinely need AI and which are ordinary software",
    ],
    solution: [
      "We start with a short discovery and feasibility phase that tests the riskiest assumptions first: data availability, model quality on your real inputs, cost per request, and how the feature fits the user's workflow.",
      "Ideas that hold up move into a tightly scoped MVP built on a production foundation — authentication, data model, observability and an evaluation set for the AI features — so the codebase you launch with is the one you keep iterating on.",
    ],
    useCases: [
      { title: "AI SaaS MVP", description: "A focused first release of a new AI product, with billing, accounts and an admin view." },
      { title: "AI copilot in an existing product", description: "An assistant or generation feature embedded in your current application." },
      { title: "Prototype to product", description: "Hardening an internal proof of concept with auth, tests, monitoring and deployment." },
      { title: "Conversational products", description: "Chat-first experiences with memory, structured actions and human handoff." },
    ],
    deliverables: [
      "Feasibility summary with risks, cost estimates and a recommended architecture",
      "Working prototype or proof of concept on representative data",
      "Production MVP codebase with documentation",
      "CI/CD pipeline and hosted environments",
      "Evaluation set and monitoring for AI features",
      "Prioritised iteration roadmap",
    ],
    approach: [
      { title: "Discover", description: "Clarify the user problem, success criteria and constraints; test feasibility on real data." },
      { title: "Prototype", description: "Build the smallest working version that proves (or disproves) the core value." },
      { title: "Engineer", description: "Production architecture, security, evaluations and guardrails for the MVP scope." },
      { title: "Launch & iterate", description: "Deploy, monitor quality and cost, and iterate on real usage." },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Node.js", "Python", "FastAPI", "PostgreSQL", "OpenAI", "Anthropic Claude", "Google Gemini", "Vercel", "AWS"],
    faqs: [
      {
        question: "How long does it take to go from idea to MVP?",
        answer:
          "It depends on scope and data. Discovery is a short, fixed-scope phase, and the MVP timeline is estimated from its findings and agreed with you before the build starts. We favour a narrow first release that proves value over a broad one.",
      },
      {
        question: "Which AI models do you use?",
        answer:
          "We are model-agnostic. We choose based on output quality on your data, cost, latency and data-handling requirements — commonly OpenAI, Anthropic Claude or Google Gemini, and open-weight models where that fits better.",
      },
      {
        question: "Can you work with our existing team and codebase?",
        answer:
          "Yes. We can lead the build, or embed with your engineers and hand over with documentation so your team can own the product.",
      },
    ],
    related: ["ai-integrations", "ai-agents", "full-stack-development"],
  },
  {
    slug: "ai-integrations",
    title: "Applied AI & LLM Engineering",
    shortTitle: "Applied AI & LLMs",
    icon: "Brain",
    tagline: "Reliable LLM features inside your product",
    description:
      "We integrate large language models into real products — retrieval-augmented generation, semantic search, structured outputs and conversational memory — with the evaluation and cost controls production needs.",
    metaTitle: "Applied AI & LLM Integration Services (OpenAI, Claude, Gemini, RAG)",
    metaDescription:
      "LLM integration services: OpenAI, Anthropic Claude and Gemini integrations, RAG pipelines, semantic search, structured outputs, AI evaluation and cost optimisation.",
    keywords: [
      "LLM integration services",
      "AI integration services",
      "RAG system development",
      "OpenAI integration",
      "Anthropic Claude integration",
      "applied AI engineering",
    ],
    capabilities: [
      "LLM integration",
      "OpenAI, Anthropic Claude and Gemini integrations",
      "Retrieval-Augmented Generation (RAG)",
      "Semantic search",
      "Context engineering",
      "Structured outputs",
      "Conversational memory",
      "AI evaluation",
      "Model cost and latency optimisation",
    ],
    audience: [
      "Product teams adding AI features to an existing application",
      "Companies that want answers grounded in their own documents and data",
      "Teams whose first LLM feature works but is unreliable, slow or expensive",
    ],
    problems: [
      "Answers that sound right but aren't grounded in your data",
      "Unstructured model output that is hard to use safely in application logic",
      "No way to tell whether a prompt or model change made quality better or worse",
      "Token costs and response times that grow faster than usage",
    ],
    solution: [
      "We design the context the model sees — retrieval, ranking, conversation state and instructions — so answers are grounded in your sources and traceable back to them.",
      "Outputs are validated against schemas before your application uses them, and every AI feature ships with an evaluation set, so changes to prompts or models are measured rather than guessed. Caching, model routing and token budgets keep cost and latency predictable.",
    ],
    useCases: [
      { title: "Knowledge assistants", description: "Question answering over internal documents, policies or product data with citations." },
      { title: "Semantic search", description: "Search that understands intent across catalogues, tickets or content libraries." },
      { title: "Extraction & classification", description: "Turning emails, forms and documents into validated structured data." },
      { title: "In-product generation", description: "Drafting, summarising and rewriting features embedded in your UI." },
    ],
    deliverables: [
      "Integration architecture and data-flow design",
      "Retrieval pipeline (ingestion, chunking, embeddings, ranking) where relevant",
      "Typed, schema-validated model interfaces",
      "Evaluation dataset and automated quality checks",
      "Cost, latency and usage monitoring",
      "Documentation and handover",
    ],
    approach: [
      { title: "Assess", description: "Map the use case, data sources, risks and quality bar." },
      { title: "Ground", description: "Design retrieval and context so the model works from your sources." },
      { title: "Constrain", description: "Structured outputs, validation and guardrails around every call." },
      { title: "Measure", description: "Evaluations, monitoring and cost controls before and after launch." },
    ],
    techStack: ["OpenAI", "Anthropic Claude", "Google Gemini", "LangChain", "LlamaIndex", "pgvector", "Pinecone", "Weaviate", "Python", "TypeScript", "PostgreSQL"],
    faqs: [
      {
        question: "Is our data used to train the model?",
        answer:
          "We design integrations around the data-handling terms of the provider and deployment you choose, and recommend options appropriate to your data's sensitivity. Data handling is agreed before any production data is processed.",
      },
      {
        question: "Do we need a vector database?",
        answer:
          "Not always. PostgreSQL with pgvector covers many use cases; a dedicated vector store makes sense at larger scale or for specific search needs. We recommend the simplest option that meets your requirements.",
      },
      {
        question: "How do you prevent hallucinations?",
        answer:
          "They can't be eliminated entirely, but they can be reduced and made visible: grounding answers in retrieved sources, constraining outputs, refusing when context is missing, and measuring quality with evaluation sets.",
      },
    ],
    related: ["ai-agents", "ai-product-engineering", "ai-automation"],
  },
  {
    slug: "ai-agents",
    title: "AI Agents & Agentic Systems",
    shortTitle: "AI Agents",
    icon: "Bot",
    tagline: "Agents that use tools safely, with humans in the loop",
    description:
      "We design and build AI agents that plan, call tools and APIs, and hand off to people when they should — with state, guardrails, monitoring and evaluation built in from the start.",
    metaTitle: "AI Agent Development & Agentic Systems",
    metaDescription:
      "AI agent development: agent orchestration, multi-agent architectures, tool calling, Model Context Protocol (MCP) integrations, human-in-the-loop workflows and guardrails.",
    keywords: [
      "AI agent development",
      "agentic AI development company",
      "multi-agent systems",
      "Model Context Protocol integration",
      "autonomous AI agents",
    ],
    capabilities: [
      "Agent orchestration",
      "Multi-agent architectures",
      "Tool calling",
      "Model Context Protocol (MCP) integrations",
      "Human-in-the-loop workflows",
      "Agent memory and state management",
      "Guardrails and fallback strategies",
      "Agent monitoring and evaluation",
    ],
    audience: [
      "Operations teams with multi-step work that spans several systems",
      "Product teams building assistants that take actions, not just answer questions",
      "Engineering teams that need agents to be observable and controllable",
    ],
    problems: [
      "Multi-step processes that need judgement, not just fixed rules",
      "Agents in demos that loop, call the wrong tool, or act without approval",
      "No visibility into what an agent did, why, or how much it cost",
      "Tools and data locked in systems the agent can't safely reach",
    ],
    solution: [
      "We start with the narrowest agent that solves the problem — often a single agent with a few well-defined tools — and only add planning layers or multiple agents when the task needs them.",
      "Every action an agent can take is explicit, permissioned and logged. Sensitive steps route to a person for approval, failures fall back to safe defaults, and evaluation runs track task success over time.",
    ],
    useCases: [
      { title: "Research & triage agents", description: "Gather information across sources and prepare decisions for a person." },
      { title: "Operations agents", description: "Carry out multi-step back-office tasks across CRM, email and internal tools." },
      { title: "Customer-facing assistants", description: "Assistants that look up records, take bounded actions and escalate to staff." },
      { title: "MCP tool servers", description: "Expose your systems to AI clients through the Model Context Protocol, with access control." },
    ],
    deliverables: [
      "Agent architecture with tool and permission design",
      "Agent implementation with state and memory management",
      "Human approval and escalation flows",
      "Guardrails, retries and fallback behaviour",
      "Tracing, cost tracking and evaluation suite",
      "Runbook for operating and extending the agent",
    ],
    approach: [
      { title: "Scope", description: "Define the task, the tools it needs, and where people must stay in control." },
      { title: "Build narrow", description: "Implement the simplest reliable agent and measure it on real tasks." },
      { title: "Harden", description: "Permissions, approvals, fallbacks, and monitoring of every step." },
      { title: "Expand", description: "Add tools, agents or autonomy only where evaluations support it." },
    ],
    techStack: ["OpenAI Agents SDK", "Anthropic Claude", "LangGraph", "PydanticAI", "Model Context Protocol", "Python", "FastAPI", "TypeScript", "PostgreSQL", "Redis"],
    faqs: [
      {
        question: "Should we use one agent or several?",
        answer:
          "Start with one. Multi-agent designs add coordination cost and new failure modes; they're worth it when tasks are clearly separable or need different tools and permissions.",
      },
      {
        question: "How do you keep agents from taking harmful actions?",
        answer:
          "Agents only get the tools and scopes they need, high-impact actions require human approval, inputs from external content are treated as untrusted, and every action is logged.",
      },
      {
        question: "What is the Model Context Protocol?",
        answer:
          "MCP is an open protocol for connecting AI applications to tools and data sources. We can build MCP servers that expose your systems to compatible AI clients with appropriate access control.",
      },
    ],
    related: ["ai-automation", "ai-integrations", "ai-product-engineering"],
  },
  {
    slug: "ai-automation",
    title: "Intelligent Business Automation",
    shortTitle: "AI Automation",
    icon: "Workflow",
    tagline: "Automate the repetitive work between your systems",
    description:
      "We automate repetitive business workflows — lead handling, document processing, support triage and CRM updates — combining dependable integrations with AI where judgement is needed.",
    metaTitle: "Intelligent Business Automation & AI Workflow Automation",
    metaDescription:
      "AI business automation: CRM automation, lead intelligence, document processing, customer support automation, API integrations, and n8n / Make.com workflows.",
    keywords: [
      "AI automation agency",
      "AI business automation",
      "intelligent workflow automation",
      "workflow automation with AI",
      "n8n automation",
      "document processing automation",
    ],
    capabilities: [
      "CRM automation",
      "Lead intelligence",
      "Document processing",
      "Customer support automation",
      "Business workflow orchestration",
      "API integrations",
      "n8n and Make.com workflows",
      "Voice AI integrations where appropriate",
    ],
    audience: [
      "Teams spending hours a week copying data between tools",
      "Sales and operations teams that need faster, more consistent lead follow-up",
      "Businesses processing high volumes of emails, forms or documents by hand",
    ],
    problems: [
      "Manual data entry and copy-paste between CRM, email, spreadsheets and internal tools",
      "Leads and support requests that wait too long for a first response",
      "Documents that have to be read and re-keyed before anything can happen",
      "Brittle automations that break silently when a format changes",
    ],
    solution: [
      "We map the workflow end to end, automate the deterministic steps with reliable integrations, and use AI only for the steps that need language understanding — classification, extraction, summarisation or drafting.",
      "Automations include validation, retries, alerts and an exception queue for people, so edge cases are handled rather than lost.",
    ],
    useCases: [
      { title: "Lead capture & qualification", description: "Enrich and score new leads, route them, and draft first responses." },
      { title: "Document processing", description: "Extract fields from invoices, forms and contracts into your systems." },
      { title: "Support triage", description: "Classify, prioritise and draft replies for inbound requests." },
      { title: "CRM hygiene", description: "Keep records, activities and follow-ups updated automatically." },
    ],
    deliverables: [
      "Workflow map with automation opportunities and estimated effort",
      "Production automations (code, n8n or Make.com — whichever fits)",
      "AI steps with validation and confidence thresholds",
      "Error handling, alerts and human exception queue",
      "Run history and basic reporting",
      "Documentation and handover",
    ],
    approach: [
      { title: "Map", description: "Document the current process, systems, volumes and exceptions." },
      { title: "Prioritise", description: "Pick the steps with the clearest time savings and lowest risk." },
      { title: "Automate", description: "Build integrations and AI steps with validation and alerts." },
      { title: "Monitor", description: "Track runs, failures and exceptions; refine with your team." },
    ],
    techStack: ["n8n", "Make.com", "Zapier", "Python", "FastAPI", "Node.js", "OpenAI", "Anthropic Claude", "PostgreSQL", "REST & webhooks"],
    faqs: [
      {
        question: "Code or no-code automation?",
        answer:
          "Both have a place. n8n or Make.com are quick to change for simple flows; custom code is better for high volume, complex logic or strict reliability needs. We often combine them.",
      },
      {
        question: "How do you estimate the value of an automation?",
        answer:
          "From the hours the workflow takes today, its volume and error cost. Our ROI calculator gives a first, illustrative estimate; we refine it with your real numbers during discovery.",
      },
      {
        question: "What happens when the AI is unsure?",
        answer:
          "Low-confidence results go to a person instead of being processed automatically, and those cases are used to improve the automation.",
      },
    ],
    related: ["ai-agents", "ai-integrations", "full-stack-development"],
  },
  {
    slug: "frontend-engineering",
    title: "Frontend Engineering",
    shortTitle: "Frontend",
    icon: "MonitorSmartphone",
    tagline: "Fast, accessible interfaces built to last",
    description:
      "Senior frontend engineering with React, Next.js and Vue.js in TypeScript: design systems, complex application state and performance work for SaaS products and AI-powered interfaces.",
    metaTitle: "Frontend Engineering (React, Next.js, Vue.js, TypeScript)",
    metaDescription:
      "Senior frontend engineering: React, Next.js and Vue.js with TypeScript, Redux, Zustand and React Query, Tailwind CSS and MUI design systems, Core Web Vitals and accessibility.",
    keywords: [
      "frontend development services",
      "React development company",
      "Next.js developer",
      "Vue.js development",
      "TypeScript frontend developer",
      "frontend performance optimization",
      "design system development",
    ],
    capabilities: [
      "React and Next.js (App Router, Server Components)",
      "Vue.js applications",
      "TypeScript across the codebase",
      "Client state with Redux and Zustand",
      "Server state and caching with React Query",
      "Design systems with Tailwind CSS and MUI",
      "Core Web Vitals and performance",
      "Accessibility (WCAG 2.2 AA)",
    ],
    audience: [
      "SaaS teams that need senior frontend capacity for a growing product",
      "Startups turning designs into a production-ready web application",
      "Teams whose React or Vue.js codebase has become slow or hard to change",
      "Products adding AI features that need a responsive, streaming interface",
    ],
    problems: [
      "Pages that feel slow, with poor Core Web Vitals on mobile",
      "State scattered across components, causing bugs and duplicated API calls",
      "An inconsistent UI because there is no shared component library",
      "Accessibility gaps that shut out users and create legal risk",
      "A legacy frontend that slows down every new feature",
    ],
    solution: [
      "We structure the frontend around clear boundaries: server-rendered where it helps speed and SEO, client state only where it is needed, and server data handled by a caching layer such as React Query instead of hand-written effects.",
      "Shared components and design tokens, built with Tailwind CSS or MUI, keep the interface consistent, and automated accessibility and performance checks in CI stop regressions before they reach users.",
    ],
    useCases: [
      { title: "SaaS dashboards", description: "Data-heavy interfaces with tables, charts, filters and role-based views." },
      { title: "Design systems", description: "Reusable, accessible component libraries in Tailwind CSS or MUI, documented for your team." },
      { title: "Performance & migrations", description: "Core Web Vitals work, and migrations such as Pages Router to App Router or JavaScript to TypeScript." },
      { title: "AI product interfaces", description: "Chat, streaming responses, review queues and human-in-the-loop screens for AI features." },
    ],
    deliverables: [
      "Frontend architecture and state management plan",
      "Production React, Next.js or Vue.js implementation in TypeScript",
      "Reusable component library and design tokens",
      "Accessibility and performance checks in CI",
      "Unit and end-to-end tests",
      "Documentation and handover to your team",
    ],
    approach: [
      { title: "Review", description: "Codebase or design review, with a Core Web Vitals and accessibility baseline." },
      { title: "Plan", description: "Component, state and data-fetching architecture, with milestones." },
      { title: "Build", description: "Iterative delivery with preview deployments, demos and code review." },
      { title: "Verify", description: "Automated tests, accessibility checks and performance budgets before release." },
    ],
    techStack: ["React", "Next.js", "Vue.js", "TypeScript", "Redux", "Zustand", "React Query", "Tailwind CSS", "MUI", "Playwright"],
    faqs: [
      {
        question: "React or Vue.js: which should we use?",
        answer:
          "Usually the one your team already knows. For new products we often recommend Next.js for its rendering options and ecosystem; Vue.js is a good fit when your team already works with it.",
      },
      {
        question: "Redux, Zustand or React Query?",
        answer:
          "They solve different problems. React Query manages server data (fetching, caching and keeping it fresh); Zustand suits small to medium client state; Redux suits large applications with complex shared state and strict conventions. We choose per project and keep server and client state separate.",
      },
      {
        question: "Can you speed up an existing application?",
        answer:
          "Yes. We measure first (Lighthouse and, where available, real-user Core Web Vitals), fix the biggest bottlenecks such as rendering strategy, bundle size, images and data fetching, and add checks so it stays fast.",
      },
      {
        question: "Do you work with our designers and backend team?",
        answer:
          "Yes. We work from your Figma designs or existing design system and against your current APIs. If the backend needs work too, it can be combined with our full-stack engineering service.",
      },
    ],
    related: ["full-stack-development", "ai-product-engineering", "ai-integrations"],
  },
  {
    slug: "full-stack-development",
    title: "Full-Stack Engineering",
    shortTitle: "Full-Stack",
    icon: "Code2",
    tagline: "The product foundation your AI features run on",
    description:
      "We build modern web applications and SaaS platforms, frontend-first: React, Next.js and Vue.js with TypeScript, backed by Node.js and Python — secure, tested and ready to scale with your AI roadmap.",
    metaTitle: "Full-Stack Engineering (React, Next.js, TypeScript, Node.js, Python)",
    metaDescription:
      "Full-stack engineering for SaaS and web applications: React and Next.js, TypeScript, Node.js and Python/FastAPI, PostgreSQL, multi-tenant architecture, auth and cloud deployment.",
    keywords: [
      "full stack development company",
      "Next.js development agency",
      "React TypeScript development",
      "SaaS development",
      "multi-tenant SaaS architecture",
    ],
    capabilities: [
      "React and Next.js applications",
      "TypeScript",
      "Node.js and Python/FastAPI",
      "PostgreSQL",
      "Multi-tenant SaaS architecture",
      "Authentication and authorization",
      "API architecture",
      "Testing and cloud deployment",
    ],
    audience: [
      "Startups building a SaaS product from scratch",
      "Teams modernising or extending an existing React, Next.js or Python codebase",
      "Companies that need a production-grade foundation for planned AI features",
    ],
    problems: [
      "A product that needs to ship quickly without accumulating expensive technical debt",
      "Slow pages, fragile releases and no automated tests",
      "Access control and data isolation that weren't designed for multiple customers",
      "Backends that weren't built to support AI workloads and integrations",
    ],
    solution: [
      "We build with a typed, tested stack and clear boundaries between UI, API and data layers, so features can be added without rewrites.",
      "Security, access control and tenancy are designed in early, and deployments are automated, so releases are routine rather than risky.",
    ],
    useCases: [
      { title: "SaaS platforms", description: "Multi-tenant applications with accounts, roles, billing and admin tools." },
      { title: "Customer portals", description: "Secure portals with dashboards, documents and integrations." },
      { title: "Internal tools", description: "Admin and operations tools on top of your existing data." },
      { title: "Performance & modernisation", description: "Improving speed, accessibility and maintainability of existing apps." },
    ],
    deliverables: [
      "Architecture and data model",
      "Frontend and backend implementation",
      "Authentication, authorization and tenancy",
      "Automated tests and CI/CD",
      "Cloud deployment and environments",
      "Technical documentation",
    ],
    approach: [
      { title: "Plan", description: "Requirements, acceptance criteria, architecture and milestones." },
      { title: "Build", description: "Iterative delivery with regular demos and code review." },
      { title: "Verify", description: "Automated tests, accessibility and performance checks." },
      { title: "Ship", description: "Automated deployment, monitoring and handover." },
    ],
    techStack: ["React", "Next.js", "Vue.js", "TypeScript", "Redux", "Zustand", "React Query", "Tailwind CSS", "MUI", "Node.js", "Python", "FastAPI", "Django", "PostgreSQL", "Prisma", "Redis", "Vercel", "AWS", "Docker"],
    faqs: [
      {
        question: "Do you work on existing codebases?",
        answer:
          "Yes. We start with a short code review to understand the architecture and risks, then agree priorities with you.",
      },
      {
        question: "Which hosting do you recommend?",
        answer:
          "It depends on your requirements. Vercel suits many Next.js products; AWS or other clouds make sense for specific compliance, data or infrastructure needs.",
      },
    ],
    related: ["frontend-engineering", "ai-product-engineering", "ai-integrations"],
  },
  {
    slug: "ai-consulting",
    title: "AI Consulting & Prototyping",
    shortTitle: "AI Consulting",
    icon: "Compass",
    tagline: "Clear technical direction before you commit to a build",
    description:
      "AI readiness assessments, opportunity discovery, architecture reviews and proof-of-concept validation — practical guidance from engineers who build these systems.",
    href: "/consulting",
    metaTitle: "AI Consulting & Prototyping",
    metaDescription: "AI readiness assessment, technical strategy, architecture consulting and proof-of-concept validation.",
    keywords: ["AI consulting services", "AI readiness assessment", "AI architecture consulting"],
    capabilities: [
      "AI readiness assessment",
      "Technical strategy",
      "Architecture consulting",
      "AI opportunity discovery",
      "Proof-of-concept validation",
      "Implementation roadmaps",
    ],
    audience: [],
    problems: [],
    solution: [],
    useCases: [],
    deliverables: [],
    approach: [],
    techStack: [],
    faqs: [],
    related: [],
  },
];

/** Services with their own /services/[slug] page. */
export const SERVICE_PAGES = SERVICES.filter((s) => !s.href);

const NUMBER_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"];

/** "Seven connected service areas", always in step with the catalogue. */
export const SERVICE_AREAS_LABEL = `${NUMBER_WORDS[SERVICES.length] ?? SERVICES.length} connected service areas`;

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function serviceHref(service: Pick<Service, "slug" | "href">) {
  return service.href ?? `/services/${service.slug}`;
}

// Brand content, static seed data, and site copy
// All AI/SEO-targeted keyword copy lives here so it's consistent

export const SITE = {
  name: "AI Infinity Labs",
  tagline: "Building AI-Powered Products That Matter",
  description:
    "We build cutting-edge AI integrations, agentic AI systems, and full-stack web applications that help businesses scale, automate intelligently, and innovate faster.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiinfinitylabs.com",
  email: "infousamaali1@gmail.com",
  phone: "+92 309 073 0852",
  whatsapp: "https://wa.me/923090730852",
  linkedin: "https://www.linkedin.com/in/info-usama-ali/",
  github: "https://github.com/Usama-dev182",
  upwork: "https://www.upwork.com/freelancers/~012a332067f71fa1bd",
  youtube: "https://www.youtube.com/@Techtalkswithusamaali",
};

export const FOUNDER = {
  name: "Usama Ali",
  title: "Founder & Lead Engineer",
  bio: "Senior software engineer with 5+ years building pixel-perfect frontends, scalable full-stack applications, and cutting-edge AI integrations. Previously at eBrainX Solutions and Techling Pvt, leading global teams to deliver impactful digital products.",
  avatar: "/images/usama-ali.jpg",
  github: "https://github.com/Usama-dev182",
  linkedin: "https://www.linkedin.com/in/info-usama-ali/",
};

export const STATS = [
  { value: "5+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "20+", label: "Happy Clients" },
  { value: "3", label: "Core Services" },
];

export const SERVICES = [
  {
    slug: "full-stack-development",
    title: "Full Stack Development",
    shortTitle: "Full Stack",
    icon: "Code2",
    tagline: "Modern, performant web applications at scale",
    description:
      "From React/Next.js frontends to Node.js/FastAPI backends — we build end-to-end digital products that are fast, scalable, and maintainable.",
    keywords: [
      "full stack development company",
      "React TypeScript development",
      "Next.js development agency",
      "custom web application development",
      "Node.js backend development",
    ],
    techStack: ["React", "Next.js", "Vue.js", "Nuxt.js", "TypeScript", "Node.js", "Python", "FastAPI", "Django", "PostgreSQL", "Redis"],
    features: [
      "Pixel-perfect UI implementation from Figma designs",
      "RESTful & GraphQL API design and integration",
      "Database architecture and optimisation",
      "CI/CD pipeline setup and cloud deployment",
      "Performance optimisation (Core Web Vitals)",
      "Code review and team mentoring",
    ],
  },
  {
    slug: "ai-integrations",
    title: "AI Integrations",
    shortTitle: "AI Integrations",
    icon: "Brain",
    tagline: "LLM and AI capabilities embedded into your products",
    description:
      "We integrate OpenAI, Cohere, Hugging Face, and other LLMs directly into your existing systems — RAG pipelines, conversational UIs, semantic search, and AI-first product features.",
    keywords: [
      "AI integration services",
      "LLM integration development",
      "OpenAI integration agency",
      "RAG system development",
      "AI-powered web applications",
    ],
    techStack: ["OpenAI", "Cohere", "LangChain", "LlamaIndex", "Pinecone", "Weaviate", "FAISS", "Python"],
    features: [
      "LLM integration (OpenAI, Cohere, Hugging Face)",
      "RAG (Retrieval-Augmented Generation) pipelines",
      "Vector database setup and management",
      "Prompt engineering and optimisation",
      "Conversational UI and chatbot development",
      "AI cost monitoring and optimisation",
    ],
  },
  {
    slug: "ai-automation",
    title: "AI Automation & Agentic AI",
    shortTitle: "AI Automation",
    icon: "Zap",
    tagline: "Multi-step AI agents that work while you sleep",
    description:
      "We design and build agentic AI systems — autonomous agents with planner/executor patterns, tool invocations, and fallback logic — to automate complex business workflows end-to-end.",
    keywords: [
      "AI automation agency",
      "agentic AI development company",
      "AI business automation",
      "autonomous AI agents",
      "workflow automation with AI",
    ],
    techStack: [
      "LangGraph",
      "CrewAI",
      "AutoGen",
      "PydanticAI",
      "LangChain Agents",
      "LlamaIndex",
      "OpenAI Agents SDK",
      "Python",
      "FastAPI",
      "Playwright",
      "Zapier",
      "Make",
      "n8n",
    ],
    features: [
      "Multi-step agentic AI system design",
      "Planner + executor + tool-invocation architecture",
      "Business process automation with AI",
      "Document processing and data extraction agents",
      "Browser automation, QA, and repetitive task execution",
      "CRM, helpdesk, and back-office workflow orchestration",
      "Human-in-the-loop approval flows for sensitive actions",
      "Monitoring, retries, guardrails, and fallback design",
      "Slack/email/CRM automation workflows",
      "Adversarial testing and safety controls",
    ],
  },
];

export const PORTFOLIO = [
  {
    slug: "daspire-platform",
    title: "Daspire",
    client: "Daspire",
    industry: "SaaS / Data",
    description:
      "Redesigned and optimised the Daspire platform for enhanced user engagement and performance, implementing a modern frontend architecture with improved data visualisation.",
    outcomes: [
      { label: "Performance", value: "40%", description: "faster page loads" },
      { label: "UX", value: "Redesigned", description: "complete UI overhaul" },
    ],
    services: ["Full Stack Development"],
    techStack: ["React", "TypeScript", "Node.js"],
    url: "https://www.daspire.com/",
    featured: true,
  },
  {
    slug: "cohere-saas",
    title: "Cohere",
    client: "Cohere",
    industry: "SaaS / Collaboration",
    description:
      "Architected the frontend for a SaaS platform focused on seamless virtual collaboration, building scalable components and optimising API integrations.",
    outcomes: [
      { label: "Architecture", value: "Scalable", description: "feature-based component system" },
      { label: "Integrations", value: "10+", description: "API integrations delivered" },
    ],
    services: ["Full Stack Development"],
    techStack: ["React", "TypeScript", "Redux"],
    url: "https://www.cohere.live/",
    featured: true,
  },
  {
    slug: "cazvid-job-board",
    title: "Cazvid",
    client: "Cazvid",
    industry: "HR Tech / Job Board",
    description:
      "Contributed to the world's largest video resume-based job board, focusing on user journey optimisations and UI performance across a high-traffic global platform.",
    outcomes: [
      { label: "Users", value: "Global", description: "international user base" },
      { label: "Focus", value: "Performance", description: "UI speed optimisations" },
    ],
    services: ["Full Stack Development"],
    techStack: ["React", "TypeScript", "REST APIs"],
    url: "https://desktop.cazvid.app/en/auth",
    featured: true,
  },
  {
    slug: "ai-support-automation",
    title: "AI Customer Support Automation",
    client: "E-commerce SaaS Client",
    industry: "AI Automation / E-commerce",
    description:
      "Designed and built a multi-agent AI system that automatically classifies, prioritises, and drafts responses to 500+ inbound customer support emails per day — integrating directly with the client's helpdesk and CRM.",
    outcomes: [
      { label: "Tickets Automated", value: "70%", description: "of tier-1 support volume" },
      { label: "Response Time", value: "6 hrs → 4 min", description: "average first response" },
    ],
    services: ["AI Automation & Agentic AI", "AI Integrations"],
    techStack: ["Python", "OpenAI", "LangChain", "FastAPI", "PostgreSQL", "n8n"],
    url: null,
    featured: true,
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Usama delivered a pixel-perfect Next.js frontend that exceeded our expectations. His attention to performance and clean code architecture saved us months of technical debt. The codebase is something our internal team is genuinely proud to own.",
    author: "Alex Carter",
    title: "CTO",
    company: "Daspire",
    avatar: "/images/testimonials/client-1.jpg",
  },
  {
    id: 2,
    quote:
      "The AI integration Usama built transformed how our users interact with the product. He has a deep understanding of LLMs, RAG pipelines, and production-grade guardrails — and he explains complex trade-offs in plain English.",
    author: "Sarah Mitchell",
    title: "Head of Product",
    company: "Nexus Labs",
    avatar: "/images/testimonials/client-2.jpg",
  },
  {
    id: 3,
    quote:
      "We've shipped three projects together now. Every time: on scope, on time, clean code. Usama is the rare engineer who is also a genuinely good communicator — updates are proactive, trade-offs are explained, and nothing is a surprise at the end.",
    author: "James Okafor",
    title: "Founder",
    company: "Brightline Digital",
    avatar: "/images/testimonials/client-3.jpg",
  },
  {
    id: 4,
    quote:
      "We hired AI Infinity Labs to build our customer support automation and the ROI was immediate. Within 60 days we were handling 70% of tier-1 tickets without a human in the loop. I wish we'd done it a year earlier.",
    author: "Priya Nair",
    title: "VP Operations",
    company: "ScaleStack",
    avatar: "/images/testimonials/client-4.jpg",
  },
];

export const TECH_STACK_BADGES = [
  "React",
  "Next.js",
  "Vue.js",
  "Nuxt.js",
  "TypeScript",
  "Node.js",
  "Python",
  "FastAPI",
  "Django",
  "OpenAI",
  "LangChain",
  "LangGraph",
  "CrewAI",
  "AutoGen",
  "PydanticAI",
  "Pinecone",
  "n8n",
  "Make",
  "Zapier",
  "PostgreSQL",
  "TailwindCSS",
  "AWS",
];

export const NAV_ITEMS = [
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Tech Talks", href: "/tech-talks" },
  { label: "Consulting", href: "/consulting" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];

export const BLOG_CATEGORIES = [
  "AI & Machine Learning",
  "Full Stack Development",
  "React & Next.js",
  "TypeScript",
  "AI Automation",
  "Agentic AI",
  "LLM Integration",
  "RAG Systems",
  "Career & Team",
];

export const JOB_DEPARTMENTS = [
  "Engineering",
  "AI & Machine Learning",
  "Design",
  "Product",
  "Marketing",
  "Operations",
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "Discovery & Planning",
    description:
      "We understand your goals, define acceptance criteria, and plan the architecture before writing a single line of code.",
  },
  {
    step: "02",
    title: "Design & Architecture",
    description:
      "We design system architecture, component hierarchy, and data models — with scalability and maintainability built in from day one.",
  },
  {
    step: "03",
    title: "Build & Iterate",
    description:
      "Agile sprints with regular demos and feedback loops. You see progress every week — not just at the end.",
  },
  {
    step: "04",
    title: "Test & Optimise",
    description:
      "Comprehensive testing, performance optimisation, and code review before any code ships to production.",
  },
  {
    step: "05",
    title: "Deploy & Support",
    description:
      "CI/CD automated deployments, monitoring, and ongoing support to ensure your product performs at scale.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Yes. A significant portion of our work is with pre-seed and seed-stage founders. We're experienced at scoping MVPs tightly, making pragmatic technology choices that don't create expensive re-architecture later, and moving fast without the shortcuts that hurt you at scale.",
  },
  {
    question: "Do you offer fixed-price or hourly engagements?",
    answer:
      "Both. Fixed-price works well for clearly scoped projects (MVP builds, specific integrations, defined automation workflows). Time & materials suits iterative product development where scope evolves week to week. We discuss the right model during the initial scope call.",
  },
  {
    question: "How quickly can you start?",
    answer:
      "Typically within 1–2 weeks of signing. We'll send a project proposal within 48 hours of your initial brief — and we don't start clock-running until you're happy with the scope and terms.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes, always. We send a mutual NDA as standard before any detailed technical discussion. Your ideas, architecture, and business details stay confidential.",
  },
  {
    question: "What happens after delivery — do you offer ongoing support?",
    answer:
      "Yes. We offer a 30-day bug-fix warranty on all delivered work as standard. Beyond that, ongoing maintenance retainers are available on monthly terms — no long lock-in. We also do clean handovers with full documentation so your internal team can take ownership if you prefer.",
  },
  {
    question: "How big is the team?",
    answer:
      "We're a small, senior-focused team led by Usama Ali. Every project is overseen by a senior engineer — there's no junior-heavy outsourcing model here. Small teams move faster, communicate better, and produce higher-quality code than large ones on the type of work we take on.",
  },
  {
    question: "Can you work with our existing codebase?",
    answer:
      "Yes. We regularly work with existing React, Next.js, and Python codebases — adding new features, fixing architectural debt, or integrating AI capabilities. We do a brief code audit at the start of any extension engagement to understand what we're working with.",
  },
  {
    question: "Which countries do you work with?",
    answer:
      "Globally. Our clients span the UK, USA, Canada, UAE, and Australia. All communication is async-friendly, we adapt to your time zone for meetings, and we use tools like Linear, Slack, and Loom to keep projects moving regardless of location.",
  },
];

export const CLIENT_LOGOS = [
  { name: "Daspire", url: "https://www.daspire.com/", industry: "SaaS / Data" },
  { name: "Cazvid", url: "https://desktop.cazvid.app/en/auth", industry: "HR Tech" },
  { name: "Cohere", url: "https://www.cohere.live/", industry: "Collaboration SaaS" },
  { name: "Upwork", url: "https://www.upwork.com/freelancers/~012a332067f71fa1bd", industry: "Verified Platform" },
];

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
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "Usama delivered a pixel-perfect Next.js frontend that exceeded our expectations. His attention to performance and clean code architecture saved us months of technical debt.",
    author: "Client Name",
    title: "CTO",
    company: "Tech Startup",
    avatar: "/images/testimonials/client-1.jpg",
  },
  {
    id: 2,
    quote:
      "The AI integration he built for our platform transformed our user experience. Deep understanding of LLMs, RAG pipelines, and production-grade safety controls.",
    author: "Client Name",
    title: "Product Manager",
    company: "SaaS Company",
    avatar: "/images/testimonials/client-2.jpg",
  },
  {
    id: 3,
    quote:
      "Fast, reliable, and communicates clearly throughout the project. We've worked together on three projects now — the results always speak for themselves.",
    author: "Client Name",
    title: "Founder",
    company: "Digital Agency",
    avatar: "/images/testimonials/client-3.jpg",
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

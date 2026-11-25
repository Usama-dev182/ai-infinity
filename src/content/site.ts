// Brand content and shared site copy.
//
// Claims policy: statistics and testimonials carry a `verified` flag. Only items the owner
// has confirmed (with evidence they are happy to stand behind) may be set to `true`;
// unverified items stay in source for review but are never rendered.
// See docs/implementation-progress.md → "Owner verification checklist".

export const SITE = {
  name: "AI Infinity Labs",
  tagline: "Building AI-Powered Products That Matter",
  positioning: "AI Product Engineering & Intelligent Automation",
  description:
    "We design, build, and deploy intelligent software, AI agents, and scalable digital products that solve real business problems — from idea to production.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiinfinitylabs.com",
  email: "infousamaali1@gmail.com",
  phone: "+92 309 073 0852",
  whatsapp: "https://wa.me/923090730852",
  linkedin: "https://www.linkedin.com/in/info-usama-ali/",
  github: "https://github.com/Usama-dev182",
  upwork: "https://www.upwork.com/freelancers/~012a332067f71fa1bd",
  youtube: "https://www.youtube.com/@Techtalkswithusamaali",
  /**
   * X (Twitter) handles. Left undefined until the owner confirms the accounts exist and
   * belong to the company — an unverified handle attributes social cards to someone else.
   */
  xSite: undefined as string | undefined,
  xCreator: undefined as string | undefined,
  /** Optional scheduling link (e.g. Cal.com / Calendly) — configured via env, never hard-coded. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || undefined,
};

export const FOUNDER = {
  name: "Usama Ali",
  title: "Founder & Lead Engineer",
  bio: "Senior software engineer with 5+ years building pixel-perfect frontends, scalable full-stack applications, and cutting-edge AI integrations. Previously at eBrainX Solutions and Techling Pvt, leading global teams to deliver impactful digital products.",
  avatar: "/images/usama-ali.jpg",
  github: "https://github.com/Usama-dev182",
  linkedin: "https://www.linkedin.com/in/info-usama-ali/",
};

export interface StatItem {
  value: string;
  label: string;
  verified: boolean;
}

export const STATS: StatItem[] = [
  // Consistent with the founder timeline on /about (2021 → present).
  { value: "5+", label: "Years Experience", verified: true },
  { value: "50+", label: "Projects Delivered", verified: false },
  { value: "20+", label: "Happy Clients", verified: false },
  { value: "6", label: "Service Areas", verified: true },
];

export const VERIFIED_STATS = STATS.filter((s) => s.verified);

/**
 * Credibility facts that link to public evidence (case studies, profiles, channels).
 * Prefer these over unverifiable numbers.
 */
export const CREDENTIALS = [
  {
    title: "Founder-led engineering",
    description: "Led by Usama Ali, a full-stack and AI engineer with prior roles at eBrainX Solutions and Techling.",
    href: "/about",
    linkLabel: "About the founder",
  },
  {
    title: "Shipped client platforms",
    description: "Frontend and platform engineering for SaaS products including Daspire, Cohere and Cazvid.",
    href: "/case-studies",
    linkLabel: "See case studies",
  },
  {
    title: "Independent client profile",
    description: "Client work and history on Upwork, available to review before you get in touch.",
    href: "https://www.upwork.com/freelancers/~012a332067f71fa1bd",
    linkLabel: "View Upwork profile",
  },
  {
    title: "Engineering in public",
    description: "Practical videos and articles on AI agents, LLM integration and automation.",
    href: "/tech-talks",
    linkLabel: "Watch Tech Talks",
  },
] as const;

export interface TestimonialItem {
  id: number;
  quote: string;
  author: string;
  title: string;
  company: string;
  /** Must be confirmed by the owner (real person, permission to publish) before display. */
  verified: boolean;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    quote:
      "Usama delivered a pixel-perfect Next.js frontend that exceeded our expectations. His attention to performance and clean code architecture saved us months of technical debt. The codebase is something our internal team is genuinely proud to own.",
    author: "Alex Carter",
    title: "CTO",
    company: "Daspire",
    verified: false,
  },
  {
    id: 2,
    quote:
      "The AI integration Usama built transformed how our users interact with the product. He has a deep understanding of LLMs, RAG pipelines, and production-grade guardrails — and he explains complex trade-offs in plain English.",
    author: "Sarah Mitchell",
    title: "Head of Product",
    company: "Nexus Labs",
    verified: false,
  },
  {
    id: 3,
    quote:
      "We've shipped three projects together now. Every time: on scope, on time, clean code. Usama is the rare engineer who is also a genuinely good communicator — updates are proactive, trade-offs are explained, and nothing is a surprise at the end.",
    author: "James Okafor",
    title: "Founder",
    company: "Brightline Digital",
    verified: false,
  },
  {
    id: 4,
    quote:
      "We hired AI Infinity Labs to build our customer support automation and the ROI was immediate. Within 60 days we were handling 70% of tier-1 tickets without a human in the loop. I wish we'd done it a year earlier.",
    author: "Priya Nair",
    title: "VP Operations",
    company: "ScaleStack",
    verified: false,
  },
];

export const VERIFIED_TESTIMONIALS = TESTIMONIALS.filter((t) => t.verified);

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
    title: "Discover",
    description:
      "We clarify the business problem, users, data and constraints, and agree what success looks like before any build starts.",
  },
  {
    step: "02",
    title: "Validate",
    description:
      "We test the riskiest assumptions early — often with a focused prototype on representative data — so decisions are based on evidence.",
  },
  {
    step: "03",
    title: "Architect",
    description:
      "We design the system: data model, integrations, security, and how AI components are evaluated, monitored and kept within budget.",
  },
  {
    step: "04",
    title: "Build & iterate",
    description:
      "We deliver in short iterations with regular demos, code review and automated tests, so you see working software throughout.",
  },
  {
    step: "05",
    title: "Launch & improve",
    description:
      "We deploy with monitoring and documentation, then iterate on real usage — or hand over cleanly to your team.",
  },
];

export const FAQ_ITEMS = [
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Yes. We help founders scope MVPs tightly, make pragmatic technology choices that avoid expensive re-architecture later, and move quickly without the shortcuts that hurt at scale.",
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
    question: "Which industries do you work with?",
    answer:
      "We're industry-agnostic: the engineering patterns behind AI products, agents and automation apply across sectors. Real estate and PropTech is one area where we have hands-on conversational AI experience, alongside SaaS and other business software.",
  },
  {
    question: "Which countries do you work with?",
    answer:
      "We work with clients internationally. Communication is async-friendly, we adapt to your time zone for meetings, and we use tools like Slack and Loom to keep projects moving regardless of location.",
  },
];


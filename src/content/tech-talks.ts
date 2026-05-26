// Tech Talks with Usama Ali — YouTube channel content registry
// To add a new video: copy/paste the YouTube video ID from the URL
// e.g. youtube.com/watch?v=dQw4w9WgXcQ → id: "dQw4w9WgXcQ"

export type TechTalkCategory =
  | "AI Agents"
  | "LLMs"
  | "AI Automation"
  | "Vibe Coding"
  | "AI SaaS"
  | "Machine Learning"
  | "Full Stack Dev"
  | "Coding Tools"
  | "Consulting"
  | "Communication Skills"
  | "Workshops"
  | "Tech Talk";

export interface TechTalk {
  id: string;           // YouTube video ID
  title: string;
  description: string;
  category: TechTalkCategory;
  featured?: boolean;   // Shows larger in the grid
  publishedAt?: string; // ISO date string (optional, for display ordering)
}

export const TECH_TALK_CATEGORIES: TechTalkCategory[] = [
  "AI Agents",
  "LLMs",
  "AI Automation",
  "Vibe Coding",
  "AI SaaS",
  "Machine Learning",
  "Full Stack Dev",
  "Coding Tools",
  "Consulting",
  "Communication Skills",
  "Workshops",
  "Tech Talk",
];

export const TECH_TALKS: TechTalk[] = [
  // ── Featured / Flagship ──────────────────────────────────────────
  {
    id: "dQw4w9WgXcQ", // ← Replace with your real video ID
    title: "Building Agentic AI Systems from Scratch",
    description:
      "A full deep-dive into multi-step agentic AI — planner/executor patterns, tool-use, and fallback logic. Perfect for engineers looking to go beyond basic LLM wrappers.",
    category: "AI Agents",
    featured: true,
    publishedAt: "2026-05-20",
  },
  {
    id: "dQw4w9WgXcQ", // ← Replace with your real video ID
    title: "LLM Integration Masterclass — OpenAI, LangChain & RAG",
    description:
      "Everything you need to integrate LLMs into a production app: prompt engineering, RAG pipelines, vector databases, and cost optimisation strategies.",
    category: "LLMs",
    featured: true,
    publishedAt: "2026-05-15",
  },
  // ── AI Automation ───────────────────────────────────────────────
  {
    id: "dQw4w9WgXcQ", // ← Replace with your real video ID
    title: "Automate Your Business with n8n + AI",
    description:
      "Practical walkthrough of building end-to-end business automation workflows using n8n, webhooks, and OpenAI function calls.",
    category: "AI Automation",
    publishedAt: "2026-05-10",
  },
  {
    id: "dQw4w9WgXcQ", // ← Replace with your real video ID
    title: "AI Email Automation That Actually Works",
    description:
      "Build a fully autonomous email response and routing agent using AI — no more manual inbox management.",
    category: "AI Automation",
    publishedAt: "2026-05-05",
  },
  // ── Vibe Coding ─────────────────────────────────────────────────
  {
    id: "dQw4w9WgXcQ", // ← Replace with your real video ID
    title: "Vibe Coding a Full-Stack AI App in 1 Hour",
    description:
      "Live build session — we ship a complete Next.js + OpenAI SaaS application from zero to deployed in a single sitting.",
    category: "Vibe Coding",
    publishedAt: "2026-04-28",
  },
  {
    id: "dQw4w9WgXcQ", // ← Replace with your real video ID
    title: "Cursor + Claude: The Ultimate Vibe Coding Stack",
    description:
      "My exact workflow for 10x faster development using AI-assisted coding — tools, prompts, and the mental model behind it.",
    category: "Vibe Coding",
    publishedAt: "2026-04-20",
  },
  // ── AI SaaS ─────────────────────────────────────────────────────
  {
    id: "dQw4w9WgXcQ", // ← Replace with your real video ID
    title: "How to Build and Monetise an AI SaaS in 2026",
    description:
      "From idea to revenue: the complete business and technical playbook for launching a profitable AI SaaS product in today's market.",
    category: "AI SaaS",
    publishedAt: "2026-04-12",
  },
  // ── Workshops ───────────────────────────────────────────────────
  {
    id: "dQw4w9WgXcQ", // ← Replace with your real video ID
    title: "AI Agent Workshop — Build Your First CrewAI Agent",
    description:
      "Hands-on workshop: build, test, and deploy your first multi-agent system using CrewAI and Python in under 90 minutes.",
    category: "Workshops",
    publishedAt: "2026-04-05",
  },
  // ── Machine Learning ────────────────────────────────────────────
  {
    id: "dQw4w9WgXcQ", // ← Replace with your real video ID
    title: "Practical ML for Software Engineers — No Maths Required",
    description:
      "A software engineer's guide to machine learning: when to use it, how to integrate models, and what you actually need to know.",
    category: "Machine Learning",
    publishedAt: "2026-03-28",
  },
];

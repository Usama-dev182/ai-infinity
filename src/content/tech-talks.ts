// Tech Talks with Usama Ali — YouTube channel content registry
// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD YOUR VIDEO IDs:
//   1. Go to youtube.com/@Techtalkswithusamaali/videos
//   2. Click on a video → copy the ?v= value from the URL
//   3. Paste it into the `id` field below (replacing the REPLACE_ME_* values)
// ─────────────────────────────────────────────────────────────────────────────

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
    id: "PENDING_agentic_ai_from_scratch", // ← TODO: paste YouTube video ID here
    title: "Building Agentic AI Systems from Scratch",
    description:
      "A full deep-dive into multi-step agentic AI — planner/executor patterns, tool-use, and fallback logic. Perfect for engineers looking to go beyond basic LLM wrappers.",
    category: "AI Agents",
    featured: true,
    publishedAt: "2026-05-20",
  },
  {
    id: "PENDING_llm_integration_masterclass", // ← TODO: paste YouTube video ID here
    title: "LLM Integration Masterclass — OpenAI, LangChain & RAG",
    description:
      "Everything you need to integrate LLMs into a production app: prompt engineering, RAG pipelines, vector databases, and cost optimisation strategies.",
    category: "LLMs",
    featured: true,
    publishedAt: "2026-05-15",
  },
  // ── AI Automation ───────────────────────────────────────────────
  {
    id: "PENDING_automate_with_n8n", // ← TODO: paste YouTube video ID here
    title: "Automate Your Business with n8n + AI",
    description:
      "Practical walkthrough of building end-to-end business automation workflows using n8n, webhooks, and OpenAI function calls.",
    category: "AI Automation",
    publishedAt: "2026-05-10",
  },
  {
    id: "PENDING_ai_email_automation", // ← TODO: paste YouTube video ID here
    title: "AI Email Automation That Actually Works",
    description:
      "Build a fully autonomous email response and routing agent using AI — no more manual inbox management.",
    category: "AI Automation",
    publishedAt: "2026-05-05",
  },
  // ── Vibe Coding ─────────────────────────────────────────────────
  {
    id: "PENDING_vibe_coding_fullstack", // ← TODO: paste YouTube video ID here
    title: "Vibe Coding a Full-Stack AI App in 1 Hour",
    description:
      "Live build session — we ship a complete Next.js + OpenAI SaaS application from zero to deployed in a single sitting.",
    category: "Vibe Coding",
    publishedAt: "2026-04-28",
  },
  {
    id: "PENDING_cursor_claude_stack", // ← TODO: paste YouTube video ID here
    title: "Cursor + Claude: The Ultimate Vibe Coding Stack",
    description:
      "My exact workflow for 10x faster development using AI-assisted coding — tools, prompts, and the mental model behind it.",
    category: "Vibe Coding",
    publishedAt: "2026-04-20",
  },
  // ── AI SaaS ─────────────────────────────────────────────────────
  {
    id: "PENDING_ai_saas_2026", // ← TODO: paste YouTube video ID here
    title: "How to Build and Monetise an AI SaaS in 2026",
    description:
      "From idea to revenue: the complete business and technical playbook for launching a profitable AI SaaS product in today's market.",
    category: "AI SaaS",
    publishedAt: "2026-04-12",
  },
  // ── Workshops ───────────────────────────────────────────────────
  {
    id: "PENDING_crewai_workshop", // ← TODO: paste YouTube video ID here
    title: "AI Agent Workshop — Build Your First CrewAI Agent",
    description:
      "Hands-on workshop: build, test, and deploy your first multi-agent system using CrewAI and Python in under 90 minutes.",
    category: "Workshops",
    publishedAt: "2026-04-05",
  },
  // ── Machine Learning ────────────────────────────────────────────
  {
    id: "PENDING_practical_ml", // ← TODO: paste YouTube video ID here
    title: "Practical ML for Software Engineers — No Maths Required",
    description:
      "A software engineer's guide to machine learning: when to use it, how to integrate models, and what you actually need to know.",
    category: "Machine Learning",
    publishedAt: "2026-03-28",
  },
];

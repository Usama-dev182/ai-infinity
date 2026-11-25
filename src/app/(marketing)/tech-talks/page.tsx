import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { TechTalksClient } from "./tech-talks-client";

export const metadata: Metadata = buildMetadata({
  title: "Tech Talks — AI Automation, Agents & LLM Videos",
  description:
    "Watch free video tutorials on Agentic AI, LLM integration, AI automation, vibe coding, and AI SaaS development by Usama Ali — a practicing AI engineer.",
  keywords: [
    "AI automation tutorials",
    "agentic AI videos",
    "LLM integration guide",
    "vibe coding YouTube",
    "AI SaaS development",
    "machine learning workshop",
    "AI agents tutorial",
    "usama ali tech talks",
  ],
  canonicalPath: "/tech-talks",
});

export default function TechTalksPage() {
  return <TechTalksClient />;
}

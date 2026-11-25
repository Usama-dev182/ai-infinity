"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Bot, Loader2, RotateCcw, Send, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/analytics/tracked-link";
import {
  ADVISOR_CHALLENGES,
  ADVISOR_INDUSTRIES,
  ADVISOR_LIMITS,
  getAdvisorChallenge,
  getAdvisorIndustry,
} from "@/content/advisor";
import { EVENTS, trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type ChatMessage = { role: "user" | "assistant"; content: string; fallback?: boolean };
type AdvisorContext = { industry?: string; challenge?: string };
type Status = "idle" | "loading" | "error";

const COMPLETION_REPLIES = 3;

function Chip({
  pressed,
  onClick,
  children,
  disabled,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "min-h-9 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors disabled:opacity-50",
        pressed
          ? "border-[var(--brand-primary)] bg-[var(--brand-primary)]/10 text-[var(--text-brand)]"
          : "border-[var(--surface-border)] bg-[var(--surface-card)] text-[var(--text-secondary)] hover:border-[var(--brand-primary)]/50 hover:text-[var(--text-primary)]"
      )}
    >
      {children}
    </button>
  );
}

export function AiSolutionAdvisor({ location = "advisor" }: { location?: string }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [industry, setIndustry] = useState<string | undefined>();
  const [challenge, setChallenge] = useState<string | undefined>();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const started = useRef(false);
  const completed = useRef(false);
  const inputId = useId();
  const counterId = useId();

  const userTurns = messages.filter((m) => m.role === "user").length;
  const replies = messages.filter((m) => m.role === "assistant").length;
  const limitReached = userTurns >= ADVISOR_LIMITS.maxUserTurns;
  const selectedChallenge = getAdvisorChallenge(challenge);
  const contactHref = `/contact?topic=advisor${selectedChallenge ? `&service=${selectedChallenge.service}` : ""}${
    industry && industry !== "other" ? `&industry=${industry}` : ""
  }`;

  // Keep the newest message in view — scrolls the log only, never the page.
  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [messages.length, status]);

  const markCompleted = (trigger: string) => {
    if (completed.current) return;
    completed.current = true;
    trackEvent(EVENTS.demoCompleted, { trigger, challenge, industry, replies });
  };

  async function request(history: ChatMessage[], ctx: AdvisorContext = { industry, challenge }) {
    setStatus("loading");
    setError(null);
    try {
      const res = await fetch("/api/ai/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
          context: ctx,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { reply?: string; error?: string; fallback?: boolean };
      if (!res.ok || !data.reply) {
        setStatus("error");
        setError(data.error ?? "The advisor couldn't respond. Please try again.");
        trackEvent(EVENTS.demoError, { status: res.status });
        return;
      }
      setMessages([...history, { role: "assistant", content: data.reply, fallback: data.fallback }]);
      setStatus("idle");
      trackEvent(EVENTS.demoMessage, { turn: history.filter((m) => m.role === "user").length, fallback: Boolean(data.fallback) });
      if (replies + 1 >= COMPLETION_REPLIES) markCompleted("replies");
    } catch {
      setStatus("error");
      setError("We couldn't reach the advisor. Check your connection and try again.");
      trackEvent(EVENTS.demoError, { status: 0 });
    }
  }

  function send(text: string, ctx: AdvisorContext = { industry, challenge }) {
    const content = text.trim().slice(0, ADVISOR_LIMITS.maxInputChars);
    if (!content || status === "loading" || limitReached) return;
    if (!started.current) {
      started.current = true;
      trackEvent(EVENTS.demoStarted, { challenge: ctx.challenge, industry: ctx.industry, location });
    }
    const history: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(history);
    setInput("");
    void request(history, ctx);
  }

  function startWithChallenge(id: string) {
    setChallenge(id);
    const c = getAdvisorChallenge(id);
    const i = getAdvisorIndustry(industry);
    if (!c || messages.length > 0) return;
    const where = i && i.id !== "other" ? `We're in ${i.label.toLowerCase()}. ` : "";
    const starter =
      c.id === "other"
        ? `${where}We have a business challenge we think AI might help with. What should we consider first?`
        : `${where}Our main challenge is ${c.label.toLowerCase()}. Where could AI help, and what would a sensible first step be?`;
    // Pass context explicitly: state updates from setChallenge aren't visible in this closure yet.
    send(starter, { industry, challenge: id });
  }

  function reset() {
    setMessages([]);
    setInput("");
    setStatus("idle");
    setError(null);
    setChallenge(undefined);
    started.current = false;
    completed.current = false;
    inputRef.current?.focus();
  }

  return (
    <div className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] shadow-lg overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-[var(--surface-border)] bg-[var(--surface-bg-subtle)]">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-cta-gradient flex items-center justify-center">
            <Bot aria-hidden="true" className="w-4.5 h-4.5 text-white" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">AI Solution Advisor</h3>
            <p className="text-xs text-[var(--text-muted)]">AI-generated guidance — a starting point, not a proposal</p>
          </div>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={reset}>
            <RotateCcw aria-hidden="true" className="w-3.5 h-3.5" /> New chat
          </Button>
        )}
      </div>

      {/* Guided start */}
      {messages.length === 0 && (
        <div className="p-5 space-y-5 border-b border-[var(--surface-border)]">
          <fieldset>
            <legend className="text-sm font-medium text-[var(--text-primary)] mb-2">
              Your industry <span className="font-normal text-[var(--text-muted)]">(optional)</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {ADVISOR_INDUSTRIES.map((i) => (
                <Chip key={i.id} pressed={industry === i.id} onClick={() => setIndustry(industry === i.id ? undefined : i.id)}>
                  {i.label}
                </Chip>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="text-sm font-medium text-[var(--text-primary)] mb-2">What would you like to improve?</legend>
            <div className="flex flex-wrap gap-2">
              {ADVISOR_CHALLENGES.map((c) => (
                <Chip key={c.id} pressed={challenge === c.id} onClick={() => startWithChallenge(c.id)}>
                  {c.label}
                </Chip>
              ))}
            </div>
          </fieldset>
          <p className="text-xs text-[var(--text-muted)]">Pick a challenge to start, or describe your workflow below.</p>
        </div>
      )}

      {/* Conversation */}
      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Advisor conversation"
        className={cn("overflow-y-auto overscroll-contain p-5 space-y-4", messages.length > 0 ? "h-80 sm:h-96" : "h-0 p-0")}
      >
        {messages.map((m, i) => (
          <div key={i} className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}>
            {m.role === "assistant" && (
              <span aria-hidden="true" className="w-7 h-7 mt-0.5 rounded-full bg-cta-gradient flex items-center justify-center shrink-0">
                <Bot className="w-3.5 h-3.5 text-white" />
              </span>
            )}
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line",
                m.role === "user"
                  ? "bg-[var(--brand-primary-hover)] text-white rounded-tr-sm"
                  : "bg-[var(--surface-bg-subtle)] text-[var(--text-primary)] border border-[var(--surface-border)] rounded-tl-sm"
              )}
            >
              <span className="sr-only">{m.role === "user" ? "You said: " : "Advisor: "}</span>
              {m.content}
              {m.fallback && (
                <span className="mt-2 block text-xs text-[var(--text-muted)]">Guided recommendation (live AI unavailable)</span>
              )}
            </div>
            {m.role === "user" && (
              <span aria-hidden="true" className="w-7 h-7 mt-0.5 rounded-full border border-[var(--surface-border)] flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              </span>
            )}
          </div>
        ))}
        {status === "loading" && (
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Loader2 aria-hidden="true" className="w-4 h-4 animate-spin" />
            <span>Advisor is thinking…</span>
          </div>
        )}
      </div>

      {error && (
        <div role="alert" className="mx-5 mb-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-[var(--color-error-text)]">
          <span>{error}</span>
          <Button variant="ghost" size="sm" onClick={() => void request(messages)}>
            Try again
          </Button>
        </div>
      )}

      {limitReached ? (
        <div className="px-5 pb-5 pt-2 text-sm text-[var(--text-secondary)]">
          You&apos;ve reached the end of this demo conversation. For advice specific to your business, let&apos;s talk.
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-start gap-2 px-5 pb-4 pt-1"
        >
          <div className="flex-1">
            <label htmlFor={inputId} className="sr-only">
              Describe your workflow or question
            </label>
            <input
              ref={inputRef}
              id={inputId}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={ADVISOR_LIMITS.maxInputChars}
              aria-describedby={counterId}
              autoComplete="off"
              placeholder={messages.length ? "Ask a follow-up…" : "e.g. We answer the same 20 questions by email every day"}
              disabled={status === "loading"}
              className="w-full h-11 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-bg)] px-3 text-base sm:text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/30 disabled:opacity-60"
            />
            <p id={counterId} className="mt-1 text-xs text-[var(--text-muted)]">
              {input.length}/{ADVISOR_LIMITS.maxInputChars} · {ADVISOR_LIMITS.maxUserTurns - userTurns} messages left
            </p>
          </div>
          <Button type="submit" variant="gradient" size="icon" className="h-11 w-11" aria-label="Send message" disabled={status === "loading" || !input.trim()}>
            <Send aria-hidden="true" className="w-4 h-4" />
          </Button>
        </form>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4 border-t border-[var(--surface-border)] bg-[var(--surface-bg-subtle)]">
        <p className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
          <ShieldCheck aria-hidden="true" className="w-4 h-4 shrink-0 mt-px" />
          Please don&apos;t share personal or confidential information. We don&apos;t store these conversations; messages
          are sent to our AI provider to generate replies.
        </p>
        {(replies > 0 || limitReached) && (
          <Button asChild variant="gradient" size="sm" className="shrink-0">
            <TrackedLink
              href={contactHref}
              onClick={() => markCompleted("cta")}
              eventName={EVENTS.ctaClick}
              params={{ label: "Discuss your project", location, destination: "/contact" }}
            >
              Discuss your project <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
            </TrackedLink>
          </Button>
        )}
      </div>
    </div>
  );
}

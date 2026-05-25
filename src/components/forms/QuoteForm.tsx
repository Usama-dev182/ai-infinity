"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { quoteSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import { trackQuoteFormSubmit } from "@/lib/analytics";

type FormData = z.infer<typeof quoteSchema>;

const SERVICES = [
  "Full Stack Development",
  "AI Integrations",
  "AI Automation & Agentic AI",
  "Other / Not sure yet",
];

const BUDGETS = [
  "< $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
];

const TIMELINES = [
  "ASAP",
  "1–2 months",
  "3–6 months",
  "6+ months",
];

export function QuoteForm() {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { _honey: "", _ts: Date.now() },
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSuccess(true);
      trackQuoteFormSubmit();
      reset();
    }
  };

  if (success) {
    return (
      <div className="glass-card rounded-xl border border-[var(--surface-border)] p-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Quote request received!</h3>
        <p className="text-[var(--text-secondary)]">
          We&apos;ll review your project and get back to you within 24–48 hours with a detailed proposal.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <input type="text" tabIndex={-1} aria-hidden="true" className="hidden" {...register("_honey")} />
      <input type="hidden" {...register("_ts", { valueAsNumber: true })} />

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="name" required>Full name</Label>
          <Input id="name" placeholder="Jane Smith" error={errors.name?.message} {...register("name")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" required>Email</Label>
          <Input id="email" type="email" placeholder="jane@company.com" error={errors.email?.message} {...register("email")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="company">Company / Project name</Label>
        <Input id="company" placeholder="Acme Inc." {...register("company")} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="service" required>Service needed</Label>
        <select
          id="service"
          className="w-full h-10 rounded-md border border-[var(--surface-border)] bg-[var(--surface-card)] px-3 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
          {...register("service")}
        >
          <option value="">Select a service…</option>
          {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.service && <p className="text-xs text-red-500">{errors.service.message}</p>}
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="budget">Estimated budget</Label>
          <select
            id="budget"
            className="w-full h-10 rounded-md border border-[var(--surface-border)] bg-[var(--surface-card)] px-3 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
            {...register("budget")}
          >
            <option value="">Select range…</option>
            {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="timeline">Project timeline</Label>
          <select
            id="timeline"
            className="w-full h-10 rounded-md border border-[var(--surface-border)] bg-[var(--surface-card)] px-3 text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]"
            {...register("timeline")}
          >
            <option value="">Select timeline…</option>
            {TIMELINES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="description" required>Project description</Label>
        <Textarea
          id="description"
          rows={5}
          placeholder="Describe what you want to build, the problem it solves, and any technical requirements..."
          error={errors.description?.message}
          {...register("description")}
        />
      </div>

      <Button type="submit" variant="gradient" size="lg" className="w-full" loading={isSubmitting}>
        {isSubmitting ? "Sending…" : "Request Quote"}
      </Button>
    </form>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { quoteSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormErrorAlert, FormSuccess, HoneypotField } from "@/components/forms/form-feedback";
import { useFormSubmit, useRenderTimestamp } from "@/components/forms/use-form-submit";
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
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: { _honey: "" },
  });
  useRenderTimestamp(setValue);
  const { status, errorMessage, submit } = useFormSubmit<FormData>("/api/quote", setError);

  const onSubmit = async (data: FormData) => {
    const result = await submit(data);
    if (result.ok) {
      trackQuoteFormSubmit();
      reset();
    }
  };

  if (status === "success") {
    return (
      <FormSuccess title="Quote request received">
        <p>We&apos;ll review your project and reply within 1–2 business days.</p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <HoneypotField {...register("_honey")} />
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

      <FormErrorAlert message={errorMessage} />

      <Button type="submit" variant="gradient" size="lg" className="w-full" loading={isSubmitting}>
        {isSubmitting ? "Sending…" : "Request Quote"}
      </Button>
    </form>
  );
}

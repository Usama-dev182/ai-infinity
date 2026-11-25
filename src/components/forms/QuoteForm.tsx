"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteFormSchema, type QuoteFormValues } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FormErrorAlert, FormSuccess, HoneypotField } from "@/components/forms/form-feedback";
import { useFormSubmit, useRenderTimestamp } from "@/components/forms/use-form-submit";
import { useLeadFunnel } from "@/components/forms/use-lead-funnel";
import { readAttribution } from "@/components/analytics/attribution-capture";
import { BUDGET_OPTIONS, LEAD_INDUSTRY_OPTIONS, LEAD_SERVICE_OPTIONS, TIMELINE_OPTIONS } from "@/content/lead-options";

/** Detailed project brief for visitors ready to scope a project. */
export function QuoteForm() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      industry: "",
      budget: "",
      timeline: "",
      description: "",
      _honey: "",
    },
  });
  useRenderTimestamp(setValue);
  const { status, errorMessage, submit } = useFormSubmit<QuoteFormValues>("/api/quote", setError);
  const funnel = useLeadFunnel("quote", "quote_page");

  const onSubmit = async (data: QuoteFormValues) => {
    const attribution = readAttribution();
    const result = await submit({ ...data, attribution });
    if (result.ok) {
      funnel.onSuccess(data, attribution);
      reset();
    } else {
      funnel.onError(result.status);
    }
  };

  if (status === "success") {
    return (
      <FormSuccess title="Quote request received">
        <p>We&apos;ll review your project and reply within 1–2 business days with questions or a proposed next step.</p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onFocusCapture={funnel.onInteract} className="space-y-5" noValidate>
      <HoneypotField {...register("_honey")} />
      <input type="hidden" {...register("_ts", { valueAsNumber: true })} />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="quote-name" required>Name</Label>
          <Input id="quote-name" autoComplete="name" error={errors.name?.message} {...register("name")} />
        </div>
        <div>
          <Label htmlFor="quote-email" required>Work email</Label>
          <Input id="quote-email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="quote-company">Company / project name</Label>
          <Input id="quote-company" autoComplete="organization" error={errors.company?.message} {...register("company")} />
        </div>
        <div>
          <Label htmlFor="quote-industry">Industry</Label>
          <Select id="quote-industry" placeholder="Select…" options={LEAD_INDUSTRY_OPTIONS} {...register("industry")} />
        </div>
      </div>

      <div>
        <Label htmlFor="quote-service" required>Service needed</Label>
        <Select
          id="quote-service"
          placeholder="Select a service…"
          options={LEAD_SERVICE_OPTIONS}
          error={errors.service?.message}
          {...register("service")}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="quote-budget">Estimated budget</Label>
          <Select id="quote-budget" placeholder="Select range…" options={BUDGET_OPTIONS} {...register("budget")} />
        </div>
        <div>
          <Label htmlFor="quote-timeline">Project timeline</Label>
          <Select id="quote-timeline" placeholder="Select timeline…" options={TIMELINE_OPTIONS} {...register("timeline")} />
        </div>
      </div>

      <div>
        <Label htmlFor="quote-description" required>Project description</Label>
        <Textarea
          id="quote-description"
          rows={6}
          placeholder="What do you want to build, what problem does it solve, and are there any technical constraints?"
          hint="Please don't include confidential details — we're happy to sign an NDA before going deeper."
          error={errors.description?.message}
          {...register("description")}
        />
      </div>

      <FormErrorAlert message={errorMessage} />

      <Button type="submit" variant="gradient" size="lg" className="w-full" loading={isSubmitting}>
        {isSubmitting ? "Sending…" : "Request a Quote"}
      </Button>
      <p className="text-xs text-[var(--text-muted)] text-center">
        We use your details only to respond to this request. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-[var(--text-brand)]">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

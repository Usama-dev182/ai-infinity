"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown } from "lucide-react";
import { contactFormSchema, type ContactFormValues } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FormErrorAlert, FormSuccess, HoneypotField } from "@/components/forms/form-feedback";
import { useFormSubmit, useRenderTimestamp } from "@/components/forms/use-form-submit";
import { useLeadFunnel } from "@/components/forms/use-lead-funnel";
import { readAttribution } from "@/components/analytics/attribution-capture";
import {
  BUDGET_OPTIONS,
  ENTRY_POINTS,
  LEAD_INDUSTRY_OPTIONS,
  LEAD_SERVICE_OPTIONS,
  TIMELINE_OPTIONS,
} from "@/content/lead-options";
import { cn } from "@/lib/utils";

const allowed = (value: string | null, options: { value: string }[]) =>
  value && options.some((o) => o.value === value) ? value : "";

/**
 * Consultation inquiry with progressive disclosure: only name, email and message are
 * required; qualification details are optional and collapsed by default.
 * Query params (?service, ?industry, ?topic) pre-fill context from the page that linked here.
 */
export function ContactForm() {
  const params = useSearchParams();
  const presetService = allowed(params.get("service"), LEAD_SERVICE_OPTIONS);
  const presetIndustry = allowed(params.get("industry"), LEAD_INDUSTRY_OPTIONS);
  const entryPoint = allowed(params.get("topic"), ENTRY_POINTS);

  const [detailsOpen, setDetailsOpen] = useState(Boolean(presetIndustry));
  const detailsId = useId();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: presetService,
      industry: presetIndustry,
      budget: "",
      timeline: "",
      message: "",
      _honey: "",
    },
  });
  useRenderTimestamp(setValue);
  const { status, errorMessage, submit } = useFormSubmit<ContactFormValues>("/api/contact", setError);
  const funnel = useLeadFunnel("contact", entryPoint || "contact_page");

  const onSubmit = async (data: ContactFormValues) => {
    const attribution = readAttribution();
    const result = await submit({ ...data, entryPoint: entryPoint || undefined, attribution });
    if (result.ok) {
      funnel.onSuccess(data, attribution);
      reset();
    } else {
      funnel.onError(result.status);
      if (result.status === 422) setDetailsOpen(true);
    }
  };

  if (status === "success") {
    return (
      <FormSuccess title="Thanks — your message is on its way">
        <p>We&apos;ll reply within 1–2 business days, usually with a few questions or times for a short discovery call.</p>
        <p className="text-sm">
          Meanwhile, you can browse our{" "}
          <Link href="/case-studies" className="text-[var(--text-brand)] underline underline-offset-2">
            case studies
          </Link>
          .
        </p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} onFocusCapture={funnel.onInteract} className="space-y-5" noValidate>
      <HoneypotField {...register("_honey")} />
      <input type="hidden" {...register("_ts", { valueAsNumber: true })} />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="contact-name" required>Name</Label>
          <Input id="contact-name" autoComplete="name" error={errors.name?.message} {...register("name")} />
        </div>
        <div>
          <Label htmlFor="contact-email" required>Work email</Label>
          <Input id="contact-email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        </div>
      </div>

      <div>
        <Label htmlFor="contact-service">What can we help with?</Label>
        <Select id="contact-service" placeholder="Choose an area (optional)" options={LEAD_SERVICE_OPTIONS} {...register("service")} />
      </div>

      <div>
        <Label htmlFor="contact-message" required>Your challenge or idea</Label>
        <Textarea
          id="contact-message"
          rows={5}
          placeholder="What are you trying to achieve, how does it work today, and what would success look like?"
          hint="Please don't include passwords, financial details or other confidential information."
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      <div className="rounded-xl border border-[var(--surface-border)]">
        <button
          type="button"
          aria-expanded={detailsOpen}
          aria-controls={detailsId}
          onClick={() => setDetailsOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-[var(--text-primary)]"
        >
          <span>
            Add project details <span className="font-normal text-[var(--text-muted)]">(optional — helps us prepare)</span>
          </span>
          <ChevronDown aria-hidden="true" className={cn("w-4 h-4 transition-transform", detailsOpen && "rotate-180")} />
        </button>
        <div id={detailsId} hidden={!detailsOpen} className="border-t border-[var(--surface-border)] p-4 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-company">Company</Label>
              <Input id="contact-company" autoComplete="organization" error={errors.company?.message} {...register("company")} />
            </div>
            <div>
              <Label htmlFor="contact-industry">Industry</Label>
              <Select id="contact-industry" placeholder="Select…" options={LEAD_INDUSTRY_OPTIONS} {...register("industry")} />
            </div>
            <div>
              <Label htmlFor="contact-budget">Budget range</Label>
              <Select id="contact-budget" placeholder="Select…" options={BUDGET_OPTIONS} {...register("budget")} />
            </div>
            <div>
              <Label htmlFor="contact-timeline">Timeline</Label>
              <Select id="contact-timeline" placeholder="Select…" options={TIMELINE_OPTIONS} {...register("timeline")} />
            </div>
          </div>
        </div>
      </div>

      <FormErrorAlert message={errorMessage} />

      <Button type="submit" variant="gradient" size="lg" className="w-full" loading={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
      <p className="text-xs text-[var(--text-muted)] text-center">
        We use your details only to reply to this enquiry. See our{" "}
        <Link href="/privacy" className="underline underline-offset-2 hover:text-[var(--text-brand)]">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}

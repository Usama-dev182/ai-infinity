"use client";

import { useCallback, useRef } from "react";
import {
  trackConsultationStarted,
  trackFormError,
  trackLeadSubmitted,
  type FormErrorReason,
  type LeadFormName,
} from "@/lib/analytics";
import type { Attribution } from "@/lib/leads/attribution";

export function errorReasonForStatus(status: number): FormErrorReason {
  if (status === 0) return "network";
  if (status === 429) return "rate_limited";
  if (status === 422 || status === 400) return "validation";
  return "server";
}

/** Funnel analytics for a lead form — ids and categories only, never field values. */
export function useLeadFunnel(form: LeadFormName, location?: string) {
  const started = useRef(false);

  const onInteract = useCallback(() => {
    if (started.current) return;
    started.current = true;
    trackConsultationStarted(form, location);
  }, [form, location]);

  const onSuccess = useCallback(
    (fields: { service?: string; industry?: string }, attribution?: Attribution) => {
      trackLeadSubmitted(form, {
        service: fields.service || undefined,
        industry: fields.industry || undefined,
        utm_source: attribution?.utmSource,
        utm_medium: attribution?.utmMedium,
        utm_campaign: attribution?.utmCampaign,
      });
    },
    [form]
  );

  const onError = useCallback((status: number) => trackFormError(form, errorReasonForStatus(status)), [form]);

  return { onInteract, onSuccess, onError };
}

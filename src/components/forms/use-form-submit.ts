"use client";

import { useCallback, useEffect, useState } from "react";
import type { FieldValues, Path, UseFormSetError, UseFormSetValue } from "react-hook-form";
import { SITE } from "@/content/site";

export type SubmitStatus = "idle" | "success" | "error";

interface ApiErrorBody {
  error?: string;
  issues?: { fieldErrors?: Record<string, string[] | undefined> };
}

export interface SubmitResult {
  ok: boolean;
  /** HTTP status, or 0 for network failures. */
  status: number;
  message?: string;
}

/** Turns an API failure into a message a visitor can act on. Never exposes internals. */
export function describeSubmitError(status: number, body?: ApiErrorBody): string {
  if (status === 429) return "Too many submissions in a short time. Please wait a minute and try again.";
  if (status === 422) return "Some fields need attention. Please review the highlighted fields.";
  if (status === 400 && body?.error) return body.error;
  return `We couldn't send this right now. Please try again, or email us directly at ${SITE.email}.`;
}

/**
 * Shared submit logic for public forms: JSON POST, explicit success/error state,
 * server-side field errors mapped back onto react-hook-form fields.
 */
export function useFormSubmit<T extends FieldValues>(
  endpoint: string,
  setError?: UseFormSetError<T>
) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const submit = useCallback(
    async (payload: unknown): Promise<SubmitResult> => {
      setErrorMessage(null);
      let res: Response;
      try {
        res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch {
        const message = describeSubmitError(0);
        setStatus("error");
        setErrorMessage(message);
        return { ok: false, status: 0, message };
      }

      if (res.ok) {
        setStatus("success");
        return { ok: true, status: res.status };
      }

      const body = (await res.json().catch(() => undefined)) as ApiErrorBody | undefined;
      const fieldErrors = body?.issues?.fieldErrors;
      if (setError && fieldErrors) {
        for (const [field, messages] of Object.entries(fieldErrors)) {
          if (messages?.[0] && !field.startsWith("_")) {
            setError(field as Path<T>, { type: "server", message: messages[0] });
          }
        }
      }
      const message = describeSubmitError(res.status, body);
      setStatus("error");
      setErrorMessage(message);
      return { ok: false, status: res.status, message };
    },
    [endpoint, setError]
  );

  const resetStatus = useCallback(() => {
    setStatus("idle");
    setErrorMessage(null);
  }, []);

  return { status, errorMessage, submit, resetStatus };
}

/**
 * Records when the form was first rendered on the client (anti-spam timing check).
 * Set after mount so render stays pure.
 */
export function useRenderTimestamp<T extends FieldValues>(setValue: UseFormSetValue<T>) {
  useEffect(() => {
    setValue("_ts" as Path<T>, Date.now() as T[Path<T>]);
  }, [setValue]);
}

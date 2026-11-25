"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { LEAD_STAGES } from "@/content/lead-options";
import { updateLeadAction, type LeadActionState } from "./actions";

export function LeadUpdateForm({
  id,
  type,
  stage,
  adminNotes,
}: {
  id: string;
  type: "contact" | "quote";
  stage: string;
  adminNotes: string | null;
}) {
  const [state, action, pending] = useActionState<LeadActionState | null, FormData>(updateLeadAction, null);
  const stageId = `stage-${type}-${id}`;
  const notesId = `notes-${type}-${id}`;

  return (
    <form action={action} className="grid gap-3 sm:grid-cols-[12rem_1fr_auto] sm:items-end">
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="type" value={type} />
      <div>
        <label htmlFor={stageId} className="block text-xs font-medium text-[var(--text-muted)] mb-1">
          Stage
        </label>
        <select
          id={stageId}
          name="stage"
          defaultValue={stage}
          className="w-full h-10 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-bg)] px-2 text-sm text-[var(--text-primary)]"
        >
          {LEAD_STAGES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={notesId} className="block text-xs font-medium text-[var(--text-muted)] mb-1">
          Notes
        </label>
        <textarea
          id={notesId}
          name="adminNotes"
          rows={1}
          maxLength={5000}
          defaultValue={adminNotes ?? ""}
          placeholder="Call notes, next step, decision makers…"
          className="w-full min-h-10 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-bg)] px-3 py-2 text-sm text-[var(--text-primary)] resize-y"
        />
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit" size="sm" variant="default" loading={pending}>
          Save
        </Button>
        <span role="status" className={state?.ok ? "text-xs text-[var(--color-success-text)]" : "text-xs text-[var(--color-error-text)]"}>
          {state?.message}
        </span>
      </div>
    </form>
  );
}

"use client";

import { useId, useMemo, useRef, useState } from "react";
import { ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { TrackedLink } from "@/components/analytics/tracked-link";
import {
  DEFAULT_ROI_INPUTS,
  ROI_LIMITS,
  calculateRoi,
  paybackBucket,
  type RoiInputs,
} from "@/lib/roi";
import { EVENTS, trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const CURRENCIES = ["USD", "EUR", "GBP", "AUD", "CAD", "AED"] as const;

const FIELDS: { key: keyof RoiInputs; label: string; hint: string; step: number; money?: boolean; suffix?: string }[] = [
  { key: "employees", label: "People doing this work", hint: "Team members who spend time on the repetitive task.", step: 1 },
  { key: "hoursPerWeek", label: "Repetitive hours per person, per week", hint: "Time spent on the task you want to automate.", step: 0.5, suffix: "hrs" },
  { key: "hourlyCost", label: "Hourly labour cost", hint: "Fully loaded cost per hour (salary, benefits, overhead).", step: 1, money: true },
  { key: "timeSavedPct", label: "Estimated share of time saved", hint: "Be conservative — 20–50% is a common planning range.", step: 5, suffix: "%" },
  { key: "implementationCost", label: "Implementation cost (one-off)", hint: "Build and setup. Use 0 if unknown to see the time value only.", step: 500, money: true },
  { key: "monthlyOperatingCost", label: "Monthly operating cost", hint: "Hosting, AI usage, licences and maintenance.", step: 50, money: true },
];

export function RoiCalculator({ location = "roi_calculator" }: { location?: string }) {
  const [values, setValues] = useState<Record<keyof RoiInputs, string>>(
    () => Object.fromEntries(Object.entries(DEFAULT_ROI_INPUTS).map(([k, v]) => [k, String(v)])) as Record<keyof RoiInputs, string>
  );
  const [currency, setCurrency] = useState<(typeof CURRENCIES)[number]>("USD");
  const tracked = useRef(false);
  const idPrefix = useId();

  const numeric = useMemo(
    () => Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v === "" ? NaN : Number(v)])) as Record<keyof RoiInputs, number>,
    [values]
  );
  const result = useMemo(() => calculateRoi(numeric), [numeric]);
  const hasCosts = numeric.implementationCost > 0 || numeric.monthlyOperatingCost > 0;

  const money = useMemo(
    () => new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: 0 }),
    [currency]
  );
  const num = (n: number, digits = 0) => new Intl.NumberFormat("en", { maximumFractionDigits: digits }).format(n);

  function update(key: keyof RoiInputs, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (!tracked.current) {
      tracked.current = true;
      const next = { ...numeric, [key]: value === "" ? NaN : Number(value) };
      // Bucketed, non-identifying signal only — no amounts are sent.
      trackEvent(EVENTS.roiCalculated, {
        location,
        has_costs: next.implementationCost > 0 || next.monthlyOperatingCost > 0,
        payback: paybackBucket(calculateRoi(next).paybackMonths),
      });
    }
  }

  const outOfRange = (key: keyof RoiInputs) => {
    const v = numeric[key];
    return values[key] !== "" && (!Number.isFinite(v) || v < ROI_LIMITS[key].min || v > ROI_LIMITS[key].max);
  };

  return (
    <div className="grid lg:grid-cols-[1fr_0.9fr] gap-6 lg:gap-8 items-start">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 sm:p-7 space-y-5"
        aria-describedby={`${idPrefix}-disclaimer`}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-heading-3 font-bold text-[var(--text-primary)]">Your workflow</h2>
          <div className="w-32">
            <Label htmlFor={`${idPrefix}-currency`}>Currency</Label>
            <Select
              id={`${idPrefix}-currency`}
              value={currency}
              onChange={(e) => setCurrency(e.target.value as (typeof CURRENCIES)[number])}
              options={CURRENCIES}
            />
          </div>
        </div>
        {FIELDS.map((f) => {
          const id = `${idPrefix}-${f.key}`;
          const invalid = outOfRange(f.key);
          const { min, max } = ROI_LIMITS[f.key];
          return (
            <div key={f.key}>
              <Label htmlFor={id}>{f.label}</Label>
              <div className="relative">
                <input
                  id={id}
                  type="number"
                  inputMode="decimal"
                  min={min}
                  max={max}
                  step={f.step}
                  value={values[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  aria-invalid={invalid || undefined}
                  aria-describedby={`${id}-hint`}
                  className={cn(
                    "w-full h-11 rounded-lg border bg-[var(--surface-bg)] px-3 text-base sm:text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/30",
                    invalid ? "border-[var(--color-error)]" : "border-[var(--surface-border)]",
                    (f.suffix || f.money) && "pr-14"
                  )}
                />
                {(f.suffix || f.money) && (
                  <span aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)]">
                    {f.money ? currency : f.suffix}
                  </span>
                )}
              </div>
              <p id={`${id}-hint`} className={cn("mt-1 text-xs", invalid ? "text-[var(--color-error-text)]" : "text-[var(--text-muted)]")}>
                {invalid ? `Enter a value between ${num(min)} and ${num(max)}. Out-of-range values are capped.` : f.hint}
              </p>
            </div>
          );
        })}
      </form>

      <section aria-labelledby={`${idPrefix}-results`} className="lg:sticky lg:top-24 rounded-2xl border border-[var(--brand-primary)]/30 bg-[var(--surface-card)] p-6 sm:p-7">
        <h2 id={`${idPrefix}-results`} className="text-heading-3 font-bold text-[var(--text-primary)]">
          Estimated impact
        </h2>
        <div aria-live="polite" className="mt-5">
          <dl className="grid grid-cols-2 gap-4">
            {[
              { label: "Hours saved / month", value: num(result.monthlyHoursSaved) },
              { label: "Annual time value", value: money.format(result.annualValue) },
              {
                label: hasCosts ? "First-year net benefit" : "Annual net benefit",
                value: money.format(hasCosts ? result.firstYearNet : result.ongoingAnnualNet),
                negative: (hasCosts ? result.firstYearNet : result.ongoingAnnualNet) < 0,
              },
              { label: "Ongoing annual net", value: money.format(result.ongoingAnnualNet), negative: result.ongoingAnnualNet < 0 },
            ].map((m) => (
              <div key={m.label} className="rounded-xl bg-[var(--surface-bg-subtle)] border border-[var(--surface-border)] p-4">
                <dt className="text-xs font-medium text-[var(--text-muted)]">{m.label}</dt>
                <dd className={cn("mt-1 text-xl sm:text-2xl font-bold", m.negative ? "text-[var(--color-error-text)]" : "text-[var(--text-primary)]")}>
                  <output>{m.value}</output>
                </dd>
              </div>
            ))}
          </dl>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--text-secondary)]">First-year ROI</dt>
              <dd className="font-semibold text-[var(--text-primary)]">
                {result.firstYearRoiPct === null ? "Add costs to estimate" : `${num(result.firstYearRoiPct)}%`}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[var(--text-secondary)]">Payback period</dt>
              <dd className="font-semibold text-[var(--text-primary)]">
                {numeric.implementationCost > 0
                  ? result.paybackMonths === null
                    ? "Not recovered at these costs"
                    : `${num(result.paybackMonths, 1)} months`
                  : "Add implementation cost"}
              </dd>
            </div>
          </dl>
        </div>

        <p id={`${idPrefix}-disclaimer`} className="mt-5 flex gap-2 text-xs text-[var(--text-muted)]">
          <Info aria-hidden="true" className="w-4 h-4 shrink-0" />
          Illustrative estimate based only on the numbers you enter. It is not a quote or a guarantee of savings — real
          results depend on your processes, data quality, adoption and the solution built.
        </p>

        <div className="mt-6 border-t border-[var(--surface-border)] pt-5">
          <p className="text-sm text-[var(--text-secondary)] mb-3">
            Want a grounded estimate for your workflow? We&apos;ll review the process with you and suggest what to automate first.
          </p>
          <Button asChild variant="gradient" className="w-full sm:w-auto">
            <TrackedLink
              href="/contact?topic=roi-calculator&service=ai-automation"
              eventName={EVENTS.ctaClick}
              params={{ label: "Discuss Your Project", location, destination: "/contact" }}
            >
              Discuss Your Project <ArrowRight aria-hidden="true" className="w-4 h-4" />
            </TrackedLink>
          </Button>
        </div>
      </section>
    </div>
  );
}

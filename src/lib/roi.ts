// AI automation ROI estimate — pure, illustrative arithmetic. No guarantees implied.

export interface RoiInputs {
  /** People who do the repetitive work. */
  employees: number;
  /** Repetitive hours per employee per week. */
  hoursPerWeek: number;
  /** Fully loaded hourly labour cost. */
  hourlyCost: number;
  /** Share of that time expected to be saved, 0–100. */
  timeSavedPct: number;
  /** One-off implementation cost. */
  implementationCost: number;
  /** Ongoing monthly cost (hosting, AI usage, maintenance). */
  monthlyOperatingCost: number;
}

export interface RoiResult {
  monthlyHoursSaved: number;
  annualHoursSaved: number;
  monthlyValue: number;
  annualValue: number;
  annualOperatingCost: number;
  /** Annual value minus ongoing costs (excludes implementation). */
  ongoingAnnualNet: number;
  /** First-year value minus implementation and first-year operating costs. */
  firstYearNet: number;
  /** First-year ROI %, or null when there are no costs to compare against. */
  firstYearRoiPct: number | null;
  /** Months to recover implementation cost, or null when it is never recovered. */
  paybackMonths: number | null;
}

export const WEEKS_PER_YEAR = 52;

export const ROI_LIMITS = {
  employees: { min: 1, max: 100_000 },
  hoursPerWeek: { min: 0, max: 60 },
  hourlyCost: { min: 0, max: 10_000 },
  timeSavedPct: { min: 0, max: 100 },
  implementationCost: { min: 0, max: 100_000_000 },
  monthlyOperatingCost: { min: 0, max: 10_000_000 },
} as const satisfies Record<keyof RoiInputs, { min: number; max: number }>;

export const DEFAULT_ROI_INPUTS: RoiInputs = {
  employees: 5,
  hoursPerWeek: 6,
  hourlyCost: 35,
  timeSavedPct: 40,
  implementationCost: 15000,
  monthlyOperatingCost: 300,
};

const clamp = (value: number, { min, max }: { min: number; max: number }) =>
  Number.isFinite(value) ? Math.min(max, Math.max(min, value)) : min;

/** Clamps every input to a sane range (handles NaN, negatives and absurd values). */
export function sanitizeRoiInputs(raw: Partial<Record<keyof RoiInputs, number>>): RoiInputs {
  return (Object.keys(ROI_LIMITS) as (keyof RoiInputs)[]).reduce((acc, key) => {
    acc[key] = clamp(Number(raw[key]), ROI_LIMITS[key]);
    return acc;
  }, {} as RoiInputs);
}

export function calculateRoi(raw: Partial<Record<keyof RoiInputs, number>>): RoiResult {
  const i = sanitizeRoiInputs(raw);

  const annualHoursSaved = i.employees * i.hoursPerWeek * WEEKS_PER_YEAR * (i.timeSavedPct / 100);
  const annualValue = annualHoursSaved * i.hourlyCost;
  const annualOperatingCost = i.monthlyOperatingCost * 12;
  const firstYearCost = i.implementationCost + annualOperatingCost;
  const firstYearNet = annualValue - firstYearCost;
  const monthlyValue = annualValue / 12;
  const monthlyNet = monthlyValue - i.monthlyOperatingCost;

  let paybackMonths: number | null = null;
  if (monthlyNet > 0) paybackMonths = i.implementationCost / monthlyNet;

  return {
    monthlyHoursSaved: annualHoursSaved / 12,
    annualHoursSaved,
    monthlyValue,
    annualValue,
    annualOperatingCost,
    ongoingAnnualNet: annualValue - annualOperatingCost,
    firstYearNet,
    firstYearRoiPct: firstYearCost > 0 ? (firstYearNet / firstYearCost) * 100 : null,
    paybackMonths,
  };
}

/** Coarse bucket for analytics — never send the underlying amounts. */
export function paybackBucket(months: number | null): string {
  if (months === null) return "not_recovered";
  if (months <= 3) return "0-3m";
  if (months <= 6) return "3-6m";
  if (months <= 12) return "6-12m";
  if (months <= 24) return "12-24m";
  return "24m+";
}

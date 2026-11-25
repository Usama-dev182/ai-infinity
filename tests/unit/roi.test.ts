import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateRoi, paybackBucket, sanitizeRoiInputs } from "@/lib/roi";

const base = {
  employees: 5,
  hoursPerWeek: 6,
  hourlyCost: 35,
  timeSavedPct: 40,
  implementationCost: 15000,
  monthlyOperatingCost: 300,
};

test("computes hours, value, net benefit, ROI and payback", () => {
  const r = calculateRoi(base);
  // 5 people × 6 h × 52 weeks × 40% = 624 h/year
  assert.equal(r.annualHoursSaved, 624);
  assert.equal(r.monthlyHoursSaved, 52);
  assert.equal(r.annualValue, 21840);
  assert.equal(r.annualOperatingCost, 3600);
  assert.equal(r.ongoingAnnualNet, 18240);
  assert.equal(r.firstYearNet, 21840 - 15000 - 3600);
  assert.ok(r.firstYearRoiPct !== null);
  assert.ok(Math.abs(r.firstYearRoiPct - (3240 / 18600) * 100) < 1e-9);
  // payback = 15000 / (1820 − 300)
  assert.ok(r.paybackMonths !== null);
  assert.ok(Math.abs(r.paybackMonths - 15000 / 1520) < 1e-9);
});

test("ROI is null without costs; payback is null when monthly net is not positive", () => {
  assert.equal(calculateRoi({ ...base, implementationCost: 0, monthlyOperatingCost: 0 }).firstYearRoiPct, null);
  const r = calculateRoi({ ...base, monthlyOperatingCost: 5000 });
  assert.equal(r.paybackMonths, null);
});

test("zero implementation cost pays back immediately when monthly net is positive", () => {
  assert.equal(calculateRoi({ ...base, implementationCost: 0 }).paybackMonths, 0);
});

test("clamps invalid and out-of-range inputs", () => {
  const i = sanitizeRoiInputs({ employees: -3, hoursPerWeek: 500, hourlyCost: NaN, timeSavedPct: 150 });
  assert.equal(i.employees, 1);
  assert.equal(i.hoursPerWeek, 60);
  assert.equal(i.hourlyCost, 0);
  assert.equal(i.timeSavedPct, 100);
  assert.equal(i.implementationCost, 0);
  assert.doesNotThrow(() => calculateRoi({}));
});

test("payback buckets never expose amounts", () => {
  assert.equal(paybackBucket(null), "not_recovered");
  assert.equal(paybackBucket(2), "0-3m");
  assert.equal(paybackBucket(9.9), "6-12m");
  assert.equal(paybackBucket(30), "24m+");
});

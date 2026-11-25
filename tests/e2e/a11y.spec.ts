import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { ready } from "./helpers";

// WCAG 2.x A/AA automated checks (axe-core) in both colour schemes.
const PAGES = [
  "/",
  "/services",
  "/services/ai-agents",
  "/industries/real-estate",
  "/case-studies",
  "/case-studies/daspire-platform",
  "/tools/ai-solution-advisor",
  "/tools/ai-roi-calculator",
  "/contact",
  "/quote",
];

for (const scheme of ["light", "dark"] as const) {
  for (const path of PAGES) {
    test(`axe: ${path} (${scheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: scheme, reducedMotion: "reduce" });
      await page.goto(path);
      await ready(page);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        // Next.js dev/route announcer and devtools are not part of the product UI.
        .exclude("nextjs-portal")
        .analyze();
      const summary = results.violations.map(
        (v) => `${v.id} (${v.impact}): ${v.nodes.length} node(s) — ${v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(" | ")}`
      );
      expect(summary, summary.join("\n")).toEqual([]);
    });
  }
}

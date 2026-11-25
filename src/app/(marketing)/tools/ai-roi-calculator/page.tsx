import type { Metadata } from "next";
import { PageHero, Section } from "@/components/marketing/section";
import { RoiCalculator } from "@/components/marketing/roi-calculator";
import { JsonLd } from "@/components/seo/json-ld";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "AI Automation ROI Calculator",
  description:
    "Estimate the potential time and cost value of automating a repetitive workflow with AI: hours saved, annual value, net benefit, ROI and payback period. Illustrative estimates only.",
  keywords: ["AI ROI calculator", "automation ROI calculator", "AI automation cost savings", "workflow automation ROI"],
  canonicalPath: "/tools/ai-roi-calculator",
  ogType: "Free tool",
});

export default function RoiCalculatorPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Tools", path: "/tools" },
            { name: "AI ROI Calculator", path: "/tools/ai-roi-calculator" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "AI Automation ROI Calculator",
            url: absoluteUrl("/tools/ai-roi-calculator"),
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            isAccessibleForFree: true,
            provider: { "@id": absoluteUrl("/#organization") },
          },
        ]}
      />
      <PageHero
        eyebrow="Free tool"
        title={
          <>
            AI automation <span className="gradient-text">ROI calculator</span>
          </>
        }
        description="Estimate what automating a repetitive workflow could be worth. Adjust the inputs to match your team — results update as you type."
      />
      <Section>
        <RoiCalculator location="roi_calculator_page" />
      </Section>
    </>
  );
}

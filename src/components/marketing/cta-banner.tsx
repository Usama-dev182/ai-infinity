import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { FadeUp } from "@/components/marketing/animation";
import { PRIMARY_CTA } from "@/content/navigation";

interface CtaBannerProps {
  title?: string;
  description?: string;
  location: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

/** Closing consultation call-to-action used across marketing pages. */
export function CtaBanner({
  title = "Have an AI product or automation in mind?",
  description = "Tell us about the problem you're solving. We'll reply with practical next steps — whether that's a short discovery call, a prototype, or advice on whether AI is the right fit at all.",
  location,
  primary = PRIMARY_CTA,
  secondary = { label: "Request a Quote", href: "/quote" },
}: CtaBannerProps) {
  return (
    <section className="section-padding" aria-labelledby={`cta-${location}`}>
      <div className="container-page">
        <FadeUp>
          <div className="relative rounded-3xl overflow-hidden bg-cta-gradient px-6 py-12 sm:p-14 lg:p-20 text-center shadow-xl">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.14),transparent_70%)]"
            />
            <div className="relative max-w-3xl mx-auto">
              <h2 id={`cta-${location}`} className="text-heading-2 font-extrabold text-white mb-5">
                {title}
              </h2>
              <p className="text-lead text-white/90 mb-10">{description}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="xl" className="bg-white text-[#3730a3] font-bold hover:bg-white/90 shadow-lg">
                  <TrackedLink
                    href={primary.href}
                    eventName="cta_click"
                    params={{ label: primary.label, location, destination: primary.href }}
                  >
                    {primary.label} <ArrowRight aria-hidden="true" className="w-5 h-5" />
                  </TrackedLink>
                </Button>
                {secondary && (
                  <Button
                    asChild
                    size="xl"
                    variant="ghost"
                    className="border-2 border-white/70 text-white hover:bg-white/10 hover:text-white"
                  >
                    <TrackedLink
                      href={secondary.href}
                      eventName="cta_click"
                      params={{ label: secondary.label, location, destination: secondary.href }}
                    >
                      {secondary.label}
                    </TrackedLink>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

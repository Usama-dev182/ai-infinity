import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Compass, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { Section } from "@/components/marketing/section";
import { ServiceIconTile } from "@/components/marketing/service-icon";
import { CaseStudyCard } from "@/components/marketing/case-study-card";
import { CaseStudyCover } from "@/components/marketing/case-study-cover";
import { ArchitectureDiagram } from "@/components/marketing/architecture-diagram";
import { ShareLinks } from "@/components/marketing/share-links";
import type { CapabilityStatus, CaseStudy, CaseStudyCapability } from "@/content/case-studies";
import { getService, serviceHref } from "@/content/services";
import { verifiedOutcomes } from "@/lib/content/case-study-model";

// Static class names (Tailwind can't see computed ones), so the fact strip never has an empty cell.
const FACT_GRID: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const STATUS_ORDER: CapabilityStatus[] = ["implemented", "in-progress", "planned", "unconfirmed"];
const STATUS_LABEL: Record<CapabilityStatus, { heading: string; badge: string; variant: "success" | "warning" | "secondary" | "outline" }> = {
  implemented: { heading: "Implemented", badge: "Implemented", variant: "success" },
  "in-progress": { heading: "In progress", badge: "In progress", variant: "warning" },
  planned: { heading: "Planned", badge: "Planned", variant: "secondary" },
  unconfirmed: { heading: "Status to be confirmed", badge: "To be confirmed", variant: "outline" },
};

function Prose({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-4 text-[var(--text-secondary)] text-lg leading-relaxed">
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

function ArticleSection({
  id,
  title,
  eyebrow,
  children,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[var(--text-brand)]">{eyebrow}</p>}
      <h2 id={id} className="text-heading-2 font-bold text-[var(--text-primary)] mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}

function groupByStatus(capabilities: CaseStudyCapability[]) {
  return STATUS_ORDER.map((status) => ({ status, items: capabilities.filter((c) => c.status === status) })).filter(
    (g) => g.items.length > 0
  );
}

/** Pre-fills the contact form with the context of this case study. */
export function caseStudyContactHref(study: Pick<CaseStudy, "services" | "industrySlug">) {
  const params = new URLSearchParams({ topic: "case-study" });
  if (study.services[0]) params.set("service", study.services[0]);
  if (study.industrySlug) params.set("industry", study.industrySlug);
  return `/contact?${params.toString()}`;
}

/** Full case study layout. Used by the public page and the admin draft preview. */
export function CaseStudyArticle({ study, related }: { study: CaseStudy; related: CaseStudy[] }) {
  const outcomes = verifiedOutcomes(study);
  const services = study.services.map(getService).filter((s) => s !== undefined);
  const location = `case_study:${study.slug}`;
  const contactHref = caseStudyContactHref(study);
  const path = `/case-studies/${study.slug}`;

  const facts = [
    { label: "Client", value: study.client },
    { label: "Our role", value: study.role },
    { label: "Engagement", value: study.engagement },
    { label: "Industry", value: study.industry },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-[var(--surface-border)] bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_60%)]" />
        <div className="relative container-page py-12 lg:py-16">
          <nav aria-label="Breadcrumb" className="mb-8">
            <TrackedLink
              href="/case-studies"
              eventName="nav_click"
              params={{ label: "All case studies", location, destination: "/case-studies" }}
              className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-brand)]"
            >
              <ArrowLeft aria-hidden="true" className="w-4 h-4" /> All case studies
            </TrackedLink>
          </nav>
          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {study.industry && <Badge variant="gradient">{study.industry}</Badge>}
                {study.projectType && <Badge variant="outline">{study.projectType}</Badge>}
              </div>
              <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)]">{study.title}</h1>
              <p className="mt-6 text-lead text-[var(--text-secondary)]">{study.summary}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild variant="gradient" size="lg">
                  <TrackedLink
                    href={contactHref}
                    eventName="cta_click"
                    params={{ label: "Discuss Your Project", location: `${location}:hero`, destination: "/contact" }}
                  >
                    Discuss a similar project <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </TrackedLink>
                </Button>
                {study.clientUrl && (
                  <Button asChild variant="outline" size="lg">
                    <TrackedLink
                      href={study.clientUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      eventName="outbound_click"
                      params={{ label: "Visit live site", location, destination: study.clientUrl }}
                    >
                      Visit live site <ArrowUpRight aria-hidden="true" className="w-4 h-4" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </TrackedLink>
                  </Button>
                )}
              </div>
            </div>
            <CaseStudyCover
              cover={study.cover}
              preload
              sizes="(min-width: 1024px) 560px, 100vw"
              className="rounded-2xl border border-[var(--surface-border)] shadow-xl"
            />
          </div>

          <dl className={`mt-10 grid ${FACT_GRID[facts.length]} gap-px overflow-hidden rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-border)]`}>
            {facts.map((f) => (
              <div key={f.label} className="bg-[var(--surface-card)] p-4 sm:p-5">
                <dt className="text-caption font-semibold uppercase tracking-wider text-[var(--text-muted)]">{f.label}</dt>
                <dd className="mt-1 font-medium text-[var(--text-primary)]">{f.value}</dd>
              </div>
            ))}
          </dl>
          {study.techStack.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="text-caption font-semibold uppercase tracking-wider text-[var(--text-muted)]">Technology</span>
              <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
                {study.techStack.map((t) => (
                  <li key={t}>
                    <Badge variant="secondary">{t}</Badge>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Verified outcomes only */}
      {outcomes.length > 0 && (
        <section aria-labelledby="outcomes-heading" className="border-b border-[var(--surface-border)] bg-[var(--surface-bg-subtle)]">
          <div className="container-page py-12">
            <h2 id="outcomes-heading" className="sr-only">Outcomes</h2>
            <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {outcomes.map((o) => (
                <StaggerItem key={o.label}>
                  <div className="text-center">
                    <p className="text-3xl font-extrabold gradient-text">{o.value}</p>
                    <p className="mt-1 font-semibold text-[var(--text-primary)]">{o.label}</p>
                    <p className="text-meta text-[var(--text-secondary)]">{o.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      <Section>
        <div className="max-w-3xl mx-auto space-y-16">
          {study.overview && (
            <ArticleSection id="overview" title="Overview">
              <Prose paragraphs={study.overview} />
            </ArticleSection>
          )}
          {study.challenge && (
            <ArticleSection id="challenge" title="The business challenge">
              <Prose paragraphs={study.challenge} />
            </ArticleSection>
          )}
          {study.vision && (
            <ArticleSection id="vision" title="Product vision">
              <div className="relative rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-bg-subtle)] p-6 sm:p-8">
                <Compass aria-hidden="true" className="absolute right-6 top-6 w-6 h-6 text-[var(--text-brand)] opacity-60" />
                <Prose paragraphs={study.vision} />
              </div>
            </ArticleSection>
          )}
          {study.contributions && (
            <ArticleSection id="contribution" title="Our engineering contribution">
              {study.role && (
                <p className="mb-5 text-lg text-[var(--text-secondary)]">
                  Role: <strong className="font-semibold text-[var(--text-primary)]">{study.role}</strong>
                </p>
              )}
              <ul className="grid sm:grid-cols-2 gap-3">
                {study.contributions.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-[var(--text-secondary)]">
                    <CheckCircle2 aria-hidden="true" className="w-5 h-5 mt-0.5 shrink-0 text-[var(--text-brand)]" />
                    {c}
                  </li>
                ))}
              </ul>
            </ArticleSection>
          )}
          {study.capabilities && (
            <ArticleSection id="solution" title="The solution">
              <div className="space-y-8">
                {groupByStatus(study.capabilities).map(({ status, items }) => {
                  const label = STATUS_LABEL[status];
                  return (
                    <div key={status}>
                      <h3 className="mb-3 flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                        <Badge variant={label.variant}>{label.badge}</Badge>
                        <span className="text-[var(--text-muted)] text-sm font-normal">
                          {items.length} {items.length === 1 ? "capability" : "capabilities"}
                        </span>
                      </h3>
                      <ul className="grid sm:grid-cols-2 gap-3">
                        {items.map((c) => (
                          <li key={c.title} className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5">
                            {c.group && <p className="text-caption font-semibold uppercase tracking-wider text-[var(--text-muted)]">{c.group}</p>}
                            <p className="mt-1 font-semibold text-[var(--text-primary)]">{c.title}</p>
                            <p className="mt-2 text-meta text-[var(--text-secondary)]">{c.description}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </ArticleSection>
          )}
        </div>

        {study.architecture && (
          <div className="max-w-5xl mx-auto mt-16">
            <ArticleSection id="architecture" eyebrow="Architecture" title="How the platform fits together">
              <ArchitectureDiagram architecture={study.architecture} id="architecture-diagram" />
            </ArticleSection>
          </div>
        )}

        <div className="max-w-3xl mx-auto mt-16 space-y-16">
          {study.considerations && (
            <ArticleSection id="considerations" title="Architectural considerations">
              <div className="grid sm:grid-cols-2 gap-4">
                {study.considerations.map((c) => (
                  <div key={c.title} className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5">
                    <h3 className="font-semibold text-[var(--text-primary)]">{c.title}</h3>
                    <p className="mt-2 text-meta text-[var(--text-secondary)]">{c.description}</p>
                  </div>
                ))}
              </div>
            </ArticleSection>
          )}
          {study.intendedBenefits && (
            <ArticleSection id="benefits" title="Intended business benefits">
              <p className="mb-5 text-meta text-[var(--text-muted)]">
                What the platform is designed to achieve. These are goals, not measured results.
              </p>
              <ul className="space-y-3">
                {study.intendedBenefits.map((b) => (
                  <li key={b} className="flex gap-3 text-lg text-[var(--text-secondary)]">
                    <Sparkles aria-hidden="true" className="w-5 h-5 mt-1 shrink-0 text-[var(--text-brand)]" />
                    {b}
                  </li>
                ))}
              </ul>
            </ArticleSection>
          )}
          {study.projectStatus && (
            <ArticleSection id="status" title="Current status">
              <p className="text-lg text-[var(--text-secondary)]">{study.projectStatus}</p>
            </ArticleSection>
          )}
          {study.lessons && (
            <ArticleSection id="lessons" title="Lessons learned">
              <ul className="space-y-3">
                {study.lessons.map((l) => (
                  <li key={l} className="flex gap-3 text-lg text-[var(--text-secondary)]">
                    <span aria-hidden="true" className="mt-3 w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] shrink-0" />
                    {l}
                  </li>
                ))}
              </ul>
            </ArticleSection>
          )}

          {/* Contextual CTA */}
          <FadeUp>
            <aside
              aria-labelledby="case-study-cta"
              className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-bg-subtle)] p-6 sm:p-8"
            >
              <h2 id="case-study-cta" className="text-heading-3 font-bold text-[var(--text-primary)]">
                Planning something similar?
              </h2>
              <p className="mt-3 text-[var(--text-secondary)]">
                Tell us about the product or workflow you have in mind. We&apos;ll reply within 1–2 business days with
                initial thoughts and suggested next steps.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button asChild variant="gradient">
                  <TrackedLink
                    href={contactHref}
                    eventName="cta_click"
                    params={{ label: "Discuss Your Project", location: `${location}:cta`, destination: "/contact" }}
                  >
                    Discuss your project <ArrowRight aria-hidden="true" className="w-4 h-4" />
                  </TrackedLink>
                </Button>
                <Button asChild variant="outline">
                  <TrackedLink
                    href="/tools/ai-solution-advisor"
                    eventName="cta_click"
                    params={{ label: "AI Solution Advisor", location: `${location}:cta`, destination: "/tools/ai-solution-advisor" }}
                  >
                    Try the AI Solution Advisor
                  </TrackedLink>
                </Button>
              </div>
              <div className="mt-6 border-t border-[var(--surface-border)] pt-5">
                <ShareLinks path={path} title={study.title} location={location} />
              </div>
            </aside>
          </FadeUp>

          {services.length > 0 && (
            <ArticleSection id="services" title="Related services">
              <ul className="grid sm:grid-cols-2 gap-3">
                {services.map((s) => (
                  <li key={s.slug}>
                    <TrackedLink
                      href={serviceHref(s)}
                      eventName="service_card_click"
                      params={{ slug: s.slug, location }}
                      className="group flex items-center gap-3 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 hover:border-[var(--brand-primary)]/40 transition-colors"
                    >
                      <ServiceIconTile name={s.icon} size="sm" />
                      <span className="font-medium text-[var(--text-primary)] group-hover:text-[var(--text-brand)]">{s.title}</span>
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </ArticleSection>
          )}
        </div>
      </Section>

      {related.length > 0 && (
        <Section muted labelledBy="more-case-studies">
          <h2 id="more-case-studies" className="text-heading-2 font-bold text-[var(--text-primary)] mb-8">
            More case studies
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <CaseStudyCard key={p.slug} study={p} location={`${location}:more`} />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

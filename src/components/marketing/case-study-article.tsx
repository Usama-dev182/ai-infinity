import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { Section } from "@/components/marketing/section";
import { ServiceIconTile } from "@/components/marketing/service-icon";
import { CaseStudyCard } from "@/components/marketing/case-study-card";
import type { CapabilityStatus, CaseStudy } from "@/content/case-studies";
import { getService, serviceHref } from "@/content/services";
import { verifiedOutcomes } from "@/lib/content/case-study-model";

const STATUS_LABEL: Record<CapabilityStatus, { label: string; variant: "success" | "warning" | "secondary" | "outline" }> = {
  implemented: { label: "Implemented", variant: "success" },
  "in-progress": { label: "In progress", variant: "warning" },
  planned: { label: "Planned", variant: "secondary" },
  unconfirmed: { label: "Status to be confirmed", variant: "outline" },
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

function ArticleSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="scroll-mt-24">
      <h2 id={id} className="text-heading-2 font-bold text-[var(--text-primary)] mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}

/** Full case study layout. Used by the public page and the admin draft preview. */
export function CaseStudyArticle({ study, related }: { study: CaseStudy; related: CaseStudy[] }) {
  const outcomes = verifiedOutcomes(study);
  const services = study.services.map(getService).filter((s) => s !== undefined);
  const location = `case_study:${study.slug}`;

  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-[var(--surface-border)] bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_60%)]" />
        <div className="relative container-page py-14 lg:py-20">
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
          <div className="grid lg:grid-cols-[1.25fr_0.75fr] gap-12 items-start">
            <div>
              {study.industry && <Badge variant="gradient" className="mb-4">{study.industry}</Badge>}
              <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)]">{study.title}</h1>
              <p className="mt-6 text-lead text-[var(--text-secondary)]">{study.summary}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button asChild variant="gradient" size="lg">
                  <TrackedLink
                    href="/contact"
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
            <FadeUp delay={0.1}>
              <dl className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-6 space-y-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Client</dt>
                  <dd className="mt-1 font-medium text-[var(--text-primary)]">{study.client}</dd>
                </div>
                {study.role && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Our role</dt>
                    <dd className="mt-1 font-medium text-[var(--text-primary)]">{study.role}</dd>
                  </div>
                )}
                {study.techStack.length > 0 && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Technology</dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {study.techStack.map((t) => (
                        <Badge key={t} variant="secondary">{t}</Badge>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            </FadeUp>
          </div>
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
              <Prose paragraphs={study.vision} />
            </ArticleSection>
          )}
          {study.contributions && (
            <ArticleSection id="contribution" title="Our engineering contribution">
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
              <ul className="grid gap-4">
                {study.capabilities.map((c) => {
                  const status = STATUS_LABEL[c.status];
                  return (
                    <li key={c.title} className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-semibold text-[var(--text-primary)]">{c.title}</h3>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                      <p className="mt-2 text-meta text-[var(--text-secondary)]">{c.description}</p>
                    </li>
                  );
                })}
              </ul>
            </ArticleSection>
          )}
          {study.architecture && (
            <ArticleSection id="architecture" title="Architecture overview">
              <figure className="rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 sm:p-6">
                <ol className="space-y-3">
                  {study.architecture.layers.map((layer) => (
                    <li key={layer.name} className="grid sm:grid-cols-[10rem_1fr] gap-3 items-start">
                      <span className="text-sm font-semibold text-[var(--text-brand)] pt-1.5">{layer.name}</span>
                      <ul className="flex flex-wrap gap-2">
                        {layer.items.map((item) => (
                          <li
                            key={item}
                            className="rounded-lg border border-[var(--surface-border)] bg-[var(--surface-bg-subtle)] px-3 py-1.5 text-sm text-[var(--text-primary)]"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
                <figcaption className="mt-5 text-xs text-[var(--text-muted)]">{study.architecture.caption}</figcaption>
              </figure>
            </ArticleSection>
          )}
          {study.engineeringChallenges && (
            <ArticleSection id="engineering-challenges" title="Engineering challenges">
              <div className="grid sm:grid-cols-2 gap-4">
                {study.engineeringChallenges.map((c) => (
                  <div key={c.title} className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5">
                    <h3 className="font-semibold text-[var(--text-primary)]">{c.title}</h3>
                    <p className="mt-2 text-meta text-[var(--text-secondary)]">{c.description}</p>
                  </div>
                ))}
              </div>
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

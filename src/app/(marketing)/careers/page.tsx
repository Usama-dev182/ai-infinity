import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin, Clock, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/marketing/animation";
import { buildMetadata } from "@/lib/seo";
import { db } from "@/lib/db";

export const metadata: Metadata = buildMetadata({
  title: "Careers – AI Infinity Labs",
  description:
    "Join AI Infinity Labs and help build the future of AI-powered software. Remote-first positions for senior engineers passionate about AI.",
  keywords: ["AI company careers", "remote software engineer jobs", "AI developer job"],
  canonicalPath: "/careers",
});

export const revalidate = 60;

export default async function CareersPage() {
  const jobs = await db.jobPosting.findMany({
    where: { status: "OPEN" },
    orderBy: { createdAt: "desc" },
  }).catch(() => []);

  return (
    <>
      <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.1),transparent_60%)]" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <FadeUp>
            <Badge variant="gradient" className="mb-4">Careers</Badge>
            <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)] mb-6 max-w-2xl">
              Build the future of <span className="gradient-text">intelligent software</span>
            </h1>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl">
              We&apos;re a remote-first team that values excellence, curiosity, and getting things shipped.
              No bureaucracy — just great work with great people.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Perks */}
      <section className="border-y border-[var(--surface-border)] bg-[var(--surface-bg-subtle)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <StaggerContainer className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: "🌍", title: "Remote-first", desc: "Work from anywhere in the world." },
              { icon: "🚀", title: "Ownership culture", desc: "You own your work end-to-end." },
              { icon: "🤖", title: "AI-forward", desc: "Use and build with cutting-edge AI tools daily." },
            ].map((perk) => (
              <StaggerItem key={perk.title}>
                <div className="flex items-start gap-4 p-5">
                  <span className="text-2xl">{perk.icon}</span>
                  <div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-1">{perk.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)]">{perk.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Job listings */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">Open Positions</h2>
          </FadeUp>
          {jobs.length === 0 ? (
            <FadeUp>
              <div className="glass-card rounded-2xl border border-[var(--surface-border)] p-12 text-center">
                <p className="text-[var(--text-muted)] text-lg mb-4">No open positions right now.</p>
                <p className="text-[var(--text-secondary)] mb-6">
                  We often hire great people even when we don&apos;t have open roles. Drop us a note.
                </p>
                <Button asChild variant="gradient">
                  <Link href="/contact">Get in touch</Link>
                </Button>
              </div>
            </FadeUp>
          ) : (
            <StaggerContainer className="space-y-4">
              {jobs.map((job) => (
                <StaggerItem key={job.id}>
                  <Link href={`/careers/${job.slug}`} className="group block">
                    <div className="glass-card rounded-xl border border-[var(--surface-border)] p-6 hover:border-[var(--brand-primary)]/40 hover:shadow-lg transition-all">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-[var(--text-primary)] group-hover:gradient-text text-lg mb-2 transition-all">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap gap-3 text-sm text-[var(--text-muted)]">
                            {job.department && (
                              <span className="flex items-center gap-1.5">
                                <Building2 className="w-4 h-4" /> {job.department}
                              </span>
                            )}
                            {job.location && (
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" /> {job.location}
                              </span>
                            )}
                            {job.employmentType && (
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" /> {job.employmentType}
                              </span>
                            )}
                          </div>
                        </div>
                        <Button variant="gradient" size="sm" className="shrink-0">
                          Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </section>
    </>
  );
}

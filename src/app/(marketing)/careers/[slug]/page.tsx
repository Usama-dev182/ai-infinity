import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Clock, Building2, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeUp } from "@/components/marketing/animation";
import { buildMetadata } from "@/lib/seo";
import { db } from "@/lib/db";
import { jobPostingJsonLd } from "@/lib/seo";
import { CareerApplicationForm } from "@/components/forms/CareerApplicationForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const jobs = await db.jobPosting.findMany({
      where: { status: "OPEN" },
      select: { slug: true },
    });
    return jobs.map((j) => ({ slug: j.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await db.jobPosting.findFirst({ where: { slug, status: "OPEN" } });
  if (!job) return {};
  return buildMetadata({
    title: `${job.title} – AI Infinity Labs Careers`,
    description: job.metaDescription ?? job.description ?? "",
    canonicalPath: `/careers/${job.slug}`,
  });
}

export default async function CareerDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await db.jobPosting.findFirst({ where: { slug, status: "OPEN" } });
  if (!job) notFound();

  const jsonLd = jobPostingJsonLd(job);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative py-24 bg-gradient-to-b from-[var(--surface-bg-subtle)] to-[var(--surface-bg)]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeUp>
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-brand)] mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Careers
            </Link>
            <Badge variant="gradient" className="mb-4">We&apos;re hiring</Badge>
            <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)] mb-6">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-[var(--text-secondary)]">
              {job.department && (
                <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4" />{job.department}</span>
              )}
              {job.location && (
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{job.location}</span>
              )}
              {job.employmentType && (
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{job.employmentType}</span>
              )}
              {job.salaryMin && (
                <span className="flex items-center gap-1.5"><DollarSign className="w-4 h-4" />{job.salaryMin}{job.salaryMax ? ` – ${job.salaryMax}` : '+'} {job.currency}</span>
              )}
            </div>
          </FadeUp>
        </div>
      </section>

      <section className="section-padding">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <FadeUp>
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: job.description }}
              />
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="glass-card rounded-2xl border border-[var(--surface-border)] p-8">
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6">Apply for this role</h2>
                <CareerApplicationForm jobId={job.id} jobTitle={job.title} />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}

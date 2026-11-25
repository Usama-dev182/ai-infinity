import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { requireAdmin } from "@/lib/authz";
import { countLeadsByStage, listLeads, listLeadSources, type LeadFilters } from "@/lib/leads/repository";
import { LEAD_STAGES, optionLabel, type LeadStageValue } from "@/content/lead-options";
import { formatDate } from "@/lib/utils";
import { LeadUpdateForm } from "./lead-update-form";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ type?: string; stage?: string; source?: string; q?: string }>;
}

const stageVariant: Record<LeadStageValue, "warning" | "default" | "success" | "secondary" | "outline" | "error"> = {
  NEW: "warning",
  CONTACTED: "default",
  QUALIFIED: "default",
  DISCOVERY_SCHEDULED: "default",
  PROPOSAL_SENT: "default",
  WON: "success",
  LOST: "secondary",
};

function parseFilters(params: Awaited<Props["searchParams"]>): LeadFilters {
  return {
    type: params.type === "contact" || params.type === "quote" ? params.type : undefined,
    stage: LEAD_STAGES.some((s) => s.value === params.stage) ? (params.stage as LeadStageValue) : undefined,
    source: params.source?.slice(0, 100) || undefined,
    q: params.q?.trim().slice(0, 100) || undefined,
  };
}

function Detail({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-xs text-[var(--text-muted)]">{label}</dt>
      <dd className="text-sm text-[var(--text-primary)] break-words">{value}</dd>
    </div>
  );
}

export default async function LeadsPage({ searchParams }: Props) {
  await requireAdmin();
  const filters = parseFilters(await searchParams);
  const [{ leads, truncated }, counts, sources] = await Promise.all([
    listLeads(filters),
    countLeadsByStage(),
    listLeadSources(),
  ]);

  const selectClass =
    "h-10 rounded-lg border border-[var(--surface-border)] bg-[var(--surface-card)] px-2 text-sm text-[var(--text-primary)]";

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Leads</h1>
      <p className="text-[var(--text-secondary)] mb-6">Contact and quote enquiries as one pipeline.</p>

      <nav aria-label="Pipeline stages" className="mb-6">
        <ul className="flex flex-wrap gap-2">
          <li>
            <Link
              href="/admin/leads"
              aria-current={!filters.stage ? "page" : undefined}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] px-3 py-1.5 text-sm aria-[current=page]:border-[var(--brand-primary)] aria-[current=page]:text-[var(--text-brand)]"
            >
              All
            </Link>
          </li>
          {LEAD_STAGES.map((s) => (
            <li key={s.value}>
              <Link
                href={`/admin/leads?stage=${s.value}`}
                aria-current={filters.stage === s.value ? "page" : undefined}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] px-3 py-1.5 text-sm text-[var(--text-secondary)] aria-[current=page]:border-[var(--brand-primary)] aria-[current=page]:text-[var(--text-brand)]"
              >
                {s.label}
                <span className="rounded-full bg-[var(--surface-bg-muted)] px-1.5 text-xs">{counts[s.value] ?? 0}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <form method="get" className="mb-6 flex flex-wrap items-end gap-3 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-4">
        {filters.stage && <input type="hidden" name="stage" value={filters.stage} />}
        <div>
          <label htmlFor="lead-q" className="block text-xs font-medium text-[var(--text-muted)] mb-1">Search</label>
          <input id="lead-q" name="q" defaultValue={filters.q} placeholder="Name, email, company" className={`${selectClass} w-56`} />
        </div>
        <div>
          <label htmlFor="lead-type" className="block text-xs font-medium text-[var(--text-muted)] mb-1">Type</label>
          <select id="lead-type" name="type" defaultValue={filters.type ?? ""} className={selectClass}>
            <option value="">All types</option>
            <option value="contact">Contact</option>
            <option value="quote">Quote</option>
          </select>
        </div>
        <div>
          <label htmlFor="lead-source" className="block text-xs font-medium text-[var(--text-muted)] mb-1">Source</label>
          <select id="lead-source" name="source" defaultValue={filters.source ?? ""} className={selectClass}>
            <option value="">All sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="h-10 rounded-lg bg-[var(--brand-primary-hover)] px-4 text-sm font-semibold text-white">
          Apply
        </button>
        <Link href="/admin/leads" className="h-10 inline-flex items-center px-2 text-sm text-[var(--text-secondary)] hover:underline">
          Reset
        </Link>
      </form>

      {leads.length === 0 ? (
        <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-12 text-center text-[var(--text-secondary)]">
          No leads match these filters.
        </div>
      ) : (
        <ul className="space-y-4">
          {leads.map((lead) => (
            <li key={`${lead.type}:${lead.id}`} className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[var(--text-primary)]">
                    {lead.name}
                    {lead.company && <span className="font-normal text-[var(--text-secondary)]"> · {lead.company}</span>}
                  </p>
                  <a href={`mailto:${lead.email}`} className="text-sm text-[var(--text-brand)] hover:underline break-all">
                    {lead.email}
                  </a>
                  {lead.phone && <span className="ml-3 text-sm text-[var(--text-secondary)]">{lead.phone}</span>}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{lead.type === "quote" ? "Quote" : "Contact"}</Badge>
                  <Badge variant={stageVariant[lead.stage]}>{optionLabel("stage", lead.stage)}</Badge>
                  <time dateTime={lead.createdAt.toISOString()} className="text-xs text-[var(--text-muted)]">
                    {formatDate(lead.createdAt)}
                  </time>
                </div>
              </div>

              <p className="mt-3 text-sm font-medium text-[var(--text-secondary)]">{lead.summary}</p>
              <details className="mt-1">
                <summary className="cursor-pointer text-sm text-[var(--text-brand)]">Message</summary>
                <p className="mt-2 text-sm text-[var(--text-secondary)] whitespace-pre-wrap">{lead.message}</p>
              </details>

              <dl className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 rounded-lg bg-[var(--surface-bg-subtle)] p-3">
                <Detail label="Service" value={optionLabel("service", lead.service)} />
                <Detail label="Industry" value={optionLabel("industry", lead.industry)} />
                <Detail label="Budget" value={optionLabel("budget", lead.budget)} />
                <Detail label="Timeline" value={optionLabel("timeline", lead.timeline)} />
                <Detail label="Source" value={lead.source} />
                <Detail label="Medium / campaign" value={[lead.utmMedium, lead.utmCampaign].filter(Boolean).join(" / ") || null} />
                <Detail label="Landing page" value={lead.landingPage} />
                <Detail label="Entry point" value={optionLabel("entryPoint", lead.entryPoint)} />
              </dl>

              <div className="mt-4 border-t border-[var(--surface-border)] pt-4">
                <LeadUpdateForm id={lead.id} type={lead.type} stage={lead.stage} adminNotes={lead.adminNotes} />
              </div>
            </li>
          ))}
        </ul>
      )}
      {truncated && (
        <p className="mt-4 text-sm text-[var(--text-secondary)]">Showing the 100 most recent matches. Narrow the filters to see older leads.</p>
      )}
    </div>
  );
}

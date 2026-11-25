import type { Metadata } from "next";
import Link from "next/link";
import { CopyLinkButton } from "@/components/marketing/copy-link-button";
import { getPublishedCaseStudies } from "@/lib/content/case-studies";
import { campaignKey, campaignUrl, type CampaignParams } from "@/lib/campaign";
import { SERVICES, serviceHref } from "@/content/services";
import { INDUSTRIES } from "@/content/industries";
import { SITE } from "@/content/site";

export const metadata: Metadata = { title: "Campaign links" };
export const dynamic = "force-dynamic";

const CHANNELS: { source: string; label: string; medium: CampaignParams["medium"] }[] = [
  { source: "linkedin", label: "LinkedIn", medium: "social" },
  { source: "x", label: "X", medium: "social" },
  { source: "youtube", label: "YouTube", medium: "video" },
  { source: "upwork", label: "Upwork", medium: "social" },
];

interface Entry {
  label: string;
  path: string;
}

export default async function CampaignLinksPage() {
  const caseStudies = await getPublishedCaseStudies();
  const groups: { title: string; entries: Entry[] }[] = [
    { title: "Case studies", entries: caseStudies.map((c) => ({ label: c.title, path: `/case-studies/${c.slug}` })) },
    { title: "Services", entries: SERVICES.map((s) => ({ label: s.title, path: serviceHref(s) })) },
    {
      title: "Industries & tools",
      entries: [
        ...INDUSTRIES.filter((i) => i.hasDetailPage).map((i) => ({ label: i.name, path: `/industries/${i.slug}` })),
        { label: "AI Solution Advisor", path: "/tools/ai-solution-advisor" },
        { label: "AI ROI Calculator", path: "/tools/ai-roi-calculator" },
        { label: "Homepage", path: "/" },
      ],
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Campaign links</h1>
      <div className="max-w-3xl space-y-2 text-[var(--text-secondary)] mb-8">
        <p>
          Use these links in your own posts so every visit and lead is attributed to the channel and page. Each link
          carries <code className="text-sm">utm_source</code> (the channel), <code className="text-sm">utm_medium</code>{" "}
          and <code className="text-sm">utm_campaign</code> (the page).
        </p>
        <p className="text-sm">
          Results show up in{" "}
          <Link href="/admin/leads" className="text-[var(--text-brand)] underline underline-offset-2">
            Leads
          </Link>{" "}
          (Source filter and the campaign on each lead) and in Google Analytics under Traffic acquisition → Session
          campaign. Visitors who use the share buttons on the site are tagged with <code className="text-sm">utm_medium=share</code>.
        </p>
      </div>

      <div className="space-y-10">
        {groups.map((group) => (
          <section key={group.title} aria-labelledby={`group-${campaignKey(group.title)}`}>
            <h2 id={`group-${campaignKey(group.title)}`} className="text-lg font-semibold text-[var(--text-primary)] mb-3">
              {group.title}
            </h2>
            <ul className="divide-y divide-[var(--surface-border)] rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)]">
              {group.entries.map((entry) => {
                const campaign = campaignKey(entry.path);
                return (
                  <li key={entry.path} className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <p className="font-medium text-[var(--text-primary)]">{entry.label}</p>
                      <p className="text-xs text-[var(--text-muted)] break-all">
                        {entry.path} · campaign <code>{campaign}</code>
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {CHANNELS.map((ch) => (
                        <CopyLinkButton
                          key={ch.source}
                          label={ch.label}
                          url={campaignUrl(entry.path, { source: ch.source, medium: ch.medium, campaign }, SITE.url)}
                        />
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

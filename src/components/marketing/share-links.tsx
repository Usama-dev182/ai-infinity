import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { CopyLinkButton } from "@/components/marketing/copy-link-button";
import { campaignKey, campaignUrl, shareIntentUrl, type ShareNetwork } from "@/lib/campaign";
import { SITE } from "@/content/site";

const NETWORKS: { network: ShareNetwork; label: string }[] = [
  { network: "linkedin", label: "LinkedIn" },
  { network: "x", label: "X" },
];

const linkClass =
  "inline-flex min-h-10 items-center rounded-lg border border-[var(--surface-border)] bg-[var(--surface-card)] px-3.5 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--brand-primary)]/50 hover:text-[var(--text-brand)] transition-colors";

/**
 * Share buttons for a page. Every shared URL carries UTM parameters
 * (utm_medium=share, utm_source=<network>, utm_campaign=<page>), so leads that arrive
 * through a share are attributed in the admin lead dashboard.
 */
export function ShareLinks({ path, title, location }: { path: string; title: string; location: string }) {
  const campaign = campaignKey(path);
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-[var(--text-secondary)]">Share:</span>
      {NETWORKS.map(({ network, label }) => {
        const pageUrl = campaignUrl(path, { source: network, medium: "share", campaign }, SITE.url);
        return (
          <TrackedAnchor
            key={network}
            href={shareIntentUrl(network, pageUrl, title)}
            target="_blank"
            rel="noopener noreferrer"
            eventName="share_click"
            params={{ network, location, campaign }}
            className={linkClass}
          >
            {label}
            <span className="sr-only"> (opens in a new tab)</span>
          </TrackedAnchor>
        );
      })}
      <CopyLinkButton
        url={campaignUrl(path, { source: "copy-link", medium: "share", campaign }, SITE.url)}
        eventParams={{ location, campaign }}
      />
    </div>
  );
}

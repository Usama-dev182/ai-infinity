import { ArrowDown, Database, Layers, MonitorSmartphone, Sparkles, Users, type LucideIcon } from "lucide-react";
import type { CaseStudyArchitecture } from "@/content/case-studies";

const LAYER_ICONS: LucideIcon[] = [MonitorSmartphone, Layers, Sparkles, Database];
// Brand indigo, cyan and purple, cycled per layer.
const LAYER_ACCENTS = ["var(--brand-primary)", "var(--brand-secondary)", "var(--brand-accent)", "var(--brand-primary)"];

function Connector() {
  return (
    <div aria-hidden="true" className="flex justify-center py-1.5 text-[var(--text-muted)]">
      <ArrowDown className="w-4 h-4" />
    </div>
  );
}

/**
 * Illustrative, public-safe architecture diagram built from HTML (real text, theme-aware,
 * reflows on small screens). Layers stack top to bottom in the order a request travels.
 */
export function ArchitectureDiagram({ architecture, id }: { architecture: CaseStudyArchitecture; id: string }) {
  const { actors, layers, flows, caption } = architecture;
  return (
    <figure aria-labelledby={`${id}-caption`} className="not-prose">
      <div className="relative rounded-2xl border border-[var(--surface-border)] bg-[var(--surface-bg-subtle)] p-4 sm:p-6">
        <span className="absolute right-4 top-4 rounded-full border border-[var(--surface-border)] bg-[var(--surface-card)] px-2.5 py-0.5 text-caption font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Illustrative
        </span>

        {actors && actors.length > 0 && (
          <>
            <ul className="flex flex-wrap justify-center gap-2 pt-8 sm:pt-0" aria-label="Users">
              {actors.map((actor) => (
                <li
                  key={actor}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--surface-border)] bg-[var(--surface-card)] px-3.5 py-1.5 text-sm font-medium text-[var(--text-primary)]"
                >
                  <Users aria-hidden="true" className="w-4 h-4 text-[var(--text-brand)]" />
                  {actor}
                </li>
              ))}
            </ul>
            <Connector />
          </>
        )}

        <ol className={actors?.length ? "" : "pt-8 sm:pt-0"} aria-label="Architecture layers">
          {layers.map((layer, i) => {
            const Icon = LAYER_ICONS[i % LAYER_ICONS.length];
            const accent = LAYER_ACCENTS[i % LAYER_ACCENTS.length];
            return (
              <li key={layer.name}>
                {i > 0 && <Connector />}
                <div
                  className="grid gap-3 rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-4 sm:grid-cols-[13rem_1fr] sm:items-center border-l-4"
                  style={{ borderLeftColor: accent }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white"
                      style={{ background: accent }}
                    >
                      <Icon className="w-4.5 h-4.5" />
                    </span>
                    <span>
                      <span className="block font-semibold text-[var(--text-primary)]">{layer.name}</span>
                      {layer.description && <span className="block text-caption text-[var(--text-muted)]">{layer.description}</span>}
                    </span>
                  </div>
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
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {flows && flows.length > 0 && (
        <ol className="mt-4 grid gap-3 md:grid-cols-3" aria-label="Key flows">
          {flows.map((flow, i) => (
            <li key={flow.title} className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-4">
              <p className="flex items-center gap-2 font-semibold text-[var(--text-primary)]">
                <span
                  aria-hidden="true"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-cta-gradient text-xs font-bold text-white"
                >
                  {i + 1}
                </span>
                {flow.title}
              </p>
              <p className="mt-2 text-meta text-[var(--text-secondary)]">{flow.description}</p>
            </li>
          ))}
        </ol>
      )}

      <figcaption id={`${id}-caption`} className="mt-4 text-caption text-[var(--text-muted)]">
        {caption}
      </figcaption>
    </figure>
  );
}

import { Code2, PlayCircle, ExternalLink, Mail, MessageCircle, MapPin, Phone } from "lucide-react";
import { TrackedAnchor } from "@/components/analytics/tracked-anchor";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { SITE } from "@/content/site";
import { SERVICES, serviceHref } from "@/content/services";
import { FOOTER_LINKS } from "@/content/navigation";
import { BrandMark } from "@/components/marketing/brand-logo";
import { Separator } from "@/components/ui/separator";

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

const socialLinks = [
  { icon: ExternalLink, href: SITE.linkedin, label: "LinkedIn" },
  { icon: Code2, href: SITE.github, label: "GitHub" },
  { icon: PlayCircle, href: SITE.youtube, label: "YouTube" },
  { icon: Mail, href: `mailto:${SITE.email}`, label: "Email" },
  { icon: MessageCircle, href: SITE.whatsapp, label: "WhatsApp" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--surface-bg-subtle)] border-t border-[var(--surface-border)]">
      <div className="container-page py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <TrackedLink
              href="/"
              className="flex items-center gap-2 mb-4 group w-fit"
              eventName="nav_click"
              params={{ label: SITE.name, location: "footer_logo", destination: "/" }}
            >
              <BrandMark />
              <span className="font-bold text-lg text-[var(--text-primary)]">{SITE.name}</span>
            </TrackedLink>
            <p className="text-[var(--text-secondary)] text-sm max-w-xs leading-relaxed mb-6">
              {SITE.positioning}. {SITE.description}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <TrackedAnchor
                  key={label}
                  href={href}
                  eventName="social_click"
                  params={{ label, location: "footer_social", destination: href }}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-lg border border-[var(--surface-border)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-brand)] hover:border-[var(--brand-primary)] transition-colors"
                >
                  <Icon aria-hidden="true" className="w-4 h-4" />
                </TrackedAnchor>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h2 className="font-semibold text-[var(--text-primary)] text-sm mb-4 uppercase tracking-wider">
              Services
            </h2>
            <ul className="space-y-3">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <TrackedLink
                    href={serviceHref(s)}
                    eventName="service_card_click"
                    params={{ slug: s.slug, location: "footer_services" }}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-colors"
                  >
                    {s.title}
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="font-semibold text-[var(--text-primary)] text-sm mb-4 uppercase tracking-wider">
              Company
            </h2>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((item) => (
                <li key={item.href}>
                  <TrackedLink
                    href={item.href}
                    eventName="nav_click"
                    params={{ label: item.label, location: "footer_company", destination: item.href }}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-colors"
                  >
                    {item.label}
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="font-semibold text-[var(--text-primary)] text-sm mb-4 uppercase tracking-wider">
              Contact
            </h2>
            <ul className="space-y-4">
              <li>
                <TrackedAnchor
                  href={`mailto:${SITE.email}`}
                  eventName="social_click"
                  params={{ label: "Email", location: "footer_contact", destination: `mailto:${SITE.email}` }}
                  className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-colors"
                >
                  <Mail className="w-4 h-4 mt-0.5 shrink-0 text-[var(--text-brand)]" />
                  <span className="break-all">{SITE.email}</span>
                </TrackedAnchor>
              </li>
              <li>
                <TrackedAnchor
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  eventName="social_click"
                  params={{ label: "Phone", location: "footer_contact", destination: SITE.phone }}
                  className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-[var(--text-brand)]" />
                  {SITE.phone}
                </TrackedAnchor>
              </li>
              <li>
                <TrackedAnchor
                  href={SITE.whatsapp}
                  eventName="social_click"
                  params={{ label: "WhatsApp", location: "footer_contact", destination: SITE.whatsapp }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0 text-[var(--text-brand)]" />
                  WhatsApp Us
                </TrackedAnchor>
              </li>
              <li>
                <TrackedAnchor
                  href={SITE.linkedin}
                  eventName="social_click"
                  params={{ label: "LinkedIn", location: "footer_contact", destination: SITE.linkedin }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-colors"
                >
                  <ExternalLink className="w-4 h-4 shrink-0 text-[var(--text-brand)]" />
                  LinkedIn
                </TrackedAnchor>
              </li>
              <li>
                <TrackedLink
                  href="/contact"
                  eventName="nav_click"
                  params={{ label: "Contact Page", location: "footer_contact", destination: "/contact" }}
                  className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-colors"
                >
                  <MapPin className="w-4 h-4 shrink-0 text-[var(--text-brand)]" />
                  Get in Touch
                </TrackedLink>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {legalLinks.map((l) => (
              <TrackedLink
                key={l.href}
                href={l.href}
                eventName="nav_click"
                params={{ label: l.label, location: "footer_legal", destination: l.href }}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
              >
                {l.label}
              </TrackedLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

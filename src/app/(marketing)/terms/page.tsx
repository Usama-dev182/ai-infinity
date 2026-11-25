import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "Terms of service for the AI Infinity Labs website and services: use of the site, engagements, intellectual property and liability.",
  canonicalPath: "/terms",
});

export default function TermsPage() {
  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)] mb-4">Terms of Service</h1>
        <p className="text-sm text-[var(--text-muted)] mb-10">Last updated: January 2025</p>
        <div className="prose-content space-y-8 text-[var(--text-secondary)]">
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">1. Acceptance</h2>
            <p>By accessing or using this website you agree to be bound by these Terms of Service. If you do not agree, please do not use this site.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">2. Services</h2>
            <p>AI Infinity Labs provides custom software development services. Specific terms for each client engagement are governed by a separate written agreement between AI Infinity Labs and the client.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">3. Intellectual property</h2>
            <p>All content on this website — including text, graphics, and code — is the property of AI Infinity Labs unless otherwise stated. You may not reproduce or redistribute it without written permission.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">4. Limitation of liability</h2>
            <p>This website is provided &quot;as is&quot; without warranties of any kind. AI Infinity Labs is not liable for any damages arising from use of this site.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">5. Contact</h2>
            <p>Questions about these terms? Email <a href="mailto:infousamaali1@gmail.com" className="text-[var(--text-brand)] hover:underline">infousamaali1@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </section>
  );
}

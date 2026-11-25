import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy – AI Infinity Labs",
  description: "Privacy Policy for AI Infinity Labs. How we collect, use, and protect your data.",
  canonicalPath: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)] mb-4">Privacy Policy</h1>
        <p className="text-sm text-[var(--text-muted)] mb-10">Last updated: January 2025</p>
        <div className="prose-content space-y-8 text-[var(--text-secondary)]">
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">1. Data we collect</h2>
            <p>When you submit a contact form, quote request, or job application on this website, we collect the information you provide — such as your name, email address, company name, and message content. We only collect what is necessary to respond to you.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">2. How we use your data</h2>
            <p>We use the information solely to respond to your enquiry, evaluate job applications, or send a project proposal. We do not sell your data to third parties.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">3. Data retention</h2>
            <p>We retain form submissions for up to 24 months unless you request deletion. You can email us at infousamaali1@gmail.com to have your data removed.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">4. Cookies</h2>
            <p>This website uses only functional cookies necessary for authentication and session management. We do not use tracking or advertising cookies.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">5. Contact</h2>
            <p>For any privacy-related queries, email us at <a href="mailto:infousamaali1@gmail.com" className="text-[var(--text-brand)] hover:underline">infousamaali1@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </section>
  );
}

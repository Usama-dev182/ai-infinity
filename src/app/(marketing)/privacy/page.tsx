import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy for AI Infinity Labs. How we collect, use, and protect your data.",
  canonicalPath: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-heading-1 font-extrabold text-[var(--text-primary)] mb-4">Privacy Policy</h1>
        <p className="text-sm text-[var(--text-muted)] mb-10">Last updated: November 2026</p>
        <div className="prose-content space-y-8 text-[var(--text-secondary)]">
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">1. Data we collect</h2>
            <p>When you submit a contact form, quote request, or job application on this website, we collect the information you provide — such as your name, email address, company name, and message content. Optional fields (industry, budget range, timeline) help us prepare a useful reply. We only collect what is necessary to respond to you.</p>
            <p>When you submit a form, we also record how you found us: campaign parameters in the link you followed (for example <code>utm_source</code>), the first page you visited, and the referring website (without its query string). This information is kept in your browser&apos;s session storage only for the duration of your visit and is sent to us only if you submit a form.</p>
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
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">4. Cookies and analytics</h2>
            <p>We use Google Analytics to understand how the website is used (for example, which pages are visited and which buttons are clicked). Google Analytics sets cookies for this purpose. We do not send the content of forms, AI Solution Advisor conversations, or calculator values to analytics. We do not use advertising cookies.</p>
            <p>The admin area uses functional cookies required for authentication.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">5. AI Solution Advisor</h2>
            <p>Messages you type into the AI Solution Advisor are sent to our AI provider to generate a reply. We do not store these conversations. Email addresses and phone or card numbers are removed automatically before messages are sent, but please do not share personal or confidential information.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">6. Contact</h2>
            <p>For any privacy-related queries, email us at <a href="mailto:infousamaali1@gmail.com" className="text-[var(--text-brand)] hover:underline">infousamaali1@gmail.com</a>.</p>
          </section>
        </div>
      </div>
    </section>
  );
}

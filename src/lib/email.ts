import "server-only";
import { Resend } from "resend";
import { optionLabel } from "@/content/lead-options";
import { sourceLabel, type Attribution } from "@/lib/leads/attribution";
import { escapeHtml } from "@/lib/escape-html";

const FROM = process.env.EMAIL_FROM ?? "infousamaali1@gmail.com";
const TO = process.env.EMAIL_TO ?? "infousamaali1@gmail.com";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aiinfinitylabs.com";

let client: Resend | null | undefined;

/** Created lazily so a missing key disables email instead of crashing the route at import. */
function getClient(): Resend | null {
  if (client !== undefined) return client;
  const key = process.env.RESEND_API_KEY;
  client = key ? new Resend(key) : null;
  if (!client) console.warn("[email] RESEND_API_KEY is not set; notifications are disabled.");
  return client;
}

const multiline = (value: string) => escapeHtml(value).replace(/\r?\n/g, "<br>");

/** Single-line header-safe text (subjects): strips newlines and trims length. */
const headerText = (value: string, max = 120) => value.replace(/[\r\n]+/g, " ").trim().slice(0, max);

function row(label: string, value?: string | null) {
  return value ? `<tr><td style="padding:4px 12px 4px 0;color:#475569"><strong>${escapeHtml(label)}</strong></td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>` : "";
}

async function send(payload: Parameters<Resend["emails"]["send"]>[0]): Promise<boolean> {
  const resend = getClient();
  if (!resend) return false;
  try {
    const { error } = await resend.emails.send(payload);
    if (error) {
      console.error("[email] send failed:", error.name ?? "error");
      return false;
    }
    return true;
  } catch (err) {
    console.error("[email] send threw:", err instanceof Error ? err.message : "unknown");
    return false;
  }
}

export interface LeadNotification {
  kind: "contact" | "quote";
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject?: string;
  message: string;
  service?: string;
  industry?: string;
  budget?: string;
  timeline?: string;
  entryPoint?: string;
  attribution?: Attribution;
  /** False when the database write failed — the email is then the only record. */
  persisted: boolean;
}

export async function sendLeadNotification(lead: LeadNotification): Promise<boolean> {
  const a = lead.attribution;
  const serviceLabel = optionLabel("service", lead.service);
  const subjectLine = headerText(
    `[${lead.kind === "quote" ? "Quote" : "Lead"}] ${serviceLabel ?? lead.subject ?? "New enquiry"} – ${lead.name}`
  );
  const html = `
    ${lead.persisted ? "" : `<p style="color:#b91c1c"><strong>Warning:</strong> this lead could not be saved to the database. This email is the only copy.</p>`}
    <h2>New ${lead.kind === "quote" ? "quote request" : "enquiry"} from ${escapeHtml(lead.name)}</h2>
    <table>
      ${row("Email", lead.email)}
      ${row("Company", lead.company)}
      ${row("Phone", lead.phone)}
      ${row("Subject", lead.subject)}
      ${row("Service", serviceLabel)}
      ${row("Industry", optionLabel("industry", lead.industry))}
      ${row("Budget", optionLabel("budget", lead.budget))}
      ${row("Timeline", optionLabel("timeline", lead.timeline))}
      ${row("Entry point", optionLabel("entryPoint", lead.entryPoint))}
      ${row("Source", a ? sourceLabel(a) : "direct")}
      ${row("Medium", a?.utmMedium)}
      ${row("Campaign", a?.utmCampaign)}
      ${row("Landing page", a?.landingPage)}
    </table>
    <p><strong>Message:</strong></p>
    <p>${multiline(lead.message)}</p>
    ${lead.persisted ? `<p><a href="${SITE_URL}/admin/leads">Open in the leads dashboard</a></p>` : ""}
  `;
  return send({ from: FROM, to: TO, replyTo: lead.email, subject: subjectLine, html });
}

export async function sendLeadConfirmation(email: string, name: string): Promise<boolean> {
  return send({
    from: FROM,
    to: email,
    subject: "We received your message – AI Infinity Labs",
    html: `
      <h2>Hi ${escapeHtml(name)}, thanks for reaching out!</h2>
      <p>We've received your message and will get back to you within 1–2 business days.</p>
      <p>In the meantime, you can explore our <a href="${SITE_URL}/case-studies">case studies</a> or try the
      <a href="${SITE_URL}/tools/ai-solution-advisor">AI Solution Advisor</a>.</p>
      <p>– The AI Infinity Labs team</p>
    `,
  });
}

export async function sendApplicationNotification(data: { name: string; email: string; jobTitle?: string }): Promise<boolean> {
  return send({
    from: FROM,
    to: TO,
    subject: headerText(`[Application] ${data.name}${data.jobTitle ? ` applied for ${data.jobTitle}` : " submitted an application"}`),
    html: `
      <h2>New job application</h2>
      <table>
        ${row("Candidate", data.name)}
        ${row("Email", data.email)}
        ${row("Job", data.jobTitle)}
      </table>
    `,
  });
}

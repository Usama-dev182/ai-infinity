import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM ?? "infousamaali1@gmail.com";
const TO = process.env.EMAIL_TO ?? "infousamaali1@gmail.com";

export async function sendContactNotification(data: {
  name: string;
  email: string;
  company?: string;
  subject?: string;
  message: string;
}) {
  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: data.email,
      subject: `[Contact] ${data.subject ?? "New message"} – from ${data.name}`,
      html: `
        <h2>New contact message from ${data.name}</h2>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
        ${data.subject ? `<p><strong>Subject:</strong> ${data.subject}</p>` : ""}
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
    });
  } catch {
    // email failure is non-fatal; lead is already saved to db
  }
}

export async function sendContactConfirmation(email: string, name: string) {
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "We received your message – AI Infinity Labs",
      html: `
        <h2>Hi ${name}, thanks for reaching out!</h2>
        <p>We've received your message and will get back to you within 1–2 business days.</p>
        <p>In the meantime, feel free to explore our services or case studies on <a href="${process.env.NEXT_PUBLIC_SITE_URL}">aiinfinitylabs.com</a>.</p>
        <p>– The AI Infinity Labs team</p>
      `,
    });
  } catch {
    // non-fatal
  }
}

export async function sendQuoteNotification(data: {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  description: string;
}) {
  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: data.email,
      subject: `[Quote] ${data.projectType ?? "Project inquiry"} – ${data.name}`,
      html: `
        <h2>New quote request from ${data.name}</h2>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ""}
        ${data.projectType ? `<p><strong>Project type:</strong> ${data.projectType}</p>` : ""}
        ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ""}
        <p><strong>Description:</strong></p>
        <p>${data.description.replace(/\n/g, "<br>")}</p>
      `,
    });
  } catch {
    // non-fatal
  }
}

export async function sendApplicationNotification(data: {
  name: string;
  email: string;
  jobTitle?: string;
}) {
  try {
    await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `[Application] ${data.name}${data.jobTitle ? ` applied for ${data.jobTitle}` : " submitted an application"}`,
      html: `
        <h2>New job application</h2>
        <p><strong>Candidate:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.jobTitle ? `<p><strong>Job:</strong> ${data.jobTitle}</p>` : ""}
      `,
    });
  } catch {
    // non-fatal
  }
}

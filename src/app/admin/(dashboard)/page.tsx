import Link from "next/link";
import { FileText, Briefcase, Users, Inbox, UserCheck } from "lucide-react";
import { db } from "@/lib/db";
import { getSessionUser, isAdmin } from "@/lib/authz";

interface Props {
  searchParams: Promise<{ denied?: string }>;
}

export default async function AdminDashboard({ searchParams }: Props) {
  const { denied } = await searchParams;
  const admin = isAdmin(await getSessionUser());

  const [posts, caseStudies, jobs, contacts, quotes, applications] = await Promise.all([
    db.blogPost.count(),
    db.caseStudy.count(),
    db.jobPosting.count({ where: { status: "OPEN" } }),
    admin ? db.contactSubmission.count({ where: { status: "NEW" } }) : 0,
    admin ? db.quoteRequest.count({ where: { status: "NEW" } }) : 0,
    admin ? db.careerApplication.count({ where: { status: "NEW" } }) : 0,
  ]);

  const stats = [
    { label: "Blog posts", value: posts, icon: FileText, href: "/admin/posts", show: true },
    { label: "Case studies (database)", value: caseStudies, icon: Briefcase, href: "/admin/case-studies", show: true },
    { label: "Open jobs", value: jobs, icon: Users, href: "/admin/jobs", show: true },
    { label: "New contact messages", value: contacts, icon: Inbox, href: "/admin/submissions/contact", show: admin },
    { label: "New quote requests", value: quotes, icon: Inbox, href: "/admin/submissions/quotes", show: admin },
    { label: "New applications", value: applications, icon: UserCheck, href: "/admin/submissions/careers", show: admin },
  ].filter((s) => s.show);

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Dashboard</h1>
      <p className="text-[var(--text-secondary)] mb-8">Overview of site content and incoming enquiries.</p>

      {denied && (
        <p role="alert" className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-[var(--color-warning-text)]">
          That area requires an administrator account.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link
            key={label}
            href={href}
            className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 hover:border-[var(--brand-primary)]/40 hover:shadow-md transition-all"
          >
            <Icon aria-hidden="true" className="w-5 h-5 text-[var(--text-brand)] mb-3" />
            <div className="text-3xl font-extrabold text-[var(--text-primary)] mb-1">{value}</div>
            <div className="text-sm text-[var(--text-secondary)]">{label}</div>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--surface-border)] bg-[var(--surface-card)] p-5 max-w-xl">
        <h2 className="font-semibold text-[var(--text-primary)] mb-4">Quick actions</h2>
        <ul className="space-y-3">
          {[
            { label: "New blog post", href: "/admin/posts/new" },
            { label: "Review case studies", href: "/admin/case-studies" },
          ].map((a) => (
            <li key={a.href}>
              <Link
                href={a.href}
                className="flex items-center justify-between p-3 rounded-lg border border-[var(--surface-border)] hover:bg-[var(--surface-bg-subtle)] transition-colors"
              >
                <span className="text-sm text-[var(--text-secondary)]">{a.label}</span>
                <span aria-hidden="true" className="text-[var(--text-brand)] text-sm">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

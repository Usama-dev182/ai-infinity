import { db } from "@/lib/db";
import { FileText, Briefcase, Users, Mail, MessageSquare, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [posts, caseStudies, jobs, contacts, quotes, applications] = await Promise.all([
    db.blogPost.count(),
    db.caseStudy.count(),
    db.jobPosting.count({ where: { status: "OPEN" } }),
    db.contactSubmission.count({ where: { status: "NEW" } }),
    db.quoteRequest.count({ where: { status: "NEW" } }),
    db.careerApplication.count({ where: { status: "NEW" } }),
  ]);

  const stats = [
    { label: "Blog Posts", value: posts, icon: FileText, href: "/admin/posts", color: "text-blue-500" },
    { label: "Case Studies", value: caseStudies, icon: Briefcase, href: "/admin/case-studies", color: "text-purple-500" },
    { label: "Open Jobs", value: jobs, icon: Users, href: "/admin/jobs", color: "text-green-500" },
    { label: "New Contacts", value: contacts, icon: Mail, href: "/admin/submissions/contact", color: "text-orange-500" },
    { label: "New Quotes", value: quotes, icon: MessageSquare, href: "/admin/submissions/quotes", color: "text-pink-500" },
    { label: "New Applications", value: applications, icon: TrendingUp, href: "/admin/submissions/careers", color: "text-indigo-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Dashboard</h1>
      <p className="text-[var(--text-muted)] mb-8">Welcome back. Here&apos;s an overview of your site.</p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, href, color }) => (
          <Link key={label} href={href} className="group">
            <div className="glass-card rounded-xl border border-[var(--surface-border)] p-5 hover:border-[var(--brand-primary)]/40 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <Icon className={`w-5 h-5 ${color}`} />
                {value > 0 && (
                  <span className="text-xs bg-[var(--brand-primary)]/10 text-[var(--text-brand)] rounded-full px-2 py-0.5 font-semibold">
                    {value} new
                  </span>
                )}
              </div>
              <div className="text-3xl font-extrabold text-[var(--text-primary)] mb-1">{value}</div>
              <div className="text-sm text-[var(--text-muted)]">{label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass-card rounded-xl border border-[var(--surface-border)] p-5">
          <h2 className="font-semibold text-[var(--text-primary)] mb-4">Quick actions</h2>
          <div className="space-y-3">
            {[
              { label: "New blog post", href: "/admin/posts/new" },
              { label: "New job posting", href: "/admin/jobs/new" },
              { label: "New case study", href: "/admin/case-studies/new" },
            ].map((a) => (
              <Link
                key={a.href}
                href={a.href}
                className="flex items-center justify-between p-3 rounded-lg border border-[var(--surface-border)] hover:bg-[var(--surface-bg-subtle)] transition-colors"
              >
                <span className="text-sm text-[var(--text-secondary)]">{a.label}</span>
                <span className="text-[var(--text-brand)] text-sm">→</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

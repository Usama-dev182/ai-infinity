"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });
    setLoading(false);
    if (result?.error) {
      setError("Invalid email or password.");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--surface-bg)] px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-cta-gradient flex items-center justify-center mx-auto mb-4">
            <Bot className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Admin Login</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">AI Infinity Labs</p>
        </div>
        <div className="glass-card rounded-2xl border border-[var(--surface-border)] p-8">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="space-y-1.5">
              <Label htmlFor="email" required>Email</Label>
              <Input id="email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password" required>Password</Label>
              <Input id="password" name="password" type="password" autoComplete="current-password" required />
            </div>
            {error && (
              <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 rounded-lg px-3 py-2">{error}</p>
            )}
            <Button type="submit" variant="gradient" className="w-full" loading={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

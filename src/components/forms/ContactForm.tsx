"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { contactSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import { trackContactFormSubmit } from "@/lib/analytics";

type FormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { _honey: "", _ts: Date.now() },
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSuccess(true);
      trackContactFormSubmit();
      reset();
    }
  };

  if (success) {
    return (
      <div className="glass-card rounded-xl border border-[var(--surface-border)] p-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Message sent!</h3>
        <p className="text-[var(--text-secondary)]">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot – hidden from real users */}
      <input type="text" tabIndex={-1} aria-hidden="true" className="hidden" {...register("_honey")} />
      <input type="hidden" {...register("_ts", { valueAsNumber: true })} />

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="name" required>Full name</Label>
          <Input
            id="name"
            placeholder="Jane Smith"
            error={errors.name?.message}
            {...register("name")}
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" required>Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="jane@company.com"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="company">Company</Label>
        <Input id="company" placeholder="Acme Inc." {...register("company")} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="subject" required>Subject</Label>
        <Input
          id="subject"
          placeholder="Project inquiry"
          error={errors.subject?.message}
          {...register("subject")}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message" required>Message</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Tell us about your project..."
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      <Button type="submit" variant="gradient" size="lg" className="w-full" loading={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

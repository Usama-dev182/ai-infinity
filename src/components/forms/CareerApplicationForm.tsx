"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { careerApplicationSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

type FormData = z.infer<typeof careerApplicationSchema>;

interface Props {
  jobId?: string;
  jobTitle?: string;
}

export function CareerApplicationForm({ jobId, jobTitle }: Props) {
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(careerApplicationSchema),
    defaultValues: {
      jobPostingId: jobId,
      _honey: "",
      _ts: Date.now(),
    },
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch("/api/careers/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      setSuccess(true);
      reset();
    }
  };

  if (success) {
    return (
      <div className="glass-card rounded-xl border border-[var(--surface-border)] p-8 text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Application submitted!</h3>
        <p className="text-[var(--text-secondary)]">
          Thanks for applying{jobTitle ? ` for ${jobTitle}` : ""}. We&apos;ll review your application and reach out within a few days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <input type="text" tabIndex={-1} aria-hidden="true" className="hidden" {...register("_honey")} />
      <input type="hidden" {...register("_ts", { valueAsNumber: true })} />
      <input type="hidden" {...register("jobPostingId")} />

      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="name" required>Full name</Label>
          <Input id="name" placeholder="Jane Smith" error={errors.name?.message} {...register("name")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email" required>Email</Label>
          <Input id="email" type="email" placeholder="jane@email.com" error={errors.email?.message} {...register("email")} />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" placeholder="+1 234 567 8900" {...register("phone")} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="linkedinUrl">LinkedIn profile URL</Label>
        <Input id="linkedinUrl" type="url" placeholder="https://linkedin.com/in/..." {...register("linkedinUrl")} />
        {errors.linkedinUrl && <p className="text-xs text-red-500">{errors.linkedinUrl.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="portfolioUrl">Portfolio / GitHub URL</Label>
        <Input id="portfolioUrl" type="url" placeholder="https://github.com/..." {...register("portfolioUrl")} />
        {errors.portfolioUrl && <p className="text-xs text-red-500">{errors.portfolioUrl.message}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="coverLetter" required>Cover letter</Label>
        <Textarea
          id="coverLetter"
          rows={6}
          placeholder="Tell us why you want to work with us and what makes you a great fit..."
          error={errors.coverLetter?.message}
          {...register("coverLetter")}
        />
      </div>

      <Button type="submit" variant="gradient" size="lg" className="w-full" loading={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Submit Application"}
      </Button>
    </form>
  );
}

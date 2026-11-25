"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { careerApplicationSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormErrorAlert, FormSuccess, HoneypotField } from "@/components/forms/form-feedback";
import { useFormSubmit, useRenderTimestamp } from "@/components/forms/use-form-submit";

type FormData = z.infer<typeof careerApplicationSchema>;

interface Props {
  jobId?: string;
  jobTitle?: string;
}

export function CareerApplicationForm({ jobId, jobTitle }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(careerApplicationSchema),
    defaultValues: { jobPostingId: jobId, _honey: "" },
  });
  useRenderTimestamp(setValue);
  const { status, errorMessage, submit } = useFormSubmit<FormData>("/api/careers/apply", setError);

  const onSubmit = async (data: FormData) => {
    const result = await submit(data);
    if (result.ok) reset();
  };

  if (status === "success") {
    return (
      <FormSuccess title="Application submitted">
        <p>
          Thanks for applying{jobTitle ? ` for ${jobTitle}` : ""}. We&apos;ll review your application and reach
          out within a few days.
        </p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <HoneypotField {...register("_honey")} />
      <input type="hidden" {...register("_ts", { valueAsNumber: true })} />
      <input type="hidden" {...register("jobPostingId")} />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name" required>Full name</Label>
          <Input id="name" autoComplete="name" error={errors.name?.message} {...register("name")} />
        </div>
        <div>
          <Label htmlFor="email" required>Email</Label>
          <Input id="email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        </div>
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
      </div>

      <div>
        <Label htmlFor="linkedinUrl">LinkedIn profile URL</Label>
        <Input
          id="linkedinUrl"
          type="url"
          placeholder="https://linkedin.com/in/…"
          error={errors.linkedinUrl?.message}
          {...register("linkedinUrl")}
        />
      </div>

      <div>
        <Label htmlFor="portfolioUrl">Portfolio / GitHub URL</Label>
        <Input
          id="portfolioUrl"
          type="url"
          placeholder="https://github.com/…"
          error={errors.portfolioUrl?.message}
          {...register("portfolioUrl")}
        />
      </div>

      <div>
        <Label htmlFor="coverLetter" required>Cover letter</Label>
        <Textarea
          id="coverLetter"
          rows={6}
          placeholder="Tell us why you want to work with us and what makes you a great fit…"
          error={errors.coverLetter?.message}
          {...register("coverLetter")}
        />
      </div>

      <FormErrorAlert message={errorMessage} />

      <Button type="submit" variant="gradient" size="lg" className="w-full" loading={isSubmitting}>
        {isSubmitting ? "Submitting…" : "Submit Application"}
      </Button>
    </form>
  );
}

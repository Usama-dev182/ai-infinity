"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { contactSchema } from "@/lib/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormErrorAlert, FormSuccess, HoneypotField } from "@/components/forms/form-feedback";
import { useFormSubmit, useRenderTimestamp } from "@/components/forms/use-form-submit";
import { trackContactFormSubmit } from "@/lib/analytics";

type FormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { _honey: "" },
  });
  useRenderTimestamp(setValue);
  const { status, errorMessage, submit } = useFormSubmit<FormData>("/api/contact", setError);

  const onSubmit = async (data: FormData) => {
    const result = await submit(data);
    if (result.ok) {
      trackContactFormSubmit();
      reset();
    }
  };

  if (status === "success") {
    return (
      <FormSuccess title="Message sent">
        <p>We&apos;ll get back to you within one business day.</p>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <HoneypotField {...register("_honey")} />
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

      <FormErrorAlert message={errorMessage} />

      <Button type="submit" variant="gradient" size="lg" className="w-full" loading={isSubmitting}>
        {isSubmitting ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}

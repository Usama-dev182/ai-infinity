// Server-side validation for attribution sent with lead forms (mirrors cleanAttribution()).

import { z } from "zod";
import { LANDING_PAGE_PATTERN, UTM_VALUE_PATTERN, type Attribution } from "@/lib/leads/attribution";

const utmValue = z.string().trim().max(150).regex(UTM_VALUE_PATTERN, "Invalid characters");

export const attributionSchema: z.ZodType<Attribution> = z
  .object({
    utmSource: utmValue.optional(),
    utmMedium: utmValue.optional(),
    utmCampaign: utmValue.optional(),
    utmContent: utmValue.optional(),
    utmTerm: utmValue.optional(),
    landingPage: z.string().trim().max(300).regex(LANDING_PAGE_PATTERN, "Must be a path").optional(),
    referrer: z.string().trim().max(300).url().optional(),
    capturedAt: z.string().max(40).optional(),
  })
  .strip();

import { z } from "zod";

export const contactFieldsSchema = z.object({
  locale: z.enum(["fr", "en"]),
  requestType: z.enum(["contact", "quote"]),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(32).optional().default(""),
  organization: z.string().trim().max(160).optional().default(""),
  service: z.string().trim().max(160).optional().default(""),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(200).optional().default(""),
}).strict();

export const contactSubmissionSchema = contactFieldsSchema.extend({
  turnstileToken: z.string().min(1).max(2048),
}).strict();

export type ContactFields = z.infer<typeof contactFieldsSchema>;

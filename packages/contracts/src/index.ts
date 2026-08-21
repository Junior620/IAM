import { z } from "zod";

export type Locale = "fr" | "en";
export type EditorialStatus = "draft" | "inReview" | "approved" | "archived";
export type VerificationStatus = "draft" | "verified" | "archived";

export type ContentRecord = {
  id: string;
  locale: Locale;
  slug: string;
  title: string;
  kind?: string;
  summary?: string;
  editorialStatus: EditorialStatus;
  verificationStatus?: VerificationStatus;
  verifiedAt?: string;
  sourceTitle?: string;
  sourceUrl?: string;
  body?: unknown[];
};

export interface ContentRepository {
  search(query: string, locale: Locale): Promise<ContentRecord[]>;
  getBySlug(slug: string, locale: Locale): Promise<ContentRecord | null>;
}

export interface MailProvider {
  sendTransactional(input: {
    to: string | string[];
    subject: string;
    html: string;
    replyTo?: string;
  }): Promise<{ id: string }>;
}

export interface RateLimiter {
  limit(key: string): Promise<{ success: boolean; reset: number }>;
}

export interface DonationProvider {
  readonly name: "stripe" | "paystack" | "flutterwave";
  createCheckout(): Promise<never>;
}

export const localeSchema = z.enum(["fr", "en"]);
export const submissionTypeSchema = z.enum([
  "contact",
  "partnership",
  "science",
  "expert",
  "training",
  "event",
  "shortage",
  "media",
  "project",
  "philanthropy",
]);

export const formSubmissionSchema = z.object({
  type: submissionTypeSchema,
  locale: localeSchema,
  firstName: z.string().trim().min(2).max(80),
  lastName: z.string().trim().max(80).optional().or(z.literal("")),
  email: z.email(),
  country: z.string().trim().min(2).max(80),
  organization: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(20).max(5000),
  consent: z.literal(true),
  website: z.string().max(0).optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
});

export const newsletterSubscriptionSchema = z.object({
  locale: localeSchema,
  firstName: z.string().trim().min(2).max(80),
  lastName: z.string().trim().max(80).optional().or(z.literal("")),
  email: z.email(),
  country: z.string().trim().min(2).max(80),
  profile: z.string().trim().min(2).max(100),
  interests: z
    .array(
      z.enum([
        "alerts",
        "research",
        "industry",
        "training",
        "philanthropy",
        "institutional",
      ]),
    )
    .min(1),
  consent: z.literal(true),
  website: z.string().max(0).optional().or(z.literal("")),
  turnstileToken: z.string().optional(),
});

export const newsletterPreferenceSchema = z.object({
  token: z.string().uuid(),
  interests: newsletterSubscriptionSchema.shape.interests,
  unsubscribe: z.boolean().default(false),
});

export type FormSubmission = z.infer<typeof formSubmissionSchema>;
export type NewsletterSubscription = z.infer<
  typeof newsletterSubscriptionSchema
>;
export type NewsletterPreference = z.infer<typeof newsletterPreferenceSchema>;

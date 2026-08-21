import { describe, expect, it } from "vitest";
import {
  formSubmissionSchema,
  newsletterPreferenceSchema,
  newsletterSubscriptionSchema,
} from "./index";

const base = {
  type: "contact",
  locale: "fr",
  firstName: "Amina",
  email: "amina@example.org",
  country: "Cameroun",
  message: "Message institutionnel documenté suffisamment long.",
  consent: true,
};

describe("submission validation", () => {
  it("accepts a valid institutional enquiry", () => {
    expect(formSubmissionSchema.safeParse(base).success).toBe(true);
  });

  it("rejects missing consent and short messages", () => {
    expect(
      formSubmissionSchema.safeParse({
        ...base,
        consent: false,
        message: "Court",
      }).success,
    ).toBe(false);
  });

  it("requires newsletter interests and validates management tokens", () => {
    const subscription = {
      ...base,
      profile: "Chercheuse",
      interests: ["research"],
      message: undefined,
      type: undefined,
    };
    expect(newsletterSubscriptionSchema.safeParse(subscription).success).toBe(
      true,
    );
    expect(
      newsletterPreferenceSchema.safeParse({
        token: crypto.randomUUID(),
        interests: ["research"],
        unsubscribe: false,
      }).success,
    ).toBe(true);
  });
});

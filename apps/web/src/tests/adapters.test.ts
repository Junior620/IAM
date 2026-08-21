import { afterEach, describe, expect, it } from "vitest";
import { getDonationProvider } from "@/lib/server/donations";

describe("donation adapter", () => {
  const original = {
    enabled: process.env.DONATIONS_ENABLED,
    provider: process.env.DONATION_PROVIDER,
  };
  afterEach(() => {
    process.env.DONATIONS_ENABLED = original.enabled;
    process.env.DONATION_PROVIDER = original.provider;
  });

  it("is disabled unless explicitly activated", () => {
    process.env.DONATIONS_ENABLED = "false";
    expect(getDonationProvider()).toBeNull();
  });

  it("exposes a non-operational provider contract without credentials", async () => {
    process.env.DONATIONS_ENABLED = "true";
    process.env.DONATION_PROVIDER = "stripe";
    const provider = getDonationProvider();
    expect(provider?.name).toBe("stripe");
    await expect(provider?.createCheckout()).rejects.toThrow(/not configured/i);
  });
});

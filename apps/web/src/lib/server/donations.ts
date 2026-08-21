import type { DonationProvider } from "@iam/contracts";
import { ServiceNotConfiguredError } from "./configuration";

class DisabledDonationProvider implements DonationProvider {
  readonly name: DonationProvider["name"];

  constructor(name: DonationProvider["name"]) {
    this.name = name;
  }

  async createCheckout(): Promise<never> {
    throw new ServiceNotConfiguredError("Payments");
  }
}

export function getDonationProvider(): DonationProvider | null {
  if (process.env.DONATIONS_ENABLED !== "true") return null;
  const name = process.env.DONATION_PROVIDER;
  if (name !== "stripe" && name !== "paystack" && name !== "flutterwave")
    return null;
  return new DisabledDonationProvider(name);
}

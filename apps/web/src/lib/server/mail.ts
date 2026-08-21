import { Resend } from "resend";
import type { MailProvider } from "@iam/contracts";

export function getResend() {
  return process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;
}

export function getMailProvider(): MailProvider | null {
  const resend = getResend();
  const from = process.env.RESEND_FROM_EMAIL;
  if (!resend || !from) return null;
  return {
    async sendTransactional(input) {
      const response = await resend.emails.send({
        from,
        to: input.to,
        subject: input.subject,
        html: input.html,
        ...(input.replyTo ? { replyTo: input.replyTo } : {}),
      });
      if (response.error || !response.data) {
        throw new Error(response.error?.message ?? "Email provider error");
      }
      return { id: response.data.id };
    },
  };
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character] ?? character;
  });
}

import { getResend } from "@/lib/server/mail";

export async function POST(request: Request) {
  const resend = getResend();
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
  if (!resend || !webhookSecret)
    return Response.json({ error: "Webhook not configured" }, { status: 503 });

  const payload = await request.text();
  const id = request.headers.get("svix-id");
  const timestamp = request.headers.get("svix-timestamp");
  const signature = request.headers.get("svix-signature");
  if (!id || !timestamp || !signature)
    return Response.json({ error: "Missing signature" }, { status: 400 });

  try {
    const event = resend.webhooks.verify({
      payload,
      headers: { id, timestamp, signature },
      webhookSecret,
    });
    return Response.json({ received: true, type: event.type });
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 401 });
  }
}

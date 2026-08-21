export async function verifyTurnstile(
  token: string | undefined,
  request: Request,
) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return process.env.NODE_ENV !== "production";
  if (!token) return false;

  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  const remoteIp = request.headers.get("cf-connecting-ip");
  if (remoteIp) body.set("remoteip", remoteIp);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body,
      cache: "no-store",
    },
  );
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

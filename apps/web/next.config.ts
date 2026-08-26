import type { NextConfig } from "next";

const developmentScriptPolicy =
  process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${developmentScriptPolicy} https://challenges.cloudflare.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io",
  "font-src 'self' data:",
  "connect-src 'self' https://*.sanity.io wss://*.sanity.io https://challenges.cloudflare.com",
  "frame-src 'self' https://challenges.cloudflare.com",
  "frame-ancestors 'self' https://*.sanity.io https://*.sanity.studio",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/a-propos-de-nous",
        destination: "/institut/a-propos",
        permanent: true,
      },
      {
        source: "/%C3%A0-propos-de-nous",
        destination: "/institut/a-propos",
        permanent: true,
      },
      {
        source: "/nos-services",
        destination: "/institut/nos-services",
        permanent: true,
      },
      { source: "/nos-formations", destination: "/academie", permanent: true },
      {
        source: "/galerie",
        destination: "/actualites-medias/galerie",
        permanent: true,
      },
      { source: "/contact-5", destination: "/contact", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-DNS-Prefetch-Control", value: "off" },
          { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          ...(process.env.NODE_ENV === "production"
            ? [
                {
                  key: "Strict-Transport-Security",
                  value: "max-age=31536000",
                },
              ]
            : []),
        ],
      },
      ...[
        "/newsletter/preferences",
        "/en/newsletter/preferences",
        "/api/newsletter/confirm",
      ].map((source) => ({
        source,
        headers: [
          { key: "Cache-Control", value: "private, no-store, max-age=0" },
          { key: "Referrer-Policy", value: "no-referrer" },
        ],
      })),
    ];
  },
};

export default nextConfig;

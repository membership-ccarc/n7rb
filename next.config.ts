import type { NextConfig } from "next";

// Trial policy: violations appear in browser DevTools without blocking resources.
// Inline scripts/styles support the current statically generated Next.js pages.
// No reporting endpoint is configured: reports stay in the testing browser.
const reportOnlyCsp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://capital-city-amateur-radio-club.kit.com https://f.convertkit.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https://i.ytimg.com https://www.google-analytics.com https://www.googletagmanager.com https://*.kit.com https://*.convertkit.com",
  "font-src 'self' https://fonts.gstatic.com",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://capital-city-amateur-radio-club.kit.com https://app.kit.com https://app.convertkit.com https://vitals.vercel-insights.com",
  "frame-src https://www.google.com https://www.youtube-nocookie.com",
  "form-action 'self' mailto: https://app.kit.com https://app.convertkit.com https://capital-city-amateur-radio-club.kit.com",
].join("; ");

const securityHeaders = [
  {
    key: "Content-Security-Policy-Report-Only",
    value: reportOnlyCsp,
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  images: {
    qualities: [60, 75],
  },
  experimental: {
    // Inline the small global stylesheet to avoid a render-blocking CSS request.
    inlineCss: true,
  },
  async redirects() {
    return [
      {
        source: "/nets",
        destination: "/meetings-nets",
        permanent: true,
      },
      {
        source: "/local-repeater-information",
        destination: "/meetings-nets#repeater-information",
        permanent: true,
      },
      {
        source: "/licensing-testing",
        destination: "/testing",
        permanent: true,
      },
      {
        source: "/ccarc-social-media",
        destination: "/meetings-nets#stay-connected",
        permanent: true,
      },
      {
        source: "/sample-page/ares",
        destination: "/ares",
        permanent: true,
      },
      {
        source: "/sample-page/licensing-testing",
        destination: "/testing",
        permanent: true,
      },
      {
        source: "/sample-page/why-n7rb",
        destination: "/about/n7rb-bio",
        permanent: true,
      },
      {
        source: "/why-n7rb",
        destination: "/about/n7rb-bio",
        permanent: true,
      },
      {
        source: "/membership",
        destination: "/join-contact/membership-application",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/2025/05/May-2025.pdf",
        destination: "/newsletters/newsletter-2025-05.pdf",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/2025/05/Newsletter-June-2025.pdf",
        destination: "/newsletters/newsletter-2025-06.pdf",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

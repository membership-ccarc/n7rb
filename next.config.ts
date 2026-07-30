import type { NextConfig } from "next";

const securityHeaders = [
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
        source: "/newsletter",
        destination: "/#newsletters",
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

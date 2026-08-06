"use client";

import { track } from "@vercel/analytics/react";
import type { ReactNode } from "react";

type TrackedNewsletterLinkProps = {
  children: ReactNode;
  className: string;
  href: string;
  newsletterTitle: string;
  source: "newsletter-page" | "homepage-archive";
};

export function TrackedNewsletterLink({
  children,
  className,
  href,
  newsletterTitle,
  source,
}: TrackedNewsletterLinkProps) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        track("Newsletter PDF Opened", {
          newsletter: newsletterTitle,
          source,
        })
      }
    >
      {children}
    </a>
  );
}

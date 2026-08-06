"use client";

import { track } from "@vercel/analytics";
import type { ReactNode } from "react";

type NewsletterDownloadLinkProps = {
  children: ReactNode;
  className: string;
  date: string;
  href: string;
  title: string;
};

export function NewsletterDownloadLink({
  children,
  className,
  date,
  href,
  title,
}: NewsletterDownloadLinkProps) {
  const file = href.split("/").pop() ?? href;

  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        track("newsletter_download", {
          issue: `${title} Newsletter`,
          file,
          month: date.slice(0, 7),
        })
      }
    >
      {children}
    </a>
  );
}

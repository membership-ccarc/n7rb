import Link from "next/link";
import { LINKS, SITE } from "@/lib/site-data";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "light";
  openInNewTab?: boolean;
};

export function ButtonLink({ href, children, variant = "primary", openInNewTab = false }: ButtonLinkProps) {
  const isExternalSite = href.startsWith("http://") || href.startsWith("https://");
  const shouldOpenInNewTab = isExternalSite || openInNewTab;
  const classes = {
    primary: "bg-pine-700 text-white hover:bg-pine-900 focus-visible:outline-pine-900",
    secondary: "bg-gold-300 text-mountain-900 hover:bg-gold-500 focus-visible:outline-gold-500",
    light: "bg-white text-mountain-900 ring-1 ring-stonewarm-100 hover:bg-stonewarm-50 focus-visible:outline-pine-700",
  };

  if (shouldOpenInNewTab) {
    return (
      <a
        className={`inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-bold shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${classes[variant]}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-5 py-3 text-sm font-bold shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${classes[variant]}`}
      href={href}
    >
      {children}
    </Link>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? <p className="text-sm font-bold uppercase tracking-wide text-pine-700">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-black text-mountain-900 sm:text-4xl">{title}</h2>
      {children ? <div className="mt-4 text-lg leading-8 text-stonewarm-700">{children}</div> : null}
    </div>
  );
}

export function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <article className="rounded-lg border border-stonewarm-100 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-black text-mountain-900">{title}</h3>
      <div className="mt-3 leading-7 text-stonewarm-700">{children}</div>
    </article>
  );
}

export function PlaceholderImage({
  label,
  alt,
  className = "",
}: {
  label: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative overflow-hidden rounded-lg bg-mountain-900 shadow-soft ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(233,191,85,0.45),transparent_30%),linear-gradient(140deg,#12364a_0%,#24556f_38%,#39724f_72%,#f8e9bd_100%)]" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(155deg,transparent_0%,transparent_38%,rgba(23,55,39,0.9)_39%,rgba(23,55,39,0.95)_100%)]" />
      <div className="absolute left-8 top-8 h-24 w-24 rounded-full border-8 border-gold-300/60" />
      <div className="absolute bottom-10 left-10 h-24 w-1 bg-stonewarm-50" />
      <div className="absolute bottom-32 left-8 h-1 w-28 rotate-[-18deg] bg-stonewarm-50" />
      <div className="absolute bottom-6 right-8 rounded-md bg-white/92 px-4 py-3 text-sm font-bold text-mountain-900 shadow-sm">
        {label}
      </div>
    </div>
  );
}

export function MeetingDetails() {
  return (
    <dl className="grid gap-4 sm:grid-cols-2">
      <div>
        <dt className="font-bold text-mountain-900">When</dt>
        <dd className="mt-1 text-stonewarm-700">First non-holiday Monday of each month at 7:00 PM</dd>
      </div>
      <div>
        <dt className="font-bold text-mountain-900">Where</dt>
        <dd className="mt-1 text-stonewarm-700">{SITE.meetingAddress}</dd>
      </div>
      <div>
        <dt className="font-bold text-mountain-900">Online option</dt>
        <dd className="mt-1">
          <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href={LINKS.ONLINE_MEETING_URL}>
            Join the monthly Google Meet
          </a>
        </dd>
      </div>
    </dl>
  );
}

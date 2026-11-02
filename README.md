# Capital City Amateur Radio Club Website

Website for the Capital City Amateur Radio Club (CCARC), club callsign N7RB, in Helena, Montana.

## Hosting And Ownership

- Source code: GitHub, under the `membership-ccarc` account (login: membership@ccarc-info.org)
- Repository: `https://github.com/membership-ccarc/n7rb`
- Hosting: Vercel (connected to the `membership-ccarc` GitHub account)
- Framework: Next.js App Router

The usual deployment flow is:

1. Make changes locally.
2. Run `npm run build`.
3. Commit and push to GitHub.
4. Vercel builds and deploys from the GitHub repository.

## Local Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build the production site:

```bash
npm run build
```

Start a production build locally:

```bash
npm run start
```

## Environment Variables

The class signup and contact forms each post to their own Make.com webhook, both secured with an API key.

Create `.env.local` from `.env.example` and set:

```bash
MAKE_CLASS_SIGNUP_WEBHOOK_URL=https://hook.us2.make.com/your-real-webhook
MAKE_CLASS_SIGNUP_API_KEY=your-make-keychain-api-key

MAKE_CONTACT_WEBHOOK_URL=https://hook.us2.make.com/your-contact-webhook
MAKE_CONTACT_API_KEY=your-contact-api-key
```

The webhook URLs come from their respective Make.com scenarios (module 1 of each). The API keys are sent via the `x-make-apikey` header. All four variables must also be configured in Vercel for production deployments.

The contact form Make.com scenario appends a row to the "Contact Us" tab in the club Google Sheet and posts a Slack notification to the designated channel.

## Form Spam Safeguards

Both public form routes use `lib/form-security.ts` for request limits, client IP
handling, rate limiting, and webhook delivery. Existing honeypot, timing, and spam
heuristics remain; rejected spam still gets a silent `{ ok: true }` response.
Rate-limited requests instead return 429 with `Retry-After` and a visible retry
message showing the remaining wait time.

- Only JSON bodies are accepted; compressed requests are rejected. The stream is
  capped at 16 KB regardless of Content-Length, with a five-second read deadline.
- Server validation caps names at 60 characters, email at 254, phone at 30,
  callsign at 20, and message/notes at 2,000. Class interests are allowlisted,
  bounded, and deduplicated. Browser field limits match the server limits.
- On Vercel, client identity comes only from `x-vercel-forwarded-for`, validated as
  an IP address. Cloudflare and arbitrary forwarded headers are ignored. Outside
  Vercel, all callers share a local identity; another hosting platform requires an
  explicit trusted-proxy implementation.
- Each form allows ten attempts per IP per ten minutes, before reading request
  bodies. Blocked attempts do not extend the window. Limits use bounded local
  memory, prune expired entries, and cap storage at 5,000 active buckets. There
  are no Redis credentials or external rate-limiter calls. Counters reset on cold
  starts and are not shared between Vercel instances, so this is best-effort spam
  protection rather than a distributed traffic limit.
- Make calls require an HTTPS `hook.make.com` or `hook.<region>.make.com` URL and a
  nonempty API key. Requests have an eight-second timeout, reject redirects, and
  do not retry automatically. Error logs omit payloads, IPs, user agents, secret
  URLs, API keys, and full exception objects.

### Deployment and rate limiting

Deploy the updated code normally; no additional service or environment variables
are needed. The former `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`
variables are ignored and can be removed from Vercel after this version is
deployed. Keep all four Make webhook variables.

Test in preview with a separate Make destination. Ten requests per IP per form
are allowed through validation; the eleventh returns 429 with `Retry-After`.
Malformed requests and webhook failures count as attempts, but the wait is at
most ten minutes. A full local bucket store returns 503 with a one-minute retry.
No request payloads or raw IPs are stored in the limiter; keys use an IP digest
(which should still be treated as personal data).

If actual traffic warrants stronger protection, review Vercel firewall/bot
settings and spending alerts. Local counters cannot stop a distributed flood or
apply a consistent limit across all function instances.

Run `npm run test:security` for isolated tests with mocked network calls. They do
not send mail, Slack messages, or form submissions to real services.
Run `npm run lint` and `npm run build` before deploying.

Downstream Make verification is still required: write submitted strings to Google
Sheets as RAW/literal text, escape Slack formatting/mentions, and verify webhook
API-key enforcement. API validation does not replace output-specific handling.

## CSP Testing

`next.config.ts` sends `Content-Security-Policy-Report-Only`. This trial policy
does not block content or change the UI. It allows the current Next.js inline
scripts/styles and known analytics, Kit, map, and video sources. Additional
origins requested by third-party embeds should be reviewed before being allowed.

After deploying, open browser DevTools, enable **Preserve log** in the Console,
and visit the homepage, `/join-contact`, `/classes`, `/testing`,
`/meetings-nets`, and `/join-contact/membership-application`. Exercise navigation,
open a YouTube player, and check the map and Kit embeds. Look for CSP messages
marked report-only and record the page, violated directive, and resource origin.
Avoid sending real form submissions just to test the policy.

Reports are visible only in the testing browser's console; there is no server
report collector or automatic monitoring. Browsers may warn that no reporting
endpoint is configured. Development tooling and browser extensions may also
produce warnings, so confirm findings against a production build in a clean
browser profile. Do not switch to the enforcing `Content-Security-Policy`
header until required resources have been reviewed and tested. The trial permits
inline scripts for static rendering compatibility and is not a strict XSS policy.

## Important Files

- `app/page.tsx`: homepage
- `app/layout.tsx`: global metadata, shell, header, footer
- `app/classes/page.tsx`: license class page
- `app/api/class-signup/route.ts`: class signup form API endpoint
- `app/api/contact/route.ts`: contact form API endpoint
- `app/join-contact/page.tsx`: join/contact page with working contact form (client component)
- `app/testing/page.tsx`: exam testing information
- `app/meetings-nets/page.tsx`: meetings, nets, repeater, Slack promo
- `app/news/page.tsx`: dated club news, activity updates, minutes, and calls to action
- `app/ares/page.tsx`: ARES/LCARES landing page
- `app/about/page.tsx`: club overview
- `app/about/n7rb-bio/page.tsx`: explanation/history for N7RB
- `lib/site-data.ts`: shared site constants, navigation, links, cards, newsletters, license levels
- `components/ui.tsx`: shared UI building blocks
- `components/SiteHeader.tsx`: site navigation/header
- `components/ClassSignupForm.tsx`: class signup form
- `components/MembershipApplicationForm.tsx`: membership application mailto form
- `components/NewsletterArchive.tsx`: newsletter list rendering
- `public/`: static images, PDFs, flyers, newsletters, syllabi

Most routine content updates should start in `lib/site-data.ts` before editing page files directly.

## Content Maintenance Notes

- Newsletter PDFs live in `public/newsletters/`; update `newsletterIssues` in `lib/site-data.ts` after adding a new PDF.
- Syllabi live in `public/syllabi/`.
- Official nonprofit records and board minutes live in `public/docs/` and use stable `/docs/...` URLs.
- The Field Day flyer is currently `public/CCARC_FD2026.png`; the homepage references it directly.
- The Slack invite URL in `lib/site-data.ts` is marked as expiring and should be renewed when needed.
- The membership application PDF is `public/membership_application.pdf`.
- Use `Emergency Communications` for radio/public-safety contexts.
- The homepage links `N7RB` to `/about/n7rb-bio` for visitors who do not know what the callsign means.

## Vercel Notes

In Vercel, check these items if a deployment fails or forms stop working:

- The project is connected to `membership-ccarc/n7rb` on GitHub (login: membership@ccarc-info.org).
- The production branch is the branch you are pushing to.
- All four Make.com env vars (`MAKE_CLASS_SIGNUP_WEBHOOK_URL`, `MAKE_CLASS_SIGNUP_API_KEY`, `MAKE_CONTACT_WEBHOOK_URL`, `MAKE_CONTACT_API_KEY`) are set in the Vercel project environment variables.
- The build command is `npm run build`.
- The app should deploy as a standard Next.js project.

## Before Handing Off Changes

Run:

```bash
npm run build
```

Then review changed files:

```bash
git status --short
git diff
```

Commit and push once the build passes.

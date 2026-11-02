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
message. Failed security infrastructure returns 503 rather than silently dropping
legitimate submissions.

- Only JSON bodies are accepted; compressed requests are rejected. The stream is
  capped at 16 KB regardless of Content-Length, with a five-second read deadline.
- Server validation caps names at 60 characters, email at 254, phone at 30,
  callsign at 20, and message/notes at 2,000. Class interests are allowlisted,
  bounded, and deduplicated. Browser field limits match the server limits.
- On Vercel, client identity comes only from `x-vercel-forwarded-for`, validated as
  an IP address. Cloudflare and arbitrary forwarded headers are ignored. Outside
  Vercel, all callers share a local identity; another hosting platform requires an
  explicit trusted-proxy implementation.
- Each form allows three requests per IP per hour, before reading request bodies.
  Without Redis configuration this remains a per-instance fallback, with expired
  entries pruned and memory capped at 5,000 active buckets. This fallback alone
  does **not** solve distributed/serverless abuse.
- Make calls require an HTTPS `hook.make.com` or `hook.<region>.make.com` URL and a
  nonempty API key. Requests have an eight-second timeout, reject redirects, and
  do not retry automatically. Error logs omit payloads, IPs, user agents, secret
  URLs, API keys, and full exception objects.

### Enable shared rate limiting in Vercel

1. Create or connect an Upstash Redis database, and obtain its REST URL and write
   token. Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in Vercel for
   the environments you want protected. Keep both server-only; never use a
   `NEXT_PUBLIC_` prefix. Use separate preview and production credentials where
   practical. Existing Make variables are still required.
2. Redeploy. The limiter uses an atomic Redis Lua increment/expiry operation,
   shared across instances, with per-form and per-environment keys and a one-hour
   TTL. Keys contain a SHA-256 digest of the IP, not the raw IP; these digests
   should still be treated as personal data. Redis contains no submitted fields.
3. Verify using a separate preview destination: the first three requests are
   allowed through validation, the fourth returns 429. Changing a supplied
   `cf-connecting-ip` must not reset the counter. Verify that legitimate requests
   reach your test Make scenario. Tests consume quota even when payloads are bad.
4. If either Redis setting is present but invalid, or Redis is unreachable, the
   forms return 503. The code does not fall back to a weaker limiter during an
   outage. If both settings are absent, Vercel logs a warning and uses the local
   fallback to preserve existing form availability.

This integration uses the [Upstash REST API](https://upstash.com/docs/redis/features/restapi)
without adding an SDK. It only becomes shared after credentials are configured;
no database or account settings are provisioned by this code change. Platform
firewall/bot limits and spending alerts are useful additional protection against
request floods that reach the function before the application limiter runs.

Run `npm run test:security` for isolated tests with mocked network calls. They do
not send mail, Slack messages, form submissions, or Redis commands to real services.
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

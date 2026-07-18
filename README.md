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

Both `app/api/class-signup/route.ts` and `app/api/contact/route.ts` share the same layered anti-spam approach. Submissions that trip any layer get a silent `{ ok: true }` response (not an error) so bots can't tell what was rejected, and the reason is logged server-side via `console.warn`.

1. **Honeypot field** — a `website` input rendered `sr-only`/`aria-hidden` and excluded from tab order. Real users never see or fill it; bots that auto-fill every field do. Any non-empty value is treated as spam.
2. **Timing gate** — the form captures a `renderedAt` timestamp on mount and submits it alongside the payload. If the server receives the submission less than `MIN_SUBMIT_SECONDS` (4s) after render, it's rejected as too fast for a human to have filled out the form.
3. **Rate limiting** — an in-memory, per-IP counter (`RATE_LIMIT_MAX` = 3 submissions per `RATE_LIMIT_WINDOW_MS` = 1 hour). This is a best-effort fallback only: on serverless platforms each instance has its own map, so it resets on cold starts and isn't reliable across instances.
4. **Pattern/gibberish detection** — regex heuristics applied to names, email local-parts, and free-text message/notes fields: long no-space mixed-case tokens, low vowel ratios, long consonant runs, and dotted-noise email addresses (the kind of random strings bot-generated form fills tend to produce). Free-text fields are also checked for excess links (`MAX_LINKS` = 2) and script/SQL injection patterns.

When adding a new public-facing form, port these same checks from `app/api/contact/route.ts` rather than inventing a new approach.

## Important Files

- `app/page.tsx`: homepage
- `app/layout.tsx`: global metadata, shell, header, footer
- `app/classes/page.tsx`: license class page
- `app/api/class-signup/route.ts`: class signup form API endpoint
- `app/api/contact/route.ts`: contact form API endpoint
- `app/join-contact/page.tsx`: join/contact page with working contact form (client component)
- `app/testing/page.tsx`: exam testing information
- `app/meetings-nets/page.tsx`: meetings, nets, repeater, Slack promo
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

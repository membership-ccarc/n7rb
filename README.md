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

The class signup form posts to a Make.com webhook secured with an API key.

Create `.env.local` from `.env.example` and set:

```bash
MAKE_CLASS_SIGNUP_WEBHOOK_URL=https://hook.us2.make.com/your-real-webhook
MAKE_CLASS_SIGNUP_API_KEY=your-make-keychain-api-key
```

The webhook URL comes from the Make.com scenario (module 1). The API key is the value set in the Make keychain (named `CCARC_Webhook`) and is sent via the `x-make-apikey` header. Both variables must also be configured in Vercel for production deployments.

## Important Files

- `app/page.tsx`: homepage
- `app/layout.tsx`: global metadata, shell, header, footer
- `app/classes/page.tsx`: license class page
- `app/api/class-signup/route.ts`: class signup form API endpoint
- `app/testing/page.tsx`: exam testing information
- `app/meetings-nets/page.tsx`: meetings, nets, repeater, Slack promo
- `app/ares/page.tsx`: ARES/LCARES landing page
- `app/about/page.tsx`: club overview
- `app/about/n7rb-bio/page.tsx`: explanation/history for N7RB
- `app/join-contact/page.tsx`: join/contact page
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
- `MAKE_CLASS_SIGNUP_WEBHOOK_URL` and `MAKE_CLASS_SIGNUP_API_KEY` are set in the Vercel project environment variables.
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

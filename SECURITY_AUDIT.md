# CCARC website security audit

Date: November 2, 2026. Repository commit reviewed: `29b1527`.

## Remediation progress

Subsequent code changes harden both public form APIs with a 16 KB streamed body
limit, JSON-only requests, a five-second body deadline, stricter field types and
length limits, bounded/deduplicated class interests, validated Vercel client IPs,
and rate limiting before parsing. Make delivery now requires an HTTPS Make host
and API key, rejects redirects, times out after eight seconds, and avoids logging
secret URLs, payloads, IPs, or exception objects. Browser input limits match the
server limits. `npm run test:security` covers these controls using mocked services.

Shared rate limiting has been implemented via Upstash Redis but still requires
`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in Vercel, followed by a
deployment and preview verification. With both absent, a bounded per-instance
fallback preserves existing availability; it does not resolve cross-instance
limits. A configured Redis failure returns 503 rather than bypassing the limit.
See README for setup and failure behavior.

The CSP is now in report-only mode. Make/Sheets/Slack configuration, account and
deployment settings, dependency remediation, and CSP enforcement still need the
follow-up work described below. Findings below describe the original audited
state; these code changes have not yet been verified in production.

## Assessment and scope

The highest-priority changes are stronger protection for the two public form APIs and stricter request validation. No critical application vulnerability was confirmed in this review. This is a source/configuration review with dependency advisory queries and passive HTTP header checks, not a penetration test or a finding that the site is free of compromise.

Reviewed application routes, form components, third-party scripts, configuration, lockfile, environment variable handling, README deployment documentation, and selected Git metadata. Live checks used HEAD requests to the homepage, contact page, minutes PDF, and HTTP/HTTPS redirects. No form submissions, load tests, or downstream messages were sent. No application code or production settings were changed.

Vercel/GitHub/Make/Google/Kit account settings, production environment values, incident logs, full Git history secret scanning, and PDF contents were not audited. Installed/locked package versions do not prove which versions are deployed.

## Findings and recommended changes

### 1. Public API rate limits are unreliable across server instances

Priority: high. Confirmed design gap; successful live bypass was not tested.

Evidence: `app/api/contact/route.ts:23–60` and `app/api/class-signup/route.ts:23–25,63–78`. Each route maintains a separate in-memory Map. Instances do not share counters, cold starts reset them, and expired entries for inactive IPs are never removed. Both select `cf-connecting-ip` before Vercel's IP headers, without establishing that Cloudflare supplied it. A caller-controlled value in that header could select a new rate-limit bucket unless infrastructure overwrites or removes it. Actual proxy behavior needs verification.

Impact: spam can consume Make operations, pollute club records/notifications, and increase function/logging costs. Many distinct keys can also grow a warm instance's Map. The browser timestamp and honeypot are heuristics a custom client can reproduce, not proof of a human submission.

Recommended changes: enforce endpoint-specific limits at the Vercel firewall or use an atomic shared limiter with automatic expiry. Use only an IP identity supplied by the verified hosting/proxy chain. Add server-verified bot protection if spam persists, with an accessible fallback. Apply limits before body parsing. Cap and prune any retained local fallback. Add alerts for traffic spikes and Make/function spending. A submitted `spam_checked` flag must not be treated as trust by downstream automation.

Reference: [Vercel request headers](https://vercel.com/docs/headers/request-headers) documents the platform's protected forwarded IP headers.

### 2. Request size and field limits are incomplete

Priority: medium. Confirmed code gap; infrastructure provides its own limits, which were not measured.

Evidence: both POST handlers call `request.json()` before checking rate limits (`contact:164–179`, `class-signup:207–222`). No application byte limit or JSON Content-Type check exists. Class signup lacks maximum lengths for names, email, phone, and notes; its email validation only checks for `@` (`class-signup:151–187`). The interests array allows unlimited duplicate valid entries. Contact caps most fields but not email (`contact:140–143`).

Impact: oversized requests consume parsing/validation work and can forward unnecessarily large data to Make. Malformed or duplicated records may pass validation. Deployment request limits reduce exposure but do not replace small, form-specific bounds.

Recommended changes: accept JSON only; enforce a small total body limit, such as 16 KB, while reading the stream (not solely from Content-Length). Reject oversized bodies with 413 and unsupported media types with 415. Use shared server schemas: names up to 60 characters, email up to 254, phone up to 30, free text up to 2,000; cap interests to the allowed count and deduplicate. Reject arrays where objects are expected. Add focused tests for boundary lengths, invalid emails, duplicates, and malformed/oversized bodies.

### 3. No Content Security Policy; third-party scripts run in page context

Priority: medium hardening. Absence confirmed locally and on live homepage/contact responses; no exploitable XSS was identified.

Evidence: `next.config.ts:3–24` defines several good headers but no CSP. `components/KitSignupForm.tsx:17–21` injects Kit JavaScript into the contact page; `components/GoogleAnalytics.tsx` and `app/layout.tsx` add analytics. Authorized third-party scripts can access the DOM on pages where they run, including form fields.

Recommended changes: introduce Content-Security-Policy-Report-Only, inventory actual required origins, then enforce a tested policy. Include object-src, base-uri, frame-ancestors, script-src, connect-src, frame-src, and form-action restrictions. Test maps, YouTube, Kit, analytics, mailto membership submission, and Next hydration/navigation. Consider a hosted Kit signup link or isolated iframe to reduce script privileges on the contact page. An origin allowlist does not protect against compromise of an explicitly allowed script provider.

Avoid copying a strict nonce policy blindly: per-request nonces require dynamic rendering and change the current static caching model. [Next.js CSP guidance](https://nextjs.org/docs/app/guides/content-security-policy) describes that tradeoff.

### 4. Webhook transport and execution are insufficiently constrained

Priority: medium hardening. Confirmed permissive code; no insecure production configuration was established.

Evidence: webhook URL validators allow HTTP (`contact:35–39`, `class-signup:50–57`). API keys are optional at runtime (`contact:204–206`, `class-signup:246–250`). Fetch calls have no explicit application timeout or redirect restriction (`contact:209–213`, `class-signup:254–258`). Exceptions are logged as entire error objects.

Impact: a configuration mistake could send personal details/key material over HTTP or omit authentication. Slow downstream requests can occupy functions until platform limits intervene. Detailed network errors may disclose sensitive webhook URL information in logs. URLs come from server environment variables, so this is not a demonstrated user-controlled SSRF vulnerability.

Recommended changes: require HTTPS, expected Make webhook hosts, and nonempty keys; fail closed when configuration is invalid. Set an explicit timeout, for example 8–10 seconds, and reject unexpected redirects. Log safe error categories/statuses rather than full errors containing secret URLs. Verify key enforcement in Make itself and use separate preview/production credentials and destinations. Avoid automatic POST retries without deduplication.

### 5. Spreadsheet and Slack output handling needs downstream verification

Priority: medium, conditional. Not confirmed exploitable.

Evidence: README says contact submissions append rows to Google Sheets and post Slack notifications. API payload fields are forwarded as user text; injection-pattern regexes do not make text safe for every downstream format. Fields can contain formula-like text or Slack formatting.

Recommended changes: inspect Make scenarios and write submitted strings to Sheets as literal/raw values, not formulas or USER_ENTERED values. Escape or disable Slack markup/mentions for untrusted fields. If CSV exports are used, apply spreadsheet-specific formula safeguards at export too. Test harmless formula-looking text and mention syntax in a separate test destination. Input blocklists do not replace output-specific handling. [OWASP's formula injection guidance](https://owasp.org/www-community/attacks/CSV_Injection) explains the spreadsheet risk.

### 6. Dependency advisories affect development/build tooling

Priority: medium maintenance; lower immediate risk to public visitors.

`npm audit --json` reported 17 moderate affected package entries, zero high, and zero critical. These are propagated package alerts from two underlying advisories, not 17 independently demonstrated site vulnerabilities:

| Package in lockfile | Advisory | Recommended action |
| --- | --- | --- |
| minimatch 3.1.5 and 10.2.6 (dev dependencies) | [GHSA-g3hv-75wg-m249](https://github.com/advisories/GHSA-g3hv-75wg-m249), pattern amplification/DoS | Update affected tooling through compatible releases; advisory lists 11.0.1 as patched. Do not force every older consumer onto a new major without compatibility checks. |
| postcss-selector-parser 6.1.4 (dev dependency) | [GHSA-rj75-hqrm-r3gf](https://github.com/advisories/GHSA-rj75-hqrm-r3gf), selector parsing CPU exhaustion | Update the affected dependency path to at least patched 6.1.5 (or patched 7.1.6 on the 7.x line). |

No application route accepts CSS selectors or glob patterns for these tools. Exposure is principally build/lint processing of untrusted input. Do not run `npm audit fix --force` indiscriminately: its suggestions included major downgrades of ESLint/Next configuration.

Installed/locked versions: Next 16.4.2, React/React DOM 19.2.7, PostCSS 8.5.30, eslint-config-next 16.4.2. Next 16.4.2 is beyond the 16.4.1 fixes in the [October 14 security update](https://nextjs.org/blog/nextjs-security-update-october-14-2026). A [16.4.4 release](https://github.com/vercel/next.js/releases/tag/v16.4.4) was available on the review date; consider upgrading Next and its ESLint configuration together after reviewing release changes. This report does not classify 16.4.2 as vulnerable solely because a newer release exists.

Enable automated dependency update/security PRs, secret scanning, and CI checks using the committed lockfile (`npm ci`, lint, build, and advisory review). No repository CI configuration was found in the tracked files reviewed.

## Existing protections verified

- HTTP redirects to HTTPS, and the apex HTTPS domain redirects to `www.n7rb.org`.
- Live homepage, contact page, and minutes PDF return HSTS, nosniff, SAMEORIGIN framing protection, restrictive device Permissions-Policy, and strict-origin-when-cross-origin Referrer-Policy.
- Webhook secrets are accessed in server routes, not NEXT_PUBLIC variables. Only `.env.example` is tracked among current environment files. The targeted Git log check found no history for `.env`, `.env.local`, or `.env.production`; this is not a comprehensive historical secret scan.
- No database, login/session system, public file upload handler, shell execution, or user-supplied fetch destination was found in the reviewed application code.
- React escapes normal rendered text. The JSON-LD helper escapes `<` before placing JSON inside a script element. Membership application data is encoded into a mailto URL.
- No SQL injection path was found; the spam regex's SQL keywords should not be presented as evidence of a SQL vulnerability.

## Account and deployment verification still needed

Verify MFA/passkeys and recovery ownership for GitHub, Vercel, domain registrar/DNS, Make, Kit, and club email. Review collaborators, deployment permissions, protected branches, preview access, production secret scope, Make key enforcement, and Google Sheet sharing. Confirm the production build's dependency versions and runtime support status from deployment records. Review Vercel firewall/bot settings, traffic/error logs, alerts, and spending thresholds. These settings cannot be established from source files or response headers.

Before publishing future PDFs, review them for member/private information and embedded content; all files in `public/` are publicly downloadable. PDF content/malware inspection was outside this review.

## Suggested order of work

1. Strengthen API rate limiting and trusted IP handling; add payload/field limits.
2. Require secure webhook configuration, add timeouts, and verify Make/Sheets/Slack handling.
3. Review account access, alerts, and deployed package versions; address dependency alerts through tested compatible updates.
4. Roll out CSP in report-only mode and reduce third-party script privileges where practical.

Validate API changes locally with mocked webhooks so tests do not send real messages. Verify limiter sharing across instances, spoofed-header behavior, malformed/oversized requests, legitimate form submissions, downstream literal text, timeouts, and safe logging. For CSP, verify browser behavior before enforcing. Recheck public headers and deployment records after release.

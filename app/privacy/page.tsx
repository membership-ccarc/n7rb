import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How the Capital City Amateur Radio Club collects, uses, and protects information on n7rb.org.",
  alternates: { canonical: "/privacy" },
};

const PRIVACY_EMAIL = "membership@ccarc-info.org";

function PolicySection({ title, children }: Readonly<{ title: string; children: React.ReactNode }>) {
  return (
    <section aria-labelledby={title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}>
      <h2
        id={title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
        className="text-2xl font-black text-mountain-900"
      >
        {title}
      </h2>
      <div className="mt-3 space-y-4 leading-7 text-stonewarm-700">{children}</div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Capital City Amateur Radio Club</p>
        <h1 className="mt-3 text-4xl font-black text-mountain-900 sm:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm font-bold text-stonewarm-700">Effective and last updated: July 22, 2026</p>
        <p className="mt-6 text-lg leading-8 text-stonewarm-700">
          This policy explains how the Capital City Amateur Radio Club (&quot;CCARC,&quot; &quot;we,&quot; or &quot;us&quot;), based in Helena, Montana, handles information through n7rb.org. The website primarily serves people in Montana and elsewhere in the United States.
        </p>

        <div className="mt-10 space-y-10 rounded-lg bg-white p-6 shadow-sm sm:p-8">
          <PolicySection title="Information you provide">
            <p>
              The contact form asks for your name, email address, and message. The class signup form asks for your name, email address, optional phone number, license and experience information, radio interests, preferred contact method, and optional notes. We use this information to respond, coordinate classes, and provide the club information or services you request.
            </p>
            <p>
              The membership application asks for contact and membership information, including a mailing address and optional phone numbers. It creates an email in your own email application addressed to the club treasurer; the membership information is not submitted to or stored by the n7rb.org website. Your email provider and the recipient&apos;s email provider process the message when you choose to send it.
            </p>
            <p>
              Newsletter requests and other email links also open your email application. Information you send by email is handled by the relevant email providers and club volunteers who receive it.
            </p>
          </PolicySection>

          <PolicySection title="Technical information, hosting, and security logs">
            <p>
              Vercel hosts the website and may process ordinary request information needed to deliver and protect it, such as IP address, request date and time, requested page, browser or device information, referring page, and diagnostic or security events. Our form endpoints use an IP address in temporary, in-memory rate-limit records. Those records are set to expire after one hour and may disappear sooner when a server instance restarts.
            </p>
            <p>
              When a form submission appears to be spam, our server logs the reason, IP address, and browser user-agent so we can diagnose abuse. Vercel&apos;s platform logs may also contain request and error information under the settings and retention rules for our hosting account.
            </p>
          </PolicySection>

          <PolicySection title="Analytics, cookies, and similar technologies">
            <p>
              We use Vercel Web Analytics to understand aggregate traffic, including page views, referrers, general location, browser, operating system, and device type. Vercel states that this service does not use cookies. It derives a visitor hash from request information, rotates it daily, and does not enable us to identify a visitor or follow a visitor across websites.
            </p>
            <p>
              We use Google Analytics 4 to understand how visitors use n7rb.org, including page views, traffic sources, user engagement, and interactions with our class signup form. Google Analytics uses a measurement ID to collect this data and may use cookies or similar technologies under Google&apos;s privacy policy. Google Analytics data is retained according to our Google Analytics retention settings, which are currently set to 14 months.
            </p>
            <p>
              We also use Google Analytics conversion tracking to measure successful class signup form submissions. This helps us understand whether advertising campaigns through Google Ad Grants are reaching people interested in our Technician license classes. The conversion event does not send Google Analytics the name, email address, phone number, form notes, or radio interests entered in the form.
            </p>
            <p>
              You can opt out of Google Analytics by installing Google&apos;s{" "}
              <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="https://tools.google.com/dlpage/gaoptout?hl=en" target="_blank" rel="noopener noreferrer">
                Google Analytics opt-out browser add-on
              </a>
              . For more information, see{" "}
              <a className="font-bold text-pine-700 underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                Google&apos;s privacy policy
              </a>
              . We do not use session recording or fingerprinting. Third-party content and analytics services can make their own requests and may use cookies or similar technologies under the providers&apos; policies.
            </p>
          </PolicySection>

          <PolicySection title="Forms and service providers">
            <p>We disclose information when needed to operate the website and respond to requests:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li><strong className="text-mountain-900">Vercel</strong> hosts the site, processes requests, provides security and operational logs, and provides cookieless web analytics.</li>
              <li><strong className="text-mountain-900">Google Analytics</strong> processes visitor behavior data to help us understand site usage and measure the effectiveness of our class signup campaigns. Google may use cookies or similar technologies under its privacy policy. Our class-signup conversion event does not send Google the personal information entered into the form.</li>
              <li><strong className="text-mountain-900">Make.com</strong> receives contact and class signup submissions from our server and routes them for club follow-up.</li>
              <li><strong className="text-mountain-900">Google Sheets</strong> receives contact-form submissions through our Make.com workflow. The site also retrieves a public club schedule spreadsheet from Google on the server; that schedule request does not include a visitor&apos;s submitted form information.</li>
              <li><strong className="text-mountain-900">Slack</strong> receives a notification containing contact-form information through our Make.com workflow so club volunteers can respond.</li>
              <li><strong className="text-mountain-900">Email providers</strong> process messages visitors choose to send to club addresses, including membership applications and newsletter requests.</li>
            </ul>
            <p>
              We may also disclose information when reasonably necessary to comply with law, respond to lawful process, protect the website or its users, investigate abuse, or protect the rights and safety of CCARC and others. We do not use the information submitted through this site for targeted advertising, and we do not sell it for money.
            </p>
          </PolicySection>

          <PolicySection title="Embedded and external services">
            <p>
              Some pages automatically load Google Maps to show meeting locations and a YouTube video using YouTube&apos;s privacy-enhanced mode. Loading an embed connects your browser to Google or YouTube and can disclose your IP address, browser or device information, and the referring site. Those providers may use cookies or similar technologies under their own policies. Privacy-enhanced mode limits use of the embedded YouTube view for personalization, but it does not make the player a CCARC-hosted service.
            </p>
            <p>
              The site also links to services such as Google Drive, Google Meet, HamStudy, Slack, YouTube, and other amateur-radio or community websites. Those services receive information only when you follow a link or otherwise interact with them, and their own privacy terms apply.
            </p>
          </PolicySection>

          <PolicySection title="How long information is kept">
            <p>
              Exact retention periods vary. Form and email records are kept while volunteers respond and for as long as they remain useful for class coordination, membership administration, club records, dispute handling, or security. Copies may remain in Google Sheets, Slack, email accounts, Make.com execution history, backups, and Vercel logs until deleted or aged out under the club&apos;s account settings and each provider&apos;s retention practices. We consider the request&apos;s status, ongoing club relationship, administrative value, legal needs, and security needs when deciding whether records should remain.
            </p>
          </PolicySection>

          <PolicySection title="Security">
            <p>
              We use reasonable administrative and technical measures appropriate for a small volunteer organization, including HTTPS, restricted service credentials, input validation, spam filtering, and rate limiting. No website, email system, or storage service can guarantee perfect security.
            </p>
          </PolicySection>

          <PolicySection title="Your choices and privacy requests">
            <p>
              You may choose not to submit a form and may contact us by email instead. Browser controls can block or delete third-party cookies, although doing so may affect embedded maps or video. You can also open map and video links directly with the provider rather than interact with an embed.
            </p>
            <p>
              To ask what information we hold about you, request a correction or deletion, or raise another privacy concern, email us at{" "}
              <a className="font-bold text-pine-700 underline-offset-4 hover:underline" href={`mailto:${PRIVACY_EMAIL}?subject=Privacy%20Request`}>
                {PRIVACY_EMAIL}
              </a>.
              We may need to verify your identity and may retain information when permitted or required by law. Depending on where you live and whether a privacy law applies to CCARC, you may have additional rights. We will review requests under applicable law and will not discriminate against you for making a privacy request.
            </p>
          </PolicySection>

          <PolicySection title="Children's privacy">
            <p>
              This general-audience website is not directed to children under 13, and we do not knowingly solicit their personal information through the website. A child under 13 should not submit a form without a parent or guardian. If you believe a child has provided personal information, contact us so we can review and, where appropriate, delete it.
            </p>
          </PolicySection>

          <PolicySection title="Changes to this policy">
            <p>
              We may update this policy when the website, our service providers, or applicable requirements change. We will post the revised policy here and change the effective or last-updated date.
            </p>
          </PolicySection>

          <PolicySection title="Contact us">
            <p>
              Capital City Amateur Radio Club<br />
              Helena, Montana, United States<br />
              Email:{" "}
              <a className="font-bold text-pine-700 underline-offset-4 hover:underline" href={`mailto:${PRIVACY_EMAIL}?subject=Privacy%20Request`}>
                {PRIVACY_EMAIL}
              </a>
            </p>
          </PolicySection>
        </div>
      </article>
    </section>
  );
}

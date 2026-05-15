import type { Metadata } from "next";
import { ButtonLink, InfoCard } from "@/components/ui";
import { LINKS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "CCARC Slack",
  description: "Join the CCARC Slack workspace to stay connected between meetings, nets, and club activities.",
};

export default function SlackPage() {
  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Stay connected</p>
        <h1 className="mt-3 text-4xl font-black text-mountain-900 sm:text-5xl">Join the CCARC Slack</h1>
        <p className="mt-5 text-lg leading-8 text-stonewarm-700">
          Slack is CCARC&apos;s online clubhouse for staying connected between meetings. It is a good place to ask quick technical questions, share photos from projects or portable outings, coordinate activities, and get to know local hams.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={LINKS.SLACK_INVITE_URL}>Join CCARC Slack</ButtonLink>
          <ButtonLink href="/join-contact" variant="light">Request a Fresh Invite</ButtonLink>
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-7xl gap-5 md:grid-cols-3">
        <InfoCard title="What It Is For">
          <p>Ask questions, coordinate meetups, share radio projects, discuss operating plans, and continue conversations after nets and meetings.</p>
        </InfoCard>
        <InfoCard title="Who Can Join">
          <p>Club members, prospective members, and local hams who want a friendly place to stay connected with CCARC activity.</p>
        </InfoCard>
        <InfoCard title="Invite Link Note">
          <p>Slack invite links expire monthly. If the join button has expired, use the Join / Contact page to request a fresh invite.</p>
        </InfoCard>
      </div>

      <div className="mx-auto mt-8 max-w-4xl rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-mountain-900">Friendly Use Expectations</h2>
        <p className="mt-4 leading-7 text-stonewarm-700">
          To keep our community focused, welcoming, and productive, please follow this simple code of conduct while participating in any CCARC Slack channel. Abuse, harassment, or repeated disregard for these expectations may result in removal from the workspace.
        </p>
        <div className="mt-6 grid gap-5">
          <div>
            <h3 className="text-lg font-black text-mountain-900">Be Respectful and Helpful</h3>
            <p className="mt-2 leading-7 text-stonewarm-700">
              Assume positive intent, offer constructive advice, and keep feedback friendly. Personal attacks or harassment will not be tolerated.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-black text-mountain-900">Stay On Topic</h3>
            <p className="mt-2 leading-7 text-stonewarm-700">
              Channels are focused on amateur radio, club activity, and specific technical discussions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-black text-mountain-900">Refrain from Sensitive Topics</h3>
            <p className="mt-2 leading-7 text-stonewarm-700">
              Please keep discussions clear of the three Ps: politics, partisan issues, and proselytization or religious debate. Avoid overly sensitive content, including explicit content.
            </p>
          </div>
        </div>
        <p className="mt-6 leading-7 text-stonewarm-700">
          Our goal is a fun, technical space where everyone can share their passion for ham radio.
        </p>
      </div>
    </section>
  );
}

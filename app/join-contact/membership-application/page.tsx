import type { Metadata } from "next";
import { MembershipApplicationForm } from "@/components/MembershipApplicationForm";
import { LINKS } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Membership Application",
  description: "Apply for Capital City Amateur Radio Club membership online.",
};

export default function MembershipApplicationPage() {
  return (
    <section className="bg-stonewarm-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Join CCARC</p>
        <h1 className="mt-3 text-4xl font-black text-mountain-900 sm:text-5xl">Membership Application</h1>
        <p className="mt-5 text-lg leading-8 text-stonewarm-700">
          Apply online or download the paper PDF. Completed online applications are addressed to Al Simons at {LINKS.TREASURER_EMAIL}.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-4xl">
        <MembershipApplicationForm />
      </div>
    </section>
  );
}

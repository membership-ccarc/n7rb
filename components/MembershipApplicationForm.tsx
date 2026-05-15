"use client";

import { FormEvent, useState } from "react";
import { LINKS } from "@/lib/site-data";

type FormState = {
  name: string;
  callSign: string;
  mailingAddress: string;
  homePhone: string;
  cellPhone: string;
  email: string;
  membershipType: string;
  radioInterests: string;
  clubGoals: string;
};

const initialState: FormState = {
  name: "",
  callSign: "",
  mailingAddress: "",
  homePhone: "",
  cellPhone: "",
  email: "",
  membershipType: "Single membership - $25",
  radioInterests: "",
  clubGoals: "",
};

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  required = false,
  autoComplete,
}: {
  id: keyof FormState;
  label: string;
  value: string;
  onChange: (field: keyof FormState, value: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="grid gap-2 font-bold text-mountain-900" htmlFor={id}>
      {label}
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(id, event.target.value)}
        autoComplete={autoComplete}
        required={required}
        className="min-h-11 rounded-md border border-stonewarm-100 px-3 py-2 font-normal text-mountain-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-pine-700"
      />
    </label>
  );
}

export function MembershipApplicationForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState("");

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setError("");
  }

  function submitApplication(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.name.trim() || !form.mailingAddress.trim() || !form.email.trim()) {
      setError("Please enter your name, mailing address, and email address before sending.");
      return;
    }

    const subject = `CCARC Membership Application -- ${form.name.trim()}`;
    const body = [
      "Capital City Amateur Radio Club Membership Application",
      "",
      `Name: ${form.name}`,
      `Call Sign: ${form.callSign || "None provided"}`,
      `Mailing Address: ${form.mailingAddress}`,
      `Home Phone: ${form.homePhone || "None provided"}`,
      `Cell Phone: ${form.cellPhone || "None provided"}`,
      `Email Address: ${form.email}`,
      `Membership Type: ${form.membershipType}`,
      "",
      "Major interest in Amateur Radio:",
      form.radioInterests || "None provided",
      "",
      "Information, assistance, or training desired from the club:",
      form.clubGoals || "None provided",
      "",
      "Dues note: Annual dues are $25 for a single member or $31.25 for a family membership. Dues for new members may be pro-rated for the first year.",
    ].join("\n");

    // TODO: Replace this mailto handoff with a server-side email action once SMTP or an email API is configured.
    window.location.href = `mailto:${LINKS.TREASURER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="rounded-lg bg-white p-6 shadow-sm" onSubmit={submitApplication} noValidate aria-describedby="membership-help membership-error">
      <h2 className="text-2xl font-black text-mountain-900">Online Membership Application</h2>
      <p id="membership-help" className="mt-3 leading-7 text-stonewarm-700">
        Complete the application below and send it to Al Simons, CCARC Treasurer. Your email app will open with the completed application ready to review and send.
      </p>
      {error ? (
        <p id="membership-error" className="mt-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 font-bold text-red-800">
          {error}
        </p>
      ) : (
        <p id="membership-error" className="sr-only">Required fields are name, mailing address, and email address.</p>
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field id="name" label="Name" value={form.name} onChange={updateField} required autoComplete="name" />
        <Field id="callSign" label="Call Sign" value={form.callSign} onChange={updateField} autoComplete="off" />
        <div className="md:col-span-2">
          <Field id="mailingAddress" label="Mailing Address" value={form.mailingAddress} onChange={updateField} required autoComplete="street-address" />
        </div>
        <Field id="homePhone" label="Home Phone" value={form.homePhone} onChange={updateField} type="tel" autoComplete="tel" />
        <Field id="cellPhone" label="Cell Phone" value={form.cellPhone} onChange={updateField} type="tel" autoComplete="tel" />
        <div className="md:col-span-2">
          <Field id="email" label="Email Address" value={form.email} onChange={updateField} type="email" required autoComplete="email" />
        </div>
        <label className="grid gap-2 font-bold text-mountain-900 md:col-span-2" htmlFor="membershipType">
          Membership Type
          <select
            id="membershipType"
            name="membershipType"
            value={form.membershipType}
            onChange={(event) => updateField("membershipType", event.target.value)}
            className="min-h-11 rounded-md border border-stonewarm-100 px-3 py-2 font-normal text-mountain-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-pine-700"
          >
            <option>Single membership - $25</option>
            <option>Family membership - $31.25</option>
            <option>New member - please contact treasurer for pro-rated amount</option>
          </select>
        </label>
        <label className="grid gap-2 font-bold text-mountain-900 md:col-span-2" htmlFor="radioInterests">
          Major interest in Amateur Radio
          <textarea
            id="radioInterests"
            name="radioInterests"
            value={form.radioInterests}
            onChange={(event) => updateField("radioInterests", event.target.value)}
            className="min-h-28 rounded-md border border-stonewarm-100 px-3 py-2 font-normal text-mountain-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-pine-700"
            placeholder="Antennas, HF, V/UHF, emergency communications, public service, SOTA, POTA, contests, digital modes..."
          />
        </label>
        <label className="grid gap-2 font-bold text-mountain-900 md:col-span-2" htmlFor="clubGoals">
          What information, assistance, or training would you like from the club?
          <textarea
            id="clubGoals"
            name="clubGoals"
            value={form.clubGoals}
            onChange={(event) => updateField("clubGoals", event.target.value)}
            className="min-h-28 rounded-md border border-stonewarm-100 px-3 py-2 font-normal text-mountain-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-pine-700"
          />
        </label>
      </div>

      <div className="mt-6 rounded-lg bg-stonewarm-50 p-4 text-sm leading-6 text-stonewarm-700">
        <p>
          Checks should be made out to CCARC and mailed to: Al Simons WA1TYB, CCARC Treasurer, 4321 Berkshire Rd., East Helena MT 59635.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          className="min-h-11 rounded-md bg-pine-700 px-5 py-3 text-sm font-bold text-white hover:bg-pine-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700"
          type="submit"
        >
          Email Application to Treasurer
        </button>
        <a
          className="inline-flex min-h-11 items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-bold text-mountain-900 ring-1 ring-stonewarm-100 hover:bg-stonewarm-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700"
          href={LINKS.MEMBERSHIP_APPLICATION_PDF_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Paper PDF
        </a>
      </div>
    </form>
  );
}

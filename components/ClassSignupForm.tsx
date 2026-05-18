"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";

type LicenseInterest = "Technician" | "General" | "Not sure yet";
type ExperienceLevel = "Completely new" | "Studying now" | "Licensed but inactive" | "Currently licensed";
type ContactMethod = "Email" | "Phone" | "Text";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseInterest: LicenseInterest;
  experienceLevel: ExperienceLevel;
  mainInterests: string[];
  preferredContactMethod: ContactMethod;
  notes: string;
};

const initialState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  licenseInterest: "Technician",
  experienceLevel: "Completely new",
  mainInterests: [],
  preferredContactMethod: "Email",
  notes: "",
};

const mainInterestOptions = [
  "Emergency communications",
  "SOTA/POTA",
  "Outdoor/adventure radio",
  "Electronics/maker projects",
  "Community",
  "General curiosity",
] as const;

const inputClass =
  "min-h-11 rounded-md border border-stonewarm-100 px-3 py-2 font-normal text-mountain-900 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-pine-700";

function updateTextField(
  field: keyof Pick<FormState, "firstName" | "lastName" | "email" | "phone" | "notes">,
  value: string,
  setForm: Dispatch<SetStateAction<FormState>>,
  setError: Dispatch<SetStateAction<string>>,
) {
  setForm((current) => ({ ...current, [field]: value }));
  setError("");
}

export function ClassSignupForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = useState("");

  function toggleMainInterest(interest: string) {
    setForm((current) => {
      const nextInterests = current.mainInterests.includes(interest)
        ? current.mainInterests.filter((item) => item !== interest)
        : [...current.mainInterests, interest];

      return { ...current, mainInterests: nextInterests };
    });
    setError("");
  }

  async function submitSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim()) {
      setError("Please enter your first name, last name, and email address before sending.");
      return;
    }

    if (form.mainInterests.length === 0) {
      setError("Please choose at least one radio interest so we can connect you with the right volunteer.");
      return;
    }

    if ((form.preferredContactMethod === "Phone" || form.preferredContactMethod === "Text") && !form.phone.trim()) {
      setError("Please enter a phone number or choose email as your preferred contact method.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/class-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Signup request failed");
      }

      setForm(initialState);
      setStatus("success");
    } catch {
      setStatus("idle");
      setError("Something went wrong while sending your request. Please try again, or contact the club directly if the problem continues.");
    }
  }

  return (
    <form
      id="class-signup"
      className="rounded-lg bg-white p-6 shadow-sm"
      onSubmit={submitSignup}
      noValidate
      aria-describedby="class-signup-help class-signup-message"
    >
      <p className="text-sm font-bold uppercase tracking-wide text-pine-700">Get Started in Ham Radio</p>
      <h2 className="mt-2 text-2xl font-black text-mountain-900">Reserve a Spot</h2>
      <p id="class-signup-help" className="mt-3 leading-7 text-stonewarm-700">
        Tell us which class you are interested in. A club volunteer will follow up with next steps and beginner-friendly study resources.
      </p>

      {status === "success" ? (
        <p id="class-signup-message" className="mt-4 rounded-md border border-pine-700 bg-stonewarm-50 px-4 py-3 font-bold text-pine-900">
          Thanks! Your request has been received. A club volunteer will follow up soon. In the meantime, we&apos;ll send you a few study resources to help you get started.
        </p>
      ) : error ? (
        <p id="class-signup-message" className="mt-4 rounded-md border border-red-300 bg-red-50 px-4 py-3 font-bold text-red-800">
          {error}
        </p>
      ) : (
        <p id="class-signup-message" className="sr-only">
          Required fields are first name, last name, email address, class interest, experience level, main interests, and preferred contact method.
        </p>
      )}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 font-bold text-mountain-900" htmlFor="firstName">
          First name
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={(event) => updateTextField("firstName", event.target.value, setForm, setError)}
            autoComplete="given-name"
            required
            className={inputClass}
          />
        </label>
        <label className="grid gap-2 font-bold text-mountain-900" htmlFor="lastName">
          Last name
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={(event) => updateTextField("lastName", event.target.value, setForm, setError)}
            autoComplete="family-name"
            required
            className={inputClass}
          />
        </label>
        <label className="grid gap-2 font-bold text-mountain-900" htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(event) => updateTextField("email", event.target.value, setForm, setError)}
            autoComplete="email"
            required
            className={inputClass}
          />
        </label>
        <label className="grid gap-2 font-bold text-mountain-900" htmlFor="phone">
          Phone number <span className="text-sm font-medium text-stonewarm-700">Optional unless you prefer phone or text</span>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(event) => updateTextField("phone", event.target.value, setForm, setError)}
            autoComplete="tel"
            className={inputClass}
          />
        </label>
        <label className="grid gap-2 font-bold text-mountain-900" htmlFor="licenseInterest">
          License interest
          <select
            id="licenseInterest"
            name="licenseInterest"
            value={form.licenseInterest}
            onChange={(event) => {
              setForm((current) => ({ ...current, licenseInterest: event.target.value as LicenseInterest }));
              setError("");
            }}
            className={inputClass}
            required
          >
            <option>Technician</option>
            <option>General</option>
            <option>Not sure yet</option>
          </select>
        </label>
        <label className="grid gap-2 font-bold text-mountain-900" htmlFor="experienceLevel">
          Experience level
          <select
            id="experienceLevel"
            name="experienceLevel"
            value={form.experienceLevel}
            onChange={(event) => {
              setForm((current) => ({ ...current, experienceLevel: event.target.value as ExperienceLevel }));
              setError("");
            }}
            className={inputClass}
            required
          >
            <option>Completely new</option>
            <option>Studying now</option>
            <option>Licensed but inactive</option>
            <option>Currently licensed</option>
          </select>
        </label>

        <fieldset className="grid gap-3 md:col-span-2">
          <legend className="font-bold text-mountain-900">Main interests</legend>
          <p className="text-sm leading-6 text-stonewarm-700">Choose all that apply so we can point you toward useful resources.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {mainInterestOptions.map((interest) => (
              <label key={interest} className="flex min-h-11 items-center gap-3 rounded-md border border-stonewarm-100 px-3 py-2 font-bold text-mountain-900">
                <input
                  type="checkbox"
                  name="mainInterests"
                  value={interest}
                  checked={form.mainInterests.includes(interest)}
                  onChange={() => toggleMainInterest(interest)}
                  className="h-4 w-4 accent-pine-700"
                />
                <span>{interest}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="grid gap-3 md:col-span-2">
          <legend className="font-bold text-mountain-900">Preferred contact method</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {(["Email", "Phone", "Text"] as const).map((method) => (
              <label key={method} className="flex min-h-11 items-center gap-3 rounded-md border border-stonewarm-100 px-3 py-2 font-bold text-mountain-900">
                <input
                  type="radio"
                  name="preferredContactMethod"
                  value={method}
                  checked={form.preferredContactMethod === method}
                  onChange={() => {
                    setForm((current) => ({ ...current, preferredContactMethod: method }));
                    setError("");
                  }}
                  className="h-4 w-4 accent-pine-700"
                  required
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label className="grid gap-2 font-bold text-mountain-900 md:col-span-2" htmlFor="notes">
          Notes/questions
          <textarea
            id="notes"
            name="notes"
            value={form.notes}
            onChange={(event) => updateTextField("notes", event.target.value, setForm, setError)}
            className={`${inputClass} min-h-28`}
            placeholder="Tell us what you want to learn, any schedule concerns, or how we can help."
          />
        </label>
      </div>

      <div className="mt-6">
        <button
          className="min-h-11 rounded-md bg-pine-700 px-5 py-3 text-sm font-bold text-white hover:bg-pine-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700 disabled:cursor-not-allowed disabled:bg-stonewarm-700"
          type="submit"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Sending..." : "Reserve a Spot"}
        </button>
      </div>
    </form>
  );
}

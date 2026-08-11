"use client";

import { useActionState, useEffect, useRef, type FormEvent } from "react";
import { submitTrailerForm } from "@/app/we-need-trailers/actions";
import { acquireSubmissionLock } from "@/lib/submission-guard";
import styles from "./trailer-sections.module.css";

const initialTrailerFormState = { status: "idle" as const, message: "" };

export function TrailerDonationForm() {
  const [state, formAction, pending] = useActionState(submitTrailerForm, initialTrailerFormState);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const submissionLock = useRef(false);

  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (pending) return;
    submissionLock.current = false;
    if (state.status === "success") {
      formRef.current?.reset();
      if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
    }
  }, [pending, state.status]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (!acquireSubmissionLock(submissionLock)) event.preventDefault();
  }

  return (
    <form ref={formRef} className={styles.trailerForm} action={formAction} onSubmit={handleSubmit}>
      <div className={styles.formTopper}>
        <span>Trailer Donation Form</span>
        <h3>Tell us what you have.</h3>
      </div>

      <label className={styles.visuallyHidden} htmlFor="trailer-name">Name</label>
      <input id="trailer-name" type="text" name="name" placeholder="Name" autoComplete="name" maxLength={100} />

      <label className={styles.visuallyHidden} htmlFor="trailer-phone">Phone</label>
      <input id="trailer-phone" type="tel" name="phone" placeholder="Phone" autoComplete="tel" maxLength={40} />

      <label className={styles.visuallyHidden} htmlFor="trailer-email">Email</label>
      <input id="trailer-email" type="email" name="email" placeholder="Email" autoComplete="email" maxLength={254} required />

      <label className={styles.visuallyHidden} htmlFor="trailer-type">Trailer type</label>
      <select id="trailer-type" name="trailer_type" defaultValue="">
        <option value="">Select Trailer Type</option>
        <option value="Travel Trailer">Travel Trailer</option>
        <option value="Fifth Wheel">Fifth Wheel</option>
        <option value="Motor Coach/RV">Motor Coach/RV</option>
      </select>

      <label className={styles.visuallyHidden} htmlFor="trailer-message">Trailer details</label>
      <textarea
        id="trailer-message"
        name="message"
        rows={5}
        maxLength={2000}
        placeholder="Tell us about the trailer, condition, location, or any details we should know."
      />

      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="company-website">Company website</label>
        <input id="company-website" type="text" name="company_website" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedAtRef} type="hidden" name="form_started_at" defaultValue="" />

      <button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? "Sending…" : "Submit Trailer Info"}
      </button>
      <p
        className={styles.formStatus}
        data-status={state.status}
        aria-live="polite"
        role="status"
      >
        {state.message || "We’ll use this information only to follow up about your trailer."}
      </p>
    </form>
  );
}

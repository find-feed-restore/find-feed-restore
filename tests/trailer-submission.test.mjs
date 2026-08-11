import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { acquireSubmissionLock } from "../src/lib/submission-guard.ts";
import {
  buildResendPayload,
  handleTrailerSubmission,
  parseTrailerSubmission,
  sendTrailerSubmissionViaResend,
} from "../src/lib/trailer-submission.ts";

const now = 1_800_000_000_000;

function validForm(overrides = {}) {
  const values = {
    name: "  Taylor Donor  ",
    phone: " (555) 123-4567 ",
    email: " TAYLOR@example.com ",
    trailer_type: "Travel Trailer",
    message: "  A website test submission.  ",
    company_website: "",
    form_started_at: String(now - 5_000),
    ...overrides,
  };
  const formData = new FormData();
  for (const [key, value] of Object.entries(values)) formData.set(key, value);
  return formData;
}

const submission = {
  name: "Taylor Donor",
  phone: "(555) 123-4567",
  email: "taylor@example.com",
  trailerType: "Travel Trailer",
  message: "A website test submission.",
  submittedAt: new Date(now).toISOString(),
  originatingPage: "/we-need-trailers/",
};

test("rejects a missing required email", () => {
  const result = parseTrailerSubmission(validForm({ email: "" }), now);
  assert.deepEqual(result, { success: false, reason: "invalid" });
});

test("rejects an invalid email", () => {
  const result = parseTrailerSubmission(validForm({ email: "not-an-email" }), now);
  assert.deepEqual(result, { success: false, reason: "invalid" });
});

test("rejects malformed and overlong fields", () => {
  assert.deepEqual(parseTrailerSubmission(validForm({ trailer_type: "Boat" }), now), { success: false, reason: "invalid" });
  assert.deepEqual(parseTrailerSubmission(validForm({ name: "x".repeat(101) }), now), { success: false, reason: "invalid" });
  assert.deepEqual(parseTrailerSubmission(validForm({ message: "x".repeat(2_001) }), now), { success: false, reason: "invalid" });
});

test("rejects a populated honeypot and an implausibly fast submission", () => {
  assert.deepEqual(parseTrailerSubmission(validForm({ company_website: "spam.example" }), now), { success: false, reason: "spam" });
  assert.deepEqual(parseTrailerSubmission(validForm({ form_started_at: String(now - 200) }), now), { success: false, reason: "spam" });
});

test("normalizes fields and reaches the successful server-side delivery path", async () => {
  let delivered;
  const result = await handleTrailerSubmission(validForm(), {
    now: () => now,
    deliver: async (value) => {
      delivered = value;
      return true;
    },
  });
  assert.equal(result.status, "success");
  assert.match(result.message, /sent/i);
  assert.equal(delivered?.name, "Taylor Donor");
  assert.equal(delivered?.email, "taylor@example.com");
  assert.equal(delivered?.originatingPage, "/we-need-trailers/");
});

test("prevents duplicate submission lock acquisition", () => {
  const lock = { current: false };
  assert.equal(acquireSubmissionLock(lock), true);
  assert.equal(acquireSubmissionLock(lock), false);
});

test("maps configured sender and destination while using visitor email as Reply-To", () => {
  const payload = buildResendPayload(submission, "sender@example.com", "inbox@example.com");
  assert.equal(payload.from, "Find Feed Restore Website <sender@example.com>");
  assert.deepEqual(payload.to, ["inbox@example.com"]);
  assert.equal(payload.reply_to, "taylor@example.com");
  assert.match(payload.html, /Taylor Donor/);
  assert.match(payload.text, /Originating page: \/we-need-trailers\//);
});

test("sends the Resend request and reports its successful status", async () => {
  let requestUrl = "";
  let requestInit;
  const ok = await sendTrailerSubmissionViaResend(
    submission,
    { apiKey: "test-key", fromEmail: "sender@example.com", toEmail: "inbox@example.com" },
    async (url, init) => {
      requestUrl = String(url);
      requestInit = init;
      return new Response(null, { status: 202 });
    },
  );
  assert.equal(ok, true);
  assert.equal(requestUrl, "https://api.resend.com/emails");
  assert.equal(requestInit?.method, "POST");
  assert.equal(requestInit?.headers.Authorization, "Bearer test-key");
});

test("returns a safe generic error status when delivery fails", async () => {
  const result = await handleTrailerSubmission(validForm(), {
    now: () => now,
    deliver: async () => {
      throw new Error("provider detail that must not reach the browser");
    },
  });
  assert.equal(result.status, "error");
  assert.match(result.message, /try again/i);
  assert.doesNotMatch(result.message, /provider detail|Resend|stack/i);
});

test("reads only the three configured server-side environment variable names", () => {
  const actionSource = readFileSync("src/app/we-need-trailers/actions.ts", "utf8");
  for (const name of ["RESEND_API_KEY", "CONTACT_FROM_EMAIL", "CONTACT_TO_EMAIL"]) {
    assert.match(actionSource, new RegExp(`process\\.env\\.${name}`));
  }
  assert.doesNotMatch(actionSource, /NEXT_PUBLIC_/);
});

export const trailerTypes = ["Travel Trailer", "Fifth Wheel", "Motor Coach/RV"] as const;

export type TrailerSubmission = {
  name: string;
  phone: string;
  email: string;
  trailerType: (typeof trailerTypes)[number] | "";
  message: string;
  submittedAt: string;
  originatingPage: "/we-need-trailers/";
};

export type TrailerFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

type SubmissionDependencies = {
  now?: () => number;
  deliver: (submission: TrailerSubmission) => Promise<boolean>;
};

const invalidMessage = "Please check the form fields and try again.";
const deliveryErrorMessage = "We couldn’t send your request. Please try again.";
const successMessage = "Your trailer information was sent. Our team will follow up with you.";
const controlCharacters = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function textField(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : null;
}

function validText(value: string, maximumLength: number) {
  return value.length <= maximumLength && !controlCharacters.test(value);
}

export function parseTrailerSubmission(
  formData: FormData,
  now = Date.now(),
): { success: true; data: TrailerSubmission } | { success: false; reason: "invalid" | "spam" } {
  const honeypot = textField(formData, "company_website");
  const startedAt = textField(formData, "form_started_at");
  const name = textField(formData, "name");
  const phone = textField(formData, "phone");
  const email = textField(formData, "email");
  const trailerType = textField(formData, "trailer_type");
  const message = textField(formData, "message");

  if (honeypot === null || startedAt === null || honeypot !== "") {
    return { success: false, reason: "spam" };
  }

  const startedAtNumber = Number(startedAt);
  const elapsed = now - startedAtNumber;
  if (!Number.isFinite(startedAtNumber) || elapsed < 1_500 || elapsed > 86_400_000) {
    return { success: false, reason: "spam" };
  }

  if (name === null || phone === null || email === null || trailerType === null || message === null) {
    return { success: false, reason: "invalid" };
  }

  const normalizedEmail = email.toLowerCase();
  const validTrailerType = trailerType === "" || trailerTypes.includes(trailerType as (typeof trailerTypes)[number]);
  if (
    !normalizedEmail ||
    !emailPattern.test(normalizedEmail) ||
    !validText(normalizedEmail, 254) ||
    !validText(name, 100) ||
    !validText(phone, 40) ||
    !validText(message, 2_000) ||
    !validTrailerType
  ) {
    return { success: false, reason: "invalid" };
  }

  return {
    success: true,
    data: {
      name,
      phone,
      email: normalizedEmail,
      trailerType: trailerType as TrailerSubmission["trailerType"],
      message: message.replace(/\r\n?/g, "\n"),
      submittedAt: new Date(now).toISOString(),
      originatingPage: "/we-need-trailers/",
    },
  };
}

export async function handleTrailerSubmission(
  formData: FormData,
  dependencies: SubmissionDependencies,
): Promise<TrailerFormState> {
  const now = dependencies.now?.() ?? Date.now();
  const parsed = parseTrailerSubmission(formData, now);

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.reason === "invalid" ? invalidMessage : deliveryErrorMessage,
    };
  }

  try {
    const delivered = await dependencies.deliver(parsed.data);
    return delivered
      ? { status: "success", message: successMessage }
      : { status: "error", message: deliveryErrorMessage };
  } catch {
    return { status: "error", message: deliveryErrorMessage };
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function present(value: string) {
  return value || "Not provided";
}

export function buildResendPayload(submission: TrailerSubmission, fromEmail: string, toEmail: string) {
  const fields = [
    ["Name", present(submission.name)],
    ["Phone", present(submission.phone)],
    ["Email", submission.email],
    ["Trailer type", present(submission.trailerType)],
    ["Message", present(submission.message)],
    ["Submitted at", submission.submittedAt],
    ["Originating page", submission.originatingPage],
  ] as const;

  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><th style="padding:10px 14px;text-align:left;vertical-align:top;border-bottom:1px solid #e5e7eb">${escapeHtml(label)}</th><td style="padding:10px 14px;white-space:pre-wrap;border-bottom:1px solid #e5e7eb">${escapeHtml(value)}</td></tr>`,
    )
    .join("");
  const text = ["New Trailer Ministry Website Submission", "", ...fields.map(([label, value]) => `${label}: ${value}`)].join("\n");

  return {
    from: `Find Feed Restore Website <${fromEmail}>`,
    to: [toEmail],
    reply_to: submission.email,
    subject: "New Trailer Ministry Website Submission",
    html: `<div style="font-family:Arial,sans-serif;color:#071b2a"><h1 style="font-size:24px">New Trailer Ministry Website Submission</h1><table style="width:100%;max-width:720px;border-collapse:collapse">${rows}</table></div>`,
    text,
  };
}

export async function sendTrailerSubmissionViaResend(
  submission: TrailerSubmission,
  configuration: { apiKey: string; fromEmail: string; toEmail: string },
  fetcher: typeof fetch = fetch,
) {
  const response = await fetcher("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${configuration.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(buildResendPayload(submission, configuration.fromEmail, configuration.toEmail)),
  });

  return response.ok;
}

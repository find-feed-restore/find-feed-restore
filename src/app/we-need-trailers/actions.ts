"use server";

import "server-only";
import {
  handleTrailerSubmission,
  sendTrailerSubmissionViaResend,
  type TrailerFormState,
} from "@/lib/trailer-submission";

export async function submitTrailerForm(
  _previousState: TrailerFormState,
  formData: FormData,
): Promise<TrailerFormState> {
  return handleTrailerSubmission(formData, {
    deliver: async (submission) => {
      const apiKey = process.env.RESEND_API_KEY;
      const fromEmail = process.env.CONTACT_FROM_EMAIL;
      const toEmail = process.env.CONTACT_TO_EMAIL;

      if (!apiKey || !fromEmail || !toEmail) {
        console.error("[trailer-submission] Delivery unavailable: Resend configuration is incomplete.");
        return false;
      }

      try {
        const delivered = await sendTrailerSubmissionViaResend(submission, { apiKey, fromEmail, toEmail });
        if (!delivered) {
          console.error("[trailer-submission] Resend rejected the delivery request.");
        }
        return delivered;
      } catch {
        console.error("[trailer-submission] Resend delivery request failed.");
        return false;
      }
    },
  });
}

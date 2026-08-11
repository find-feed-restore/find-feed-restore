import "server-only";

import {
  fetchInstagramFeed,
  type InstagramFeedResult,
} from "./instagram-feed";

function safeDiagnostic(result: Extract<InstagramFeedResult, { success: false }>) {
  return {
    reason: result.reason,
    status: result.diagnostic?.status,
    code: result.diagnostic?.code,
  };
}

export async function getInstagramFeed(): Promise<InstagramFeedResult> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID;

  if (!accessToken || !accountId) {
    console.warn("Instagram feed is unavailable because server configuration is missing.");
    return { success: false, reason: "configuration" };
  }

  const result = await fetchInstagramFeed({ accessToken, accountId });
  if (!result.success) {
    console.error("Instagram feed request failed.", safeDiagnostic(result));
  }
  return result;
}

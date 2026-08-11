import { fetchInstagramFeed } from "../src/lib/instagram-feed.ts";

const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
const accountId = process.env.INSTAGRAM_ACCOUNT_ID;

if (!accessToken || !accountId) {
  console.error("Instagram provider verification skipped: server configuration is missing.");
  process.exitCode = 1;
} else {
  const result = await fetchInstagramFeed({ accessToken, accountId });
  if (!result.success) {
    console.error("Instagram provider verification failed.", {
      reason: result.reason,
      status: result.diagnostic?.status,
      code: result.diagnostic?.code,
    });
    process.exitCode = 1;
  } else {
    const summary = result.data.posts.reduce(
      (value, post) => {
        value.mediaTypes[post.mediaType] = (value.mediaTypes[post.mediaType] ?? 0) + 1;
        if (post.mediaUrl) value.withMedia += 1;
        if (post.caption) value.withCaptions += 1;
        if (post.permalink.startsWith("https://www.instagram.com/")) value.withInstagramPermalinks += 1;
        return value;
      },
      { posts: result.data.posts.length, mediaTypes: {}, withMedia: 0, withCaptions: 0, withInstagramPermalinks: 0 },
    );
    console.log("Instagram provider verification passed.", summary);
  }
}

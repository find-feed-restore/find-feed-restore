import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  fetchInstagramFeed,
  instagramCardMediaSource,
  instagramFeedLimit,
  instagramFeedRevalidateSeconds,
  normalizeInstagramMedia,
} from "../src/lib/instagram-feed.ts";

const profile = {
  id: "17841400000000000",
  user_id: "17841400000000000",
  username: "findfeedrestore",
  profile_picture_url: "https://scontent.cdninstagram.com/profile.jpg",
};

const media = [
  {
    id: "image-1",
    caption: "  An image caption  ",
    media_type: "IMAGE",
    media_product_type: "FEED",
    media_url: "https://scontent.cdninstagram.com/image.jpg",
    permalink: "https://www.instagram.com/p/image-1/",
    timestamp: "2026-08-01T12:00:00+0000",
  },
  {
    id: "video-1",
    caption: "A reel",
    media_type: "VIDEO",
    media_product_type: "REELS",
    media_url: "https://scontent.cdninstagram.com/video.mp4",
    thumbnail_url: "https://scontent.cdninstagram.com/video-cover.jpg",
    permalink: "https://www.instagram.com/reel/video-1/",
    timestamp: "2026-08-02T12:00:00+0000",
  },
  {
    id: "carousel-1",
    media_type: "CAROUSEL_ALBUM",
    media_product_type: "CAROUSEL_CONTAINER",
    media_url: "https://scontent.cdninstagram.com/carousel-cover.jpg",
    permalink: "https://www.instagram.com/p/carousel-1/",
  },
];

function jsonResponse(value, status = 200) {
  return new Response(JSON.stringify(value), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function mockFetcher({ profileValue = profile, mediaValue = { data: media }, status = 200 } = {}) {
  const requests = [];
  const fetcher = async (input, init) => {
    const url = new URL(input);
    requests.push({ url, init });
    return url.pathname.endsWith("/me/media")
      ? jsonResponse(mediaValue, status)
      : jsonResponse(profileValue, status);
  };
  return { fetcher, requests };
}

test("normalizes supported image, video/Reel, and carousel media", () => {
  const posts = media.map(normalizeInstagramMedia);
  assert.deepEqual(posts.map((post) => post?.mediaType), ["IMAGE", "VIDEO", "CAROUSEL_ALBUM"]);
  assert.equal(posts[0]?.caption, "An image caption");
  assert.equal(posts[1]?.thumbnailUrl, "https://scontent.cdninstagram.com/video-cover.jpg");
  assert.equal(posts[2]?.mediaUrl, "https://scontent.cdninstagram.com/carousel-cover.jpg");
});

test("selects image/carousel covers and video/Reel thumbnails for native cards", () => {
  const posts = media.map(normalizeInstagramMedia);
  assert.equal(instagramCardMediaSource(posts[0]), "https://scontent.cdninstagram.com/image.jpg");
  assert.equal(instagramCardMediaSource(posts[1]), "https://scontent.cdninstagram.com/video-cover.jpg");
  assert.equal(instagramCardMediaSource(posts[2]), "https://scontent.cdninstagram.com/carousel-cover.jpg");

  const clientSource = readFileSync(new URL("../src/components/instagram-feed.tsx", import.meta.url), "utf8");
  assert.match(clientSource, /post\.mediaType === "VIDEO"/);
  assert.match(clientSource, /post\.mediaType === "CAROUSEL_ALBUM"/);
  assert.doesNotMatch(clientSource, /<video|autoPlay|dangerouslySetInnerHTML/);
});

test("rejects malformed, unsupported, and unsafe media entries", () => {
  assert.equal(normalizeInstagramMedia(null), null);
  assert.equal(normalizeInstagramMedia({ ...media[0], media_type: "AUDIO" }), null);
  assert.equal(normalizeInstagramMedia({ ...media[0], permalink: "javascript:alert(1)" }), null);
  assert.equal(normalizeInstagramMedia({ ...media[0], permalink: "https://example.com/post" }), null);
  assert.equal(normalizeInstagramMedia({ ...media[0], media_url: undefined }), null);
});

test("uses the current Instagram Login API contract with a bounded cached request", async () => {
  const { fetcher, requests } = mockFetcher();
  const result = await fetchInstagramFeed(
    { accessToken: "test-token", accountId: "findfeedrestore" },
    fetcher,
  );

  assert.equal(result.success, true);
  assert.equal(result.success && result.data.posts.length, 3);
  assert.equal(requests.length, 2);
  for (const request of requests) {
    assert.equal(request.url.origin, "https://graph.instagram.com");
    assert.equal(request.url.searchParams.has("access_token"), false);
    assert.equal(request.init.headers.Authorization, "Bearer test-token");
    assert.equal(request.init.cache, "force-cache");
    assert.equal(request.init.next.revalidate, instagramFeedRevalidateSeconds);
  }
  const mediaRequest = requests.find(({ url }) => url.pathname.endsWith("/me/media"));
  assert.equal(mediaRequest.url.searchParams.get("limit"), String(instagramFeedLimit));
  assert.match(mediaRequest.url.searchParams.get("fields"), /thumbnail_url/);
  assert.match(mediaRequest.url.searchParams.get("fields"), /media_product_type/);
});

test("accepts the configured account as a user ID or authorized username", async () => {
  for (const accountId of [profile.id, profile.username]) {
    const { fetcher } = mockFetcher();
    const result = await fetchInstagramFeed({ accessToken: "test-token", accountId }, fetcher);
    assert.equal(result.success, true);
  }
});

test("rejects account mismatches and empty normalized feeds", async () => {
  const mismatch = mockFetcher();
  assert.deepEqual(
    await fetchInstagramFeed({ accessToken: "test-token", accountId: "another-account" }, mismatch.fetcher),
    { success: false, reason: "account_mismatch" },
  );

  const empty = mockFetcher({ mediaValue: { data: [{ id: "bad" }] } });
  assert.deepEqual(
    await fetchInstagramFeed({ accessToken: "test-token", accountId: profile.id }, empty.fetcher),
    { success: false, reason: "empty" },
  );
});

test("maps provider, token, non-JSON, timeout, and missing-configuration failures safely", async () => {
  const token = mockFetcher({ profileValue: { error: { code: 190 } }, mediaValue: { error: { code: 190 } }, status: 400 });
  const tokenResult = await fetchInstagramFeed({ accessToken: "expired", accountId: profile.id }, token.fetcher);
  assert.equal(tokenResult.success, false);
  assert.equal(!tokenResult.success && tokenResult.reason, "token");
  assert.equal(!tokenResult.success && tokenResult.diagnostic?.code, 190);

  const nonJson = async () => new Response("not json", { status: 502 });
  const badResult = await fetchInstagramFeed({ accessToken: "test-token", accountId: profile.id }, nonJson);
  assert.deepEqual(badResult, { success: false, reason: "provider", diagnostic: { status: 502 } });

  const timeout = async () => { throw new Error("network failure with sensitive detail"); };
  assert.deepEqual(
    await fetchInstagramFeed({ accessToken: "test-token", accountId: profile.id }, timeout),
    { success: false, reason: "provider" },
  );
  assert.deepEqual(
    await fetchInstagramFeed({ accessToken: "", accountId: "" }, timeout),
    { success: false, reason: "configuration" },
  );
});

test("keeps Instagram credentials in the server-only provider", () => {
  const clientSource = readFileSync(new URL("../src/components/instagram-feed.tsx", import.meta.url), "utf8");
  const serverSource = readFileSync(new URL("../src/lib/instagram-provider.ts", import.meta.url), "utf8");
  assert.doesNotMatch(clientSource, /INSTAGRAM_ACCESS_TOKEN|INSTAGRAM_ACCOUNT_ID|process\.env/);
  assert.match(serverSource, /^import "server-only";/);
  assert.match(serverSource, /process\.env\.INSTAGRAM_ACCESS_TOKEN/);
  assert.match(serverSource, /process\.env\.INSTAGRAM_ACCOUNT_ID/);
  assert.doesNotMatch(serverSource, /NEXT_PUBLIC_/);
});

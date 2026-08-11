export const instagramApiVersion = "v26.0";
export const instagramFeedLimit = 24;
export const instagramFeedRevalidateSeconds = 900;

export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export type SocialPost = {
  id: string;
  caption?: string;
  mediaType: InstagramMediaType;
  mediaProductType?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  permalink: string;
  timestamp?: string;
};

export type InstagramProfile = {
  username: string;
  profilePictureUrl?: string;
};

export type InstagramFeedData = {
  profile: InstagramProfile;
  posts: SocialPost[];
};

export type InstagramFeedFailureReason =
  | "configuration"
  | "account_mismatch"
  | "empty"
  | "provider"
  | "token";

export type InstagramFeedResult =
  | { success: true; data: InstagramFeedData }
  | {
      success: false;
      reason: InstagramFeedFailureReason;
      diagnostic?: { status?: number; code?: number };
    };

export function instagramCardMediaSource(post: SocialPost) {
  return post.mediaType === "VIDEO" ? post.thumbnailUrl : post.mediaUrl;
}

type InstagramFetchInit = RequestInit & {
  next?: { revalidate: number; tags: string[] };
};

export type InstagramFetcher = (
  input: string | URL,
  init?: InstagramFetchInit,
) => Promise<Response>;

type RawProfile = {
  id?: unknown;
  user_id?: unknown;
  username?: unknown;
  profile_picture_url?: unknown;
  error?: { code?: unknown };
};

type RawMedia = {
  id?: unknown;
  caption?: unknown;
  media_type?: unknown;
  media_product_type?: unknown;
  media_url?: unknown;
  thumbnail_url?: unknown;
  permalink?: unknown;
  timestamp?: unknown;
};

type RawMediaPage = {
  data?: unknown;
  error?: { code?: unknown };
};

function optionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function safeHttpsUrl(value: unknown, expectedHost?: string) {
  const text = optionalString(value);
  if (!text) return undefined;

  try {
    const url = new URL(text);
    if (url.protocol !== "https:") return undefined;
    if (expectedHost && url.hostname !== expectedHost && !url.hostname.endsWith(`.${expectedHost}`)) {
      return undefined;
    }
    return url.href;
  } catch {
    return undefined;
  }
}

function normalizeTimestamp(value: unknown) {
  const timestamp = optionalString(value);
  if (!timestamp || Number.isNaN(Date.parse(timestamp))) return undefined;
  return timestamp;
}

export function normalizeInstagramMedia(value: unknown): SocialPost | null {
  if (!value || typeof value !== "object") return null;
  const media = value as RawMedia;
  const id = optionalString(media.id);
  const permalink = safeHttpsUrl(media.permalink, "instagram.com");
  const mediaType = media.media_type;

  if (
    !id ||
    !permalink ||
    (mediaType !== "IMAGE" && mediaType !== "VIDEO" && mediaType !== "CAROUSEL_ALBUM")
  ) {
    return null;
  }

  const mediaUrl = safeHttpsUrl(media.media_url);
  const thumbnailUrl = safeHttpsUrl(media.thumbnail_url);
  if ((mediaType === "IMAGE" || mediaType === "CAROUSEL_ALBUM") && !mediaUrl) return null;

  return {
    id,
    caption: optionalString(media.caption),
    mediaType,
    mediaProductType: optionalString(media.media_product_type),
    mediaUrl,
    thumbnailUrl,
    permalink,
    timestamp: normalizeTimestamp(media.timestamp),
  };
}

function providerCode(payload: RawProfile | RawMediaPage) {
  const code = payload.error?.code;
  return typeof code === "number" && Number.isFinite(code) ? code : undefined;
}

function providerFailure(status: number, payload: RawProfile | RawMediaPage): InstagramFeedResult {
  const code = providerCode(payload);
  return {
    success: false,
    reason: status === 401 || code === 190 ? "token" : "provider",
    diagnostic: { status, code },
  };
}

async function readJson<T>(response: Response): Promise<T | null> {
  try {
    const value: unknown = await response.json();
    return value && typeof value === "object" ? (value as T) : null;
  } catch {
    return null;
  }
}

export async function fetchInstagramFeed(
  configuration: { accessToken: string; accountId: string },
  fetcher: InstagramFetcher = fetch,
): Promise<InstagramFeedResult> {
  const accessToken = configuration.accessToken.trim();
  const expectedAccount = configuration.accountId.trim();
  if (!accessToken || !expectedAccount) return { success: false, reason: "configuration" };

  const profileUrl = new URL(`https://graph.instagram.com/${instagramApiVersion}/me`);
  profileUrl.searchParams.set("fields", "id,user_id,username,profile_picture_url");

  const mediaUrl = new URL(`https://graph.instagram.com/${instagramApiVersion}/me/media`);
  mediaUrl.searchParams.set(
    "fields",
    "id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp",
  );
  mediaUrl.searchParams.set("limit", String(instagramFeedLimit));

  const request = (url: URL, tag: string) =>
    fetcher(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "force-cache",
      next: { revalidate: instagramFeedRevalidateSeconds, tags: [tag] },
      signal: AbortSignal.timeout(8_000),
    });

  let profileResponse: Response;
  let mediaResponse: Response;
  try {
    [profileResponse, mediaResponse] = await Promise.all([
      request(profileUrl, "instagram-profile"),
      request(mediaUrl, "instagram-feed"),
    ]);
  } catch {
    return { success: false, reason: "provider" };
  }

  const [profilePayload, mediaPayload] = await Promise.all([
    readJson<RawProfile>(profileResponse),
    readJson<RawMediaPage>(mediaResponse),
  ]);

  if (!profilePayload) return { success: false, reason: "provider", diagnostic: { status: profileResponse.status } };
  if (!mediaPayload) return { success: false, reason: "provider", diagnostic: { status: mediaResponse.status } };
  if (!profileResponse.ok) return providerFailure(profileResponse.status, profilePayload);
  if (!mediaResponse.ok) return providerFailure(mediaResponse.status, mediaPayload);

  const username = optionalString(profilePayload.username);
  const accountIdentifiers = [profilePayload.id, profilePayload.user_id, profilePayload.username]
    .map((value) => (value == null ? "" : String(value)))
    .filter(Boolean);
  if (!username || !accountIdentifiers.includes(expectedAccount)) {
    return { success: false, reason: "account_mismatch" };
  }

  const rawPosts = Array.isArray(mediaPayload.data) ? mediaPayload.data : [];
  const posts = rawPosts
    .map(normalizeInstagramMedia)
    .filter((post): post is SocialPost => post !== null)
    .slice(0, instagramFeedLimit);
  if (posts.length === 0) return { success: false, reason: "empty" };

  return {
    success: true,
    data: {
      profile: {
        username,
        profilePictureUrl: safeHttpsUrl(profilePayload.profile_picture_url),
      },
      posts,
    },
  };
}

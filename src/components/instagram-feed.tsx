"use client";

import Image from "next/image";
import { useState } from "react";
import {
  instagramCardMediaSource,
  type InstagramFeedData,
  type SocialPost,
} from "@/lib/instagram-feed";
import styles from "./hope-sections.module.css";

const initialPostCount = 16;
const loadMoreCount = 8;

function formattedDate(timestamp?: string) {
  if (!timestamp) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(timestamp));
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <rect x="4.5" y="4.5" width="23" height="23" rx="6" />
      <circle cx="16" cy="16" r="5.5" />
      <circle cx="23.5" cy="8.7" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MediaBadge({ post }: { post: SocialPost }) {
  if (post.mediaType === "VIDEO") {
    return <span className={styles.mediaBadge} aria-label="Video post"><span className={styles.playTriangle} /></span>;
  }
  if (post.mediaType === "CAROUSEL_ALBUM") {
    return <span className={styles.carouselBadge} aria-label="Carousel post"><span /><span /></span>;
  }
  return null;
}

function InstagramCard({ post, profile }: { post: SocialPost; profile: InstagramFeedData["profile"] }) {
  const mediaSource = instagramCardMediaSource(post);
  const date = formattedDate(post.timestamp);
  const mediaAlt = post.caption
    ? `Instagram post: ${post.caption.slice(0, 120)}`
    : `Instagram post by ${profile.username}`;

  return (
    <li className={styles.instagramCard} data-media-type={post.mediaType}>
      <a href={post.permalink} target="_blank" rel="noopener noreferrer" aria-label={`Open Instagram post${date ? ` from ${date}` : ""} by ${profile.username}`}>
        <div className={styles.instagramMedia}>
          {mediaSource ? (
            <Image src={mediaSource} alt={mediaAlt} fill sizes="(max-width: 757px) 100vw, (max-width: 1017px) 50vw, (max-width: 1217px) 33vw, 25vw" unoptimized />
          ) : (
            <div className={styles.mediaPlaceholder} aria-hidden="true"><InstagramGlyph /></div>
          )}
          <MediaBadge post={post} />
        </div>
        <div className={styles.instagramHeader}>
          <span className={styles.instagramAvatar}>
            {profile.profilePictureUrl ? (
              <Image src={profile.profilePictureUrl} alt="" width={44} height={44} unoptimized />
            ) : (
              <InstagramGlyph />
            )}
          </span>
          <span className={styles.instagramAuthor}>
            <strong>{profile.username}</strong>
            {date ? <time dateTime={post.timestamp}>{date}</time> : null}
          </span>
          <span className={styles.instagramMark}><InstagramGlyph /></span>
        </div>
        <div className={styles.instagramCaption}>
          <p>{post.caption || "View this post on Instagram."}</p>
          <span>Read on Instagram</span>
        </div>
      </a>
    </li>
  );
}

export function InstagramFeed({ data }: { data: InstagramFeedData }) {
  const [visibleCount, setVisibleCount] = useState(Math.min(initialPostCount, data.posts.length));
  const visiblePosts = data.posts.slice(0, visibleCount);
  const hasMore = visibleCount < data.posts.length;

  return (
    <>
      <ul className={styles.instagramGrid} aria-label="Find Feed Restore Instagram posts">
        {visiblePosts.map((post) => <InstagramCard key={post.id} post={post} profile={data.profile} />)}
      </ul>
      {hasMore ? (
        <div className={styles.loadMoreRow}>
          <button type="button" onClick={() => setVisibleCount((count) => Math.min(count + loadMoreCount, data.posts.length))}>
            Load More
          </button>
        </div>
      ) : null}
    </>
  );
}

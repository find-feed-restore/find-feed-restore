"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import styles from "./live-here-sections.module.css";

const assetRoot = "/images/campaigns/live-here-love-here";

export function LiveHereStoryVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showPoster, setShowPoster] = useState(true);

  function playVideo() {
    setShowPoster(false);
    void videoRef.current?.play().catch(() => undefined);
  }

  return (
    <div className={styles.videoFrame}>
      <video
        ref={videoRef}
        className={styles.video}
        src={`${assetRoot}/keller-williams-volunteer-day.mp4`}
        controls
        preload="metadata"
        controlsList="nodownload"
      >
        Your browser does not support the video element.
      </video>
      {showPoster ? (
        <button
          className={styles.videoPoster}
          type="button"
          aria-label="Play Video about movie-poster-ffr"
          onClick={playVideo}
        >
          <Image
            src={`${assetRoot}/video-poster.jpg`}
            alt=""
            fill
            sizes="(max-width: 767px) calc(100vw - 40px), 50vw"
          />
          <span className={styles.videoPlay} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}

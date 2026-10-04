"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./program-sections.module.css";

export type ProgramVideoSource = {
  id: string;
  title: string;
  thumbnail: string;
};

// Shows a thumbnail until the visitor presses play, so YouTube's player only loads when it is wanted.
export function ProgramVideo({ video }: { video: ProgramVideoSource }) {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.programVideo}>
      {active ? (
        <iframe
          src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          className={styles.programVideoPoster}
          type="button"
          aria-label={`Play ${video.title}`}
          onClick={() => setActive(true)}
        >
          <Image src={video.thumbnail} alt="" fill sizes="(max-width: 1280px) calc(100vw - 48px), 1232px" />
          <span className={styles.programVideoPlay} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

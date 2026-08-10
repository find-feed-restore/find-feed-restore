"use client";

import { useState } from "react";
import { EditorialContainer, EditorialHeading } from "./editorial-sections";
import styles from "./testimonial-videos.module.css";

type TestimonialVideo = {
  id: string;
  start?: number;
  eyebrow: string;
  title: string;
  description: string;
  thumbnail: string;
};

function TestimonialVideoCard({ video }: { video: TestimonialVideo }) {
  const [active, setActive] = useState(false);
  const label = `Play ${video.title}`;
  const query = `?autoplay=1&rel=0${video.start ? `&start=${video.start}` : ""}`;

  return (
    <article className={styles.card}>
      {active ? (
        <div className={styles.activeFrame}>
          <iframe
            src={`https://www.youtube.com/embed/${video.id}${query}`}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : (
        <button
          className={styles.thumbnail}
          type="button"
          aria-label={label}
          data-youtube-id={video.id}
          data-start={video.start}
          onClick={() => setActive(true)}
        >
          <span
            className={styles.thumbnailImage}
            style={{ backgroundImage: `url("${video.thumbnail}")` }}
          />
          <span className={styles.thumbnailOverlay} />
          <span className={styles.playButton} aria-hidden="true" />
        </button>
      )}
      <div className={styles.content}>
        <span>{video.eyebrow}</span>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
      </div>
    </article>
  );
}

export function TestimonialVideos({ videos }: { videos: TestimonialVideo[] }) {
  return (
    <section className={styles.section} aria-labelledby="testimonial-videos-title">
      <EditorialContainer>
        <EditorialHeading
          eyebrow="Featured Videos"
          title="See The Mission In Motion"
          description="Watch stories, outreach moments, community events, and real impact from Find Feed Restore."
          id="testimonial-videos-title"
        />
        <div className={styles.grid}>
          {videos.map((video) => (
            <TestimonialVideoCard video={video} key={video.id} />
          ))}
        </div>
      </EditorialContainer>
    </section>
  );
}

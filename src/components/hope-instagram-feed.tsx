import { InstagramFeed } from "./instagram-feed";
import { getInstagramFeed } from "@/lib/instagram-provider";
import styles from "./hope-sections.module.css";

const instagramProfileUrl = "https://www.instagram.com/findfeedrestore";

export function HopeFeedLoading() {
  return (
    <div className={styles.feedFrame} data-provider="instagram" data-provider-state="loading" aria-busy="true">
      <p className={styles.feedLoading} role="status">Loading social updates…</p>
    </div>
  );
}

export async function HopeInstagramFeed() {
  const result = await getInstagramFeed();

  return (
    <div className={styles.feedFrame} data-provider="instagram" data-provider-state={result.success ? "ready" : "error"}>
      {result.success ? (
        <InstagramFeed data={result.data} />
      ) : (
        <div className={styles.feedFallback} role="status">
          <p>Social updates are temporarily unavailable.</p>
          <a href={instagramProfileUrl} target="_blank" rel="noopener noreferrer">
            Visit Find Feed Restore on Instagram
          </a>
        </div>
      )}
    </div>
  );
}

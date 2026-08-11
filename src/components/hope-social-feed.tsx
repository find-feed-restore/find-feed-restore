"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./hope-sections.module.css";

const feedSlug = "findfeedrestore";
const embedUrl = `https://www.juicer.io/embed/${feedSlug}/embed-code.js`;

type JuicerWindow = Window & {
  Juicer?: {
    initialize?: () => void;
    remove?: () => void;
  };
};

export function HopeSocialFeed() {
  const feedRef = useRef<HTMLUListElement>(null);
  const readyRef = useRef(false);
  const [providerState, setProviderState] = useState<"loading" | "ready" | "error">("loading");

  const initializeOnRemount = useCallback(() => {
    const feed = feedRef.current;
    if (!feed || feed.hasAttribute("data-juicer-claimed")) return;

    (window as JuicerWindow).Juicer?.initialize?.();
  }, []);

  useEffect(() => {
    function handleLoaded(event: Event) {
      const detail = (event as CustomEvent<{ feed?: { slug?: string } }>).detail;
      if (detail?.feed?.slug === feedSlug) {
        readyRef.current = true;
        setProviderState("ready");
      }
    }

    document.addEventListener("juicer:feedLoaded", handleLoaded);
    const timeout = window.setTimeout(() => {
      if (!readyRef.current) setProviderState("error");
    }, 12_000);

    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("juicer:feedLoaded", handleLoaded);
      (window as JuicerWindow).Juicer?.remove?.();
    };
  }, []);

  return (
    <div className={styles.feedFrame} data-provider-state={providerState}>
      <ul ref={feedRef} className="juicer-feed" data-feed-id={feedSlug} aria-label="Find Feed Restore social media posts" />
      {providerState === "error" ? (
        <div className={styles.feedFallback} role="status">
          <p>Social updates are temporarily unavailable.</p>
          <a href="https://www.instagram.com/findfeedrestore" target="_blank" rel="noopener noreferrer">
            Visit Find Feed Restore on Instagram
          </a>
        </div>
      ) : null}
      <Script
        id="juicer-findfeedrestore"
        src={embedUrl}
        strategy="lazyOnload"
        onReady={initializeOnRemount}
        onError={() => setProviderState("error")}
      />
    </div>
  );
}

"use client";

import ReactDOM from "react-dom";

// Preloads a hero background from public/images/backgrounds/ (see scripts/build-background-images.mjs).
// The media queries must match the stylesheet's, so each screen fetches only the file it paints.
export function HeroImagePreload({ name, mobileMaxWidth = 767 }: { name: string; mobileMaxWidth?: number }) {
  const mobile = `(max-width: ${mobileMaxWidth}px)`;

  ReactDOM.preload(`/images/backgrounds/${name}-mobile.webp`, { as: "image", fetchPriority: "high", media: mobile });
  ReactDOM.preload(`/images/backgrounds/${name}.webp`, { as: "image", fetchPriority: "high", media: `not all and ${mobile}` });
  return null;
}

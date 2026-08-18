"use client";

import ReactDOM from "react-dom";

export function HeroImagePreload({ href }: { href: string }) {
  ReactDOM.preload(href, { as: "image", fetchPriority: "high" });
  return null;
}

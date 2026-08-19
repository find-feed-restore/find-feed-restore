import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const legacyHomepageParameters = [
  "trk",
  "et_fb",
  "PageSpeed",
  "et_core_page_resource",
] as const;

export function proxy(request: NextRequest) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const destination = request.nextUrl.clone();
  let removedLegacyParameter = false;

  for (const parameter of legacyHomepageParameters) {
    if (destination.searchParams.has(parameter)) {
      destination.searchParams.delete(parameter);
      removedLegacyParameter = true;
    }
  }

  return removedLegacyParameter
    ? NextResponse.redirect(destination, 308)
    : NextResponse.next();
}

export const config = {
  matcher: "/",
};

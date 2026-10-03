// Pages that set their own `openGraph` replace the inherited one, which drops the
// root `app/opengraph-image.jpg`, so they reference the shared image explicitly.
export const defaultOpenGraphImages = [
  {
    url: "/opengraph-image.jpg",
    width: 1200,
    height: 630,
    alt: "Find Feed Restore: housing for homeless families with children in Central Florida",
  },
];

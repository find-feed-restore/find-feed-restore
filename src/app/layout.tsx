import type { Metadata } from "next";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@/components/google-analytics";
import "./globals.css";

const notoSerif = localFont({
  src: "../../public/fonts/noto-serif.woff2",
  variable: "--font-noto-serif",
  display: "swap",
  weight: "100 900",
});

const notoSans = localFont({
  src: "../../public/fonts/noto-sans.woff2",
  variable: "--font-noto-sans",
  display: "swap",
  weight: "100 900",
});

const heebo = localFont({
  src: "../../public/fonts/heebo.woff2",
  variable: "--font-heebo",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.findfeedrestore.com"),
  title: "Find Feed Restore - Housing for Central Florida Families",
  description:
    "Find, Feed & Restore is a Central Florida nonprofit helping homeless families with children find housing, financial stability, counseling, and hope.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Find Feed Restore",
    title: "Find Feed Restore - Housing for Central Florida Families",
    description:
      "A Central Florida nonprofit helping homeless families with children find housing, financial stability, counseling, and hope.",
  },
  twitter: {
    card: "summary_large_image",
  },
  // Preview deployments (dev.findfeedrestore.com and pull request URLs) must never be indexed.
  ...(process.env.VERCEL_ENV === "preview" ? { robots: { index: false, follow: false } } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-US"
      className={`${notoSerif.variable} ${notoSans.variable} ${heebo.variable}`}
    >
      <body>
        {children}
        {/* Visits are only counted on the live site, never on dev or pull request previews. */}
        {process.env.VERCEL_ENV === "production" ? <GoogleAnalytics /> : null}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
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
  title: "Find Feed Restore - Home - Find Feed Restore",
  description:
    "Find, Feed & Restore is a Central Florida non-profit organization working to end homelessness for families with children through housing, financial literacy, and mental health counseling.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Find Feed Restore",
    title: "Find Feed Restore - Home - Find Feed Restore",
    description:
      "A Central Florida non-profit organization helping homeless families with children through housing, financial literacy, and mental health counseling.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-US"
      className={`${notoSerif.variable} ${notoSans.variable} ${heebo.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

import Script from "next/script";

// Google Analytics 4 web stream for property 347722460 (Find Feed Restore).
const measurementId = "G-C884BBPZ88";

// Loaded during browser idle time so the tag never competes with the page's own content.
export function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="lazyOnload" />
      <Script id="google-analytics" strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}');`}
      </Script>
    </>
  );
}

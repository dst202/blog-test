import SiteAnalyticsScript from "@lib/PageScript";
import "@scss/global.scss";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
      <SiteAnalyticsScript />
    </>
  );
}

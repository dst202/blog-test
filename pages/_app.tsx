import "@scss/global.scss";
import { Analytics } from "@vercel/analytics/react";
import { NextScript } from "next/document";

export default function App({ Component, pageProps }) {
  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
      />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', {
              page_path: window.location.pathname,
            });
                `,
        }}
      />
      <Component {...pageProps} />
      <Analytics />
      <NextScript />
    </>
  );
}

import Head from "next/head";
import styles from "./layout.module.scss";

const name = "Samuel Omanchi";
export const siteTitle =
  "Samuel Omanchi: Front end developer based in Bremen, Germany. Writing about HTML, CSS, JavaScript, React and React Native.";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="Samuel Omanchi"
          content="Front end developer based in Bremen, Germany. Writing about HTML, CSS, JavaScript, React and React Native."
        />
        <meta
          name="description"
          content="Nigerian front end developer based in Bremen, Germany. Writing about HTML, CSS, JavaScript, React and React Native."
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-134151606-2"
        ></script>

        <script
          async
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'UA-134151606-2');`,
          }}
        />
      </Head>

      <main>{children}</main>
    </div>
  );
}

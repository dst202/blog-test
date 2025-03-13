import Footer from '@components/Footer';
import Header from '@components/Header/Header';
import { Layout } from '@components/layout';
import Wrapper from '@components/Wrapper';
import '@scss/global.scss';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
  title: 'Surya Chilukuri - EmbeddedEngineer',
  description:
    'Welcome to my personal portfolio and blog! My name is Devi Surya Teja Chilukuri, an Electrical and Embedded Systems Engineer based in Regensburg, Germany. I specialize in creating innovative hardware and firmware solutions for automotive, IoT, and industrial applications. Explore my portfolio to see projects like a low-cost RP2040-based JTAG debugger and more, and visit my blog for technical insights and the latest trends in embedded systems and electronics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
        ></script>

        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1276398176503233'
          crossOrigin='anonymous'
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');`,
          }}
        />
      </Head>
      <Analytics />
      <body>
        <Wrapper>
          <Header />
          <main>
            <Layout>
              {children}
              <Footer />
            </Layout>
          </main>
        </Wrapper>
      </body>
    </html>
  );
}

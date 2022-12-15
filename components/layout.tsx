import Head from 'next/head';
import { ReactNode } from 'react-markdown';
import styles from './layout.module.scss';

const name = 'Samuel Omanchi';
export const siteTitle = 'Samuel Omanchi';

export const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Welcome to my personal portfolio and blog! My name is Samuel Omanchi. I am a frontend developer with a passion for creating intuitive and engaging user experiences. Explore my portfolio to see some of my recent projects, and check out my blog for insights on frontend development and the latest industry trends..'
        />
        <meta
          name='Samuel Omanchi'
          content='Front end web developement articles. Learn HTML, CSS, Javacript, React, React Native.'
        />
        {/* <meta
          property='og:image'
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        /> */}

        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <meta name='og:title' content={siteTitle} />
        <meta name='twitter:card' content='summary_large_image' />
      </Head>

      <main>{children}</main>
    </div>
  );
};

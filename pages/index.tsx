import Head from "next/head";
import { siteTitle, Layout } from "@components/layout";
import utilStyles from "@scss/utils.module.scss";
import { getSortedPostsData } from "@lib/posts";
import Link from "next/link";
import Hero from "@components/Hero/Hero";
import Header from "@components/Header/Header";
import Footer from "@components/Footer";
import React from "react";
import Wrapper from "@components/Wrapper";
import Career from "@components/Career";
import BlogList from "@components/BlogList";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const firstFourPost = allPostsData.map((post) => post).splice(0, 4);
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Header home={true} />
      <header>
        <Hero />
      </header>
      <main>
        <Layout>
          <Wrapper>
            <>
              <section className="blog" id="latest-blog">
                <h2>
                  <span>Blog</span>
                </h2>

                <h2>Latest Posts</h2>

                <BlogList allPostsData={firstFourPost} styles={utilStyles} />
                <span className={utilStyles.link}>
                  <Link href="/blog">
                    <a>View all posts</a>
                  </Link>
                </span>
              </section>
            </>
          </Wrapper>
        </Layout>
      </main>
      <Career />
      <Footer />
    </>
  );
}

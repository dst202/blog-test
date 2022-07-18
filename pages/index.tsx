import Head from "next/head";
import Layout, { siteTitle } from "@components/layout";
import utilStyles from "@scss/utils.module.scss";
import { getSortedPostsData } from "@lib/posts";
import Link from "next/link";
import Hero from "@components/Hero/Hero";
import Date from "@components/Date/date";
import Header from "@components/Header/Header";
import Footer from "@components/Footer";
import React from "react";
import Wrapper from "@components/Wrapper";
import { ArrowForwardIcon } from "@components/icons";
import Career from "@components/Career";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>{" "}
      <Header home={true} />
      <header>
        <Hero />
      </header>
      <main>
        <Layout>
          <Wrapper>
            <>
              <section className="blog" id="blog">
                <h2>
                  <span>Blog</span>
                </h2>

                <h2>Latest Posts</h2>

                <ul className={utilStyles.list}>
                  {allPostsData
                    .map(({ id, date, title, description, tags, image }) => (
                      <React.Fragment key={id}>
                        <li className={utilStyles.listItem}>
                          <span className={utilStyles.imageContainer}>
                            <img src={image} alt={title} />
                          </span>

                          {/* <span>10 mins read</span> */}
                          <span className={utilStyles.rightDescription}>
                            <small className={utilStyles.lightText}>
                              <Date dateString={date} />
                            </small>{" "}
                            <Link href={`/blog/${id}`}>
                              <a className="title">{title}</a>
                            </Link>
                            <small>{description}</small>
                            <Link href={`/blog/${id}`}>
                              <span className={utilStyles.link}>
                                <a>
                                  <span>Read</span>
                                  <ArrowForwardIcon />
                                </a>
                              </span>
                            </Link>
                          </span>
                        </li>
                      </React.Fragment>
                    ))
                    .splice(0, 4)}
                </ul>
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

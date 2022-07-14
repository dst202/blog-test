import Head from "next/head";
import Layout, { siteTitle } from "@components/layout";
import utilStyles from "@scss/utils.module.scss";
import { getSortedPostsData } from "@lib/posts";
import Link from "next/link";
import Hero from "@components/Hero/Hero";
import Date from "@components/Date/date";
import Header from "@components/Header/Header";
import Services from "@components/MyServices/Services";
import Portfolio from "@components/Portfolio/Portfolio";
import AboutMe from "@components/AboutMe/AboutMe";
import Testimonials from "@components/Testimonials/Testimonials";
import Contact from "@components/Contact/Contact";
import Footer from "@components/Footer/Footer";
import React from "react";

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
        <Services />{" "}
        <Layout>
          <section className="blog" id="blog">
            <h3>
              <span>Blog</span>
              <br />I write every now and then
            </h3>

            <ul className={utilStyles.list}>
              {allPostsData.map(({ id, date, title, description }) => (
                <React.Fragment key={id}>
                  {" "}
                  <li className={utilStyles.listItem}>
                    {/* <span>10 mins read</span> */}
                    <br />
                    <small className={utilStyles.lightText}>
                      <Date dateString={date} />
                    </small>{" "}
                    <br />
                    <Link href={`/blog/${id}`}>
                      <a className="title">{title}</a>
                    </Link>
                    <br />
                    <small>{description}</small>
                    <br />
                    <Link href={`/blog/${id}`}>
                      <a className="show-post">
                        show post{" "}
                        <svg
                          id="arrow_right_alt_black_24dp"
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="11.871"
                          viewBox="0 0 43.855 11.871"
                        >
                          <path
                            id="Path_1"
                            data-name="Path 1"
                            d="M0,0H43.855V11.871H0Z"
                            fill="none"
                          />
                          <path
                            id="Path_2"
                            data-name="Path 2"
                            d="M30.914,11H4v2H30.914v3l8.941-4L30.914,8Z"
                            transform="translate(0 -6.065)"
                            fill="#7e56c2"
                          />
                        </svg>
                      </a>
                    </Link>
                  </li>
                  <br /> <br />
                </React.Fragment>
              ))}
            </ul>
            <Link href="/blog">
              <a
                className="link-item-button"
                style={{
                  margin: "auto",
                  display: "block",
                  maxWidth: "200px",
                  textAlign: "center",
                }}
              >
                View all posts
              </a>
            </Link>
          </section>
        </Layout>
        <Portfolio />
        <AboutMe />
        <Testimonials />
      </main>
      <Contact />
      <Footer />
    </>
  );
}

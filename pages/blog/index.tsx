import Head from "next/head";
import Layout, { siteTitle } from "../../components/layout";
import utilStyles from "@scss/utils.module.scss";
import { getSortedPostsData } from "../../lib/posts";
import Header from "../../components/Header/Header";
import Link from "next/link";
import Footer from "@components/Footer";
import React from "react";
import Date from "@components/Date";
import Wrapper from "@components/Wrapper";
import Input from "@components/Forms/Input";
import Button from "@components/Forms/Button";
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const [selected, setSelected] = React.useState({});

  const toggleSelected = (buttonItem: string) => {
    setSelected({ [buttonItem]: selected[buttonItem] ? false : true });
  };

  return (
    <>
      <Header />
      <Layout>
        <Head>
          <title>{siteTitle}</title>
        </Head>

        <Wrapper>
          <section className="main-container blog">
            <h1>
              <span>/</span>blog-posts<span>.</span>
            </h1>{" "}
            <div className="filter-posts">
              <Input type="text" placeholder="Find post easily" />

              <div className="category-buttons">
                {["React", "React Native", "Javascript", "CSS"].map(
                  (buttonItem) => (
                    <Button
                      key={buttonItem}
                      label={buttonItem}
                      mode={"secondary"}
                      className={selected[buttonItem] ? "selected" : ""}
                      onClick={() => toggleSelected(buttonItem)}
                    />
                  )
                )}
              </div>
            </div>
            <ul className={utilStyles.list}>
              {allPostsData.map(({ id, date, title, description }) => (
                <React.Fragment key={title}>
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
                  <br />
                  <br />
                </React.Fragment>
              ))}
            </ul>
          </section>
          <section
            className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
          ></section>
        </Wrapper>
      </Layout>
      <Footer />
    </>
  );
}

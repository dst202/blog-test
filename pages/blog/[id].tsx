import { Layout } from "../../components/layout";
import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";
import utilStyles from "../../scss/utils.module.scss";
import Date from "../../components/Date";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { TwitterIcon } from "@components/icons";

const components: object = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <SyntaxHighlighter
        customStyle={{
          borderRadius: "10px",
          fontSize: "18px",
        }}
        style={coldarkDark}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, "")}
        {...props}
      />
    ) : (
      <code
        className={className}
        style={{ fontFamily: "JetBrains Mono" }}
        {...props}
      />
    );
  },
};

export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export default function Post({ postData }) {
  return (
    <>
      <Header />
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>

        <article className={utilStyles.article}>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>

          <ReactMarkdown components={components} children={postData.markdown} />
        </article>

        <div className="shareArticle">
          <div className="hr-div">
            <div className="share_article_hr"></div>{" "}
            <span>Share article on</span>
          </div>

          <a
            href={`https://twitter.com/intent/tweet?url=https://samuelomanchi.me/blog/${postData.slug}&text=${postData.title}&via=cortehzz`}
          >
            <TwitterIcon />
          </a>
        </div>
      </Layout>
      <Footer />
    </>
  );
}

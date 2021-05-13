import Link from "next/link";
import Head from "next/head";
import Layout from "../../components/layout";
import Header from "../../components/Header/Header";

export default function Products() {
  return (
    <Layout>
      <Head>
        <title>Products</title>
      </Head>

      <Header />
      <h1>Product Page</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}

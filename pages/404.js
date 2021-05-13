import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Layout from "../components/layout";

// pages/404.js
export default function Custom404() {
  return (
    <>
      <Header />
      <Layout>
        <h1 style={{ minHeight: "70vh" }}>404 - Page Not Found</h1>
      </Layout>

      <Footer />
    </>
  );
}

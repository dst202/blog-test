import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main class="main-container">
        <h1>
          <span>/</span>projects<span>.</span>
        </h1>
        <h2>Some selected projects I've worked on recently</h2>
        <div class="articles">
          <ul class="cards">
            <li class="cards_item">
              <div class="card">
                <img class="content-image" src="/images/atpeacecentre.png" />
              </div>
              <div class="article-caption">
                <h3>At Peace Centre.</h3>
                <p>
                  Landing page for Pschology and Physiotherapy clinic. With
                  embedded Facebook and Twitter feeds.
                </p>
                <div class="project-links">
                  <a
                    href="http://atpeacecentre.com.ng"
                    target="_blanck"
                    rel="noopener"
                  >
                    atpeacecentre.com.ng
                  </a>
                  <a
                    href="https://github.com/cortehz/atpeacecentre-main"
                    target="_blanck"
                    rel="noopener"
                  >
                    <img
                      src="/images/github.svg"
                      alt="github icon linking to codebase"
                    />
                  </a>
                </div>
              </div>
            </li>

            <li class="cards_item">
              <div class="card">
                <img class="content-image" src="/images/countries.jpg" />
              </div>
              <div class="article-caption">
                <h3>Rest Countries</h3>
                <p>
                  World Countries details from the restcountries.eu API. Fetch
                  countries as well as single country detail view with React and
                  React Router.
                </p>
                <div class="project-links">
                  <a
                    href="http://countryer.netlify.app"
                    target="_blanck"
                    rel="noopener"
                  >
                    countryer.netlify.app
                  </a>
                  <a
                    href="https://github.com/cortehz/countries"
                    target="_blanck"
                    rel="noopener"
                  >
                    <img
                      src="//images/github.svg"
                      alt="github icon linking to codebase"
                    />
                  </a>
                </div>
              </div>
            </li>

            <li class="cards_item">
              <div class="card">
                <img class="content-image" src="/images/northwind.png" />
              </div>
              <div class="article-caption">
                <h3>Northwind.</h3>
                <p>
                  Landing page for Agricultural Co. Northwind Limited. Built
                  with React and Netlify functions for submitting emails via
                  SendGrid API.
                </p>
                <div class="project-links">
                  <a
                    href="https://github.com/cortehz/northwind-new"
                    target="_blanck"
                    rel="noopener"
                  >
                    northwindlimited.com.ng
                  </a>
                  <a
                    href="https://github.com/cortehz/atpeacecentre-main"
                    target="_blanck"
                    rel="noopener"
                  >
                    <img
                      src="/images/github.svg"
                      alt="github icon linking to codebase"
                    />
                  </a>
                </div>
              </div>
            </li>

            <li class="cards_item">
              <div class="card">
                <img class="content-image" src="/images/shortme.png" />
              </div>
              <div class="article-caption">
                <h3>Shortly.</h3>
                <p>
                  URL Shortener built with rel.ly API & ReactJS. API currently
                  taken down by the maintainer.
                </p>
                <div class="project-links">
                  <a
                    href="https://short-me.netlify.app/"
                    target="_blanck"
                    rel="noopener"
                  >
                    short-me.netlify.app
                  </a>
                  <a
                    href="https://github.com/cortehz/shortly"
                    target="_blanck"
                    rel="noopener"
                  >
                    <img
                      src="/images/github.svg"
                      alt="github icon linking to codebase"
                    />
                  </a>
                </div>
              </div>
            </li>

            <li class="cards_item">
              <div class="card">
                <img class="content-image" src="/images/libertytherapies.jpg" />
              </div>
              <div class="article-caption">
                <h3>Liberty Therapies.</h3>
                <p>
                  Landing page and Blog for Liberty Therapies - currently
                  discontinued. Logo design by me
                </p>
                <div class="project-links">
                  <a
                    href="http://libertytherapies.netlify.app/"
                    target="_blanck"
                    rel="noopener"
                  >
                    libertytherapies.netlify.app/
                  </a>
                  <a
                    href="https://github.com/cortehz/liberty-advanced"
                    target="_blanck"
                    rel="noopener"
                  >
                    <img
                      src="/images/github.svg"
                      alt="github icon linking to codebase"
                    />
                  </a>
                </div>
              </div>
            </li>

            <li class="cards_item">
              <div class="card">
                <img class="content-image" src="/images/lifechitect.jpg" />
              </div>
              <div class="article-caption">
                <h3>Lifechitect App.</h3>
                <p>
                  Landing page for Lifechitect App - A lifestyle analytics app
                </p>
                <div class="project-links">
                  <a
                    href="http://lifechitectapp.netlify.app"
                    target="_blanck"
                    rel="noopener"
                  >
                    lifechitectapp.netlify.app
                  </a>
                  <a
                    href="https://github.com/cortehz/lifechitect-web"
                    target="_blanck"
                    rel="noopener"
                  >
                    <img
                      src="/images/github.svg"
                      alt="github icon linking to codebase"
                    />
                  </a>
                </div>
              </div>
            </li>

            <li class="cards_item">
              <div class="card">
                <img class="content-image" src="/images/easybank.png" />
              </div>
              <div class="article-caption">
                <h3>Easy Bank.</h3>
                <p>
                  Landing page for fictional Easy Bank. Built from scratch with
                  HTML, SCSS(flexbox) and vanillaJS.
                </p>
                <div class="project-links">
                  <a
                    href="http://easy-bank.netlify.app"
                    target="_blanck"
                    rel="noopener"
                  >
                    easy-bank.netlify.app
                  </a>
                  <a
                    href="https://github.com/cortehz/easybank"
                    target="_blanck"
                    rel="noopener"
                  >
                    <img
                      src="/images/github.svg"
                      alt="github icon linking to codebase"
                    />
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}

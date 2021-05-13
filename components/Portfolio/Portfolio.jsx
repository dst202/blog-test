const Portfolio = () => {
  return (
    <section className="portfolio" id="project">
      <h4>Featured Projects</h4>
      <p>
        Here are some of the selected projects I have been involved in on over
        time.
      </p>
      <div className="project-card-container">
        <div className="left-card">
          <div className="one-card-container">
            <div className="card-item-one"></div>
            <div className="card-info">
              <h5>Easy Bank</h5>
              <p>Landing Page for fictional startup Easy Bank</p>
              <div className="tags">#frontend #scss #flexbox</div>
              <div className="project-links">
                <a href="https://easy-bank.netlify.app" target="_blanck">
                  <img src="/images/link.svg" alt="live link to project" />
                </a>
                <a href="#" target="_blanck">
                  <img
                    src="/images/github.svg"
                    alt="github icon link to project"
                  />
                </a>
              </div>
            </div>
          </div>

          <div className="one-card-container">
            <div className="card-item-two"></div>
            <div className="card-info">
              <h5>At Peace Centre</h5>
              <p>Landing page for At Peace Centre - Psychotherapy Clinic</p>
              <div className="tags">#frontend #scss #flexbox #jQuery</div>
              <div className="project-links">
                <a href="https://atpeacecentre.com.ng" target="_blanck">
                  <img
                    src="/images/link.svg"
                    alt="github icon link to project"
                  />
                </a>
                <a href="https://atpeacecentre.com.ng" target="_blanck">
                  <img
                    src="/images/github.svg"
                    alt="github icon link to project"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="right-card">
          <div className="one-card-container">
            <div className="card-item-one"></div>
            <div className="card-info">
              <h5>Northwind Limited</h5>
              <p>
                Landing Page for Northwind built with ReactJs, deployed on
                netlify with cloud functions and SendGrid api for mail
                submission.
              </p>
              <div className="tags">
                #react #frontend #netlifyfunctions #scss #flexbox
              </div>
              <div className="project-links">
                <a href="https://northwindlimited.com.ng" target="_blanck">
                  <img
                    src="/images/link.svg"
                    alt="github icon link to project"
                  />
                </a>
                <a href="#" target="_blanck">
                  <img
                    src="/images/github.svg"
                    alt="github icon link to project"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="one-card-container">
            <div className="card-item-two"></div>
            <div className="card-info">
              <h5>Shortly</h5>
              <p>URL Shortener built with the rel.ly api</p>
              <div className="tags">#reactjs #api #frontend #scss #flexbox</div>
              <div className="project-links">
                <a href="https://short-me.netlify.app" target="_blanck">
                  <img
                    src="/images/link.svg"
                    alt="github icon link to project"
                  />
                </a>
                <a href="#">
                  <img
                    src="/images/github.svg"
                    alt="github icon link to project"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a className="link-item-button" href="/projects">
        See my work
      </a>
    </section>
  );
};

export default Portfolio;

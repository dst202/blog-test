import Link from "next/link";

const AboutMe = () => {
  return (
    <section className="lets-create" id="about">
      <div className="create-copy">
        <h4>Let's create awesome Projects together</h4>
        <p>
          I am a front end engineer at{" "}
          <a href="https://intuitive-ai.de" target="_blank">
            Intuitive.Ai.
          </a>{" "}
          I am currently based in Bremen, Germany. My competencies lie in the
          conversion of hi-fidelity and low-fidelity prototypes to excellent
          client-facing interfaces with a strong enthusiasm for the performant
          and accessible. I employ modern tools, libraries and frameworks such
          as HTML5, CSS3, JavaScript (React & React Native) to build interfaces
          across the web and on mobile. I am particularly nifty in crafting
          complex layouts from scratch using CSS Flexbox as well as reusable
          React components.
        </p>

        <p>
          I take pride in my work ethic, communication skills and ability to
          work independently and be able to fit into a team. I have a solid
          understanding of version control using Github, which solidifies my
          ability to work in a team and on various projects. Get in touch if you
          would like to talk about a project and how I could help. Shoot me a
          quick <a href="mailto:omanchis@gmail.com">email</a>
        </p>
        <div className="button-container">
          <Link href="/blog">
            <a className="link-item-button">Read my blog</a>
          </Link>
        </div>
      </div>
      <div className="portfolio-photo-section">
        <img
          src="/images/Group 24@2x.png"
          className="portrait"
          alt="portfolio portrait"
        />
      </div>
    </section>
  );
};

export default AboutMe;

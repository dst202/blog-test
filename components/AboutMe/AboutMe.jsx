import Link from "next/link";

const AboutMe = () => {
  return (
    <section class="lets-create" id="about">
      <div class="create-copy">
        <h4>Let's create awesome Projects together</h4>
        <p>
          I am skilled front end developer based in Bremen, Germany available
          for your next project. My competencies lie in the conversion of
          hi-fidelity and low-fidelity prototypes to excellent client-facing
          interfaces. I employ modern tools, libraries and frameworks such as
          HTML5, CSS3, JavaScript (React & React Native) to build interfaces
          across the web and on mobile. I am particularly nifty in crafting
          complex layouts from scratch using CSS Flexbox.
        </p>

        <p>
          I take pride in my work ethic, communication skills and ability to
          work independently and be able to fit into a team. I have a solid
          understanding of version control using Github, which solidifies my
          ability to work in a team and on various projects. I am currently
          available for hire. Shoot me a quick{" "}
          <a href="mailto:omanchis@gmail.com">email</a>
        </p>

        <p class="name">- Samuel Omanchi</p>
        <div class="button-container">
          <Link href="/blog">
            <a class="link-item-button">Read my blog</a>
          </Link>
        </div>
      </div>
      <div class="portfolio-photo-section">
        <img
          src="/images/Group 24@2x.png"
          class="portrait"
          alt="portfolio portrait"
        />
      </div>
    </section>
  );
};

export default AboutMe;

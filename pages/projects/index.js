import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import projects from "../../components/Portfolio/projects";

export default function Home() {
  return (
    <>
      <Header home={false} />
      <main className="main-container portfolio">
        <h1>
          <span>/</span>projects<span>.</span>
        </h1>
        <h2>Some selected projects I've worked on recently</h2>
        <div className="project-card-container">
          {projects.map((project, idx) => {
            return (
              <div className="left-card" key={idx}>
                <div className="card-item-one">
                  <img
                    src={project.projectImage}
                    alt={`${project.projectImage} website screenshot mockup`}
                  />
                </div>
                <div className="card-info">
                  <h5>{project.projectName}</h5>
                  <p>{project.projectDescription}</p>
                  <div className="tags">
                    <ul className="tech__stack flex">
                      {project.technologies.map((tech) => {
                        return <li>{tech}</li>;
                      })}
                    </ul>
                  </div>
                  <div className="project-links flex">
                    <a
                      href={project.liveLink}
                      target="_blanck"
                      className="flex"
                    >
                      <span>View project</span>
                    </a>
                    {project.githubLink !== "" ? (
                      <a href={project.githubLink} target="_blanck">
                        <img
                          src="/images/github.svg"
                          alt="github icon link to project"
                        />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}

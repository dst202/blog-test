import Wrapper from "@components/Wrapper";

const Career = () => {
  const career = [
    {
      employer: "Snubes",
      location: "Berlin",
      jobDescription: "Frontend Engineer",
      current: true,
    },
    {
      employer: "Intuitive AI",
      location: "Hamburg",
      jobDescription: "UI Designer & Frontend Engineer",
      current: false,
    },
    {
      employer: "A&G Software",
      location: "Bremen",
      jobDescription: "UI Designer & Frontend Engineer",
      current: false,
    },
  ];

  return (
    <Wrapper>
      <section className="career" id="career">
        <h2>Professional Career</h2>

        <ul className={"career-list"}>
          {career.map(({ current, jobDescription, location, employer }) => (
            <li key={employer}>
              <span className="circle-container">
                <div className="circle" style={{ opacity: !current ? 0.5 : 1 }}>
                  <div className="circle-inner"></div>
                </div>
                <div className="dotted-line"></div>
              </span>

              <span>
                <div className="title">
                  <h3>{jobDescription}</h3>
                  {current && (
                    <svg
                      width="4"
                      height="5"
                      viewBox="0 0 4 5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2" cy="2.35712" r="2" fill="#D9D9D9" />
                    </svg>
                  )}
                  <p>
                    <small>{current ? "Present" : ""}</small>
                  </p>
                </div>

                <span className="employer">
                  <h4>{employer}</h4>
                  <svg
                    width="4"
                    height="5"
                    viewBox="0 0 4 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="2" cy="2.35712" r="2" fill="#D9D9D9" />
                  </svg>
                  <p>
                    <small>{location}</small>
                  </p>
                </span>
              </span>
            </li>
          ))}
        </ul>

        <a href="" className="link">
          <span>View all jobs</span>
        </a>
      </section>
    </Wrapper>
  );
};

export default Career;

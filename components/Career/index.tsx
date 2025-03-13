const Career = () => {
  const career = [
    {
      employer: 'NAF GmbH',
      location: 'Freiberg, DE',
      jobDescription: 'Hardware Engineer (Part time)',
      current: true,
    },
    {
      employer: 'Vitesco Technologies AG',
      location: 'Regensburg, DE',
      jobDescription: 'Pre-development Intern',
      current: false,
    },
    {
      employer: 'ATOM Motors',
      location: 'Guntur, IN',
      jobDescription: 'BMS Test Engineer',
      current: false,
    },
    {
      employer: 'Silicon Touch Technologies',
      location: 'Vijayawada, IN',
      jobDescription: 'Embedded Systems Intern',
      current: false,
    },
  ];

  return (
    <section className='career' id='career'>
      <h2>Professional Career</h2>

      <ul className='career-list'>
        {career.map(({ current, jobDescription, location, employer }) => (
          <li key={employer}>
            <span className='circle-container'>
              <div className='circle' style={{ opacity: !current ? 0.5 : 1 }}>
                <div className='circle-inner'></div>
              </div>
              <div className='dotted-line'></div>
            </span>

            <span>
              <div className='title'>
                <h3>{jobDescription}</h3>
                {current && (
                  <svg
                    width='4'
                    height='5'
                    viewBox='0 0 4 5'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <circle cx='2' cy='2.35712' r='2' fill='#D9D9D9' />
                  </svg>
                )}
                <p>
                  <small>{current ? 'Present' : ''}</small>
                </p>
              </div>

              <span className='employer'>
                <h4>{employer}</h4>
                <svg
                  width='4'
                  height='5'
                  viewBox='0 0 4 5'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <circle cx='2' cy='2.35712' r='2' fill='#D9D9D9' />
                </svg>
                <p>
                  <small>{location}</small>
                </p>
              </span>
            </span>
          </li>
        ))}
      </ul>

      <a href='' className='link'>
        <span>View all jobs</span>
      </a>
    </section>
  );
};

export default Career;

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <h4>
        Ready to create <br />
        your next project?
      </h4>
      <a href="mailto:omanchis@gmail.com">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <path
            id="message-square"
            d="M21,15a2,2,0,0,1-2,2H7L3,21V5A2,2,0,0,1,5,3H19a2,2,0,0,1,2,2Z"
            transform="translate(-2 -2)"
            fill="none"
            stroke="#7e57c2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
        Get in touch
      </a>
    </section>
  );
};

export default Contact;

const Testimonials = () => {
  return (
    <section class="testimonial">
      <h3>
        <span>Testimonial</span>
        <br />
        Don't take my word for it
      </h3>

      <ul class="cards">
        <li class="cards__item">
          <div class="card">
            <div class="card__content">
              <div class="card__title">
                <div class="testimonial-image">
                  <img src="/images/uche.jpg" alt="Uche Ajalam" />
                </div>
                <div>
                  <h4>Uche Ajalam</h4>
                  <p>Lead UI/UX, Gelacop Systems</p>
                </div>
              </div>
              <p class="card__text">
                I partnered with Samuel to develop my portfolio website, which I
                had designed. I found him incredibly helpful and patient as I
                wanted everything to be pixel-perfect. I ended up with a website
                I not only loved, but which also fit my design aesthetic. I can
                confidently say that he exceeded my expectations.
              </p>
              <span class="ratings">
                <img
                  src="/images/star.svg"
                  alt="customer review with star ratings"
                />
              </span>
            </div>
          </div>
        </li>
        <li class="cards__item">
          <div class="card">
            <div class="card__content">
              <div class="card__title">
                <div class="testimonial-image">
                  <img src="/images/hassan.jpeg" alt="Hassan Saleh" />
                </div>
                <div>
                  <h4>Hassan Saleh</h4>
                  <p>CEO, Northwind Limited</p>
                </div>
              </div>
              <p class="card__text">
                I've worked with Omanchi for over 4 years now and from building
                my personal portfolio to Northwind's landing page, I could not
                recommend him more than enough. He is highly skilled and most of
                all very communicative.
              </p>
              <span class="ratings">
                <img
                  src="/images/star.svg"
                  alt="customer review with star ratings"
                />
              </span>
            </div>
          </div>
        </li>
        <li class="cards__item">
          <div class="card">
            <div class="card__content">
              <div class="card__title">
                <div class="testimonial-image">
                  <img src="/images/steve_okwori.jpg" alt="Stephen Okwori" />
                </div>
                <div>
                  <h4>Stephen Okwori</h4>
                  <p>Sticmirac Security Consultancy</p>
                </div>
              </div>
              <p class="card__text">
                Samuel is the aboslute problem solver. Being a Security Expert,
                I was looking to reach a wider audience with my Security
                Consultancy and he has helped me gain a lot of ground with a
                website that my visitors absolutely love.
              </p>
              <span class="ratings">
                <img
                  src="/images/star.svg"
                  alt="customer review with star ratings"
                />
              </span>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default Testimonials;

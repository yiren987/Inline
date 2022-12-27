import React from "react";

export const Section1 = () => {
  return (
    <section id="services">
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-7 pt-5 pt-lg-0 order-2 order-lg-1 d-flex align-items-center">
            <div data-aos="zoom-out">
              <div>
                <h1>
                  Build Your own schedule with <span>Scheduler</span>
                </h1>
                <h2>
                  Scheduler create a reliable way to keep track of your own free
                  time as well as the free time of people in your inner circle !
                </h2>
              </div>
              <div className="text-center text-lg-start">
                <a href="#about" className="btn-get-started">
                  Get Started
                </a>
              </div>
            </div>
          </div>
          <div
            className="col-lg-4 order-1 order-lg-2 iphone-calendar"
            data-aos="zoom-out"
            data-aos-delay="300"
          >
            <img
              src="img/iphone-calendar.png"
              className="img-fluid animated"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

import '../App.css';
import React from "react";

function About() {
  return (
    <div>
      <section className="aboutus">
        <div className="container">
          <div className="row">
            <div className="col-md-4 my-auto"></div>
            <div className="col-md-8 my-auto"></div>
          </div>
        </div>
      </section>
      {/*<------------------------------------*/}

      <section className="section bg-light border-botton">
        <div className="container">
          <h3 className="main-heading"> Our Company</h3>
          <div className="underline-company"> </div>
          <p>
            Since day one, our mission has been to deliver the best <br />
            products at the lowest price. We’re making it easier to <br /> shop
            smart with your wallet. So you can get the things <br /> you love at
            a price you love. Qualilty products that improve <br />
            and bring happiness to people's lives. That has been our <br />{" "}
            mission since day one, hasn’t changed—and it never will.
          </p>
        </div>
      </section>

      {/* Compant Vision, mission and values */}
      <section className="section bg-light border-top">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-4 text-center">
              <h3 className="main-heading-values"> Team Droppers Values</h3>
              <div className="underline mx-auto "></div>
            </div>
            <div className="col-md-4 text-center">
              <h5>No hidden fees, no surprises</h5>
              <p>
                We’re making it easier to shop smart with your wallet. So you
                can get the things you love at a price you love for the ones you
                love.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <h5>We’ve got your back</h5>
              <p>
                Unlike most companies, our business was built to help you say
                yes—not to profit off mistakes or misfortune. When you win, we
                win.
              </p>
            </div>
            <div className="col-md-4 text-center">
              <h5>So long, shipping fees</h5>
              <p>
                Whether you,re buying big or small, shopping for a product that
                wows, or planning to impress that special soul, you want to feel
                good about the things you buy. And with Droppers, you can.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default About;
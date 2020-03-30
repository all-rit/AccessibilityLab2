import React from "react";
import "./../../vendor/bootstrap/css/bootstrap.min.css";
import "./../../css/agency.min.css";
import "./../../css/style.css";

const About = ({ title, description, links }) => {
  if (links === undefined) {
    links = [null, null, null];
  }

  return (
    <div class="container">
      <section class="page-section" style={{ paddingBottom: "25px" }}>
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <br />
              <br />
              <h2 class="section-heading text-uppercase">
                Color Clicker: About
              </h2>
            </div>
          </div>
        </div>
      </section>
      <div class="study">
      <p>
        In this lab, you will learn about why it is important to create
        software that is accessible to users with visual impairments.
        You will learn about different color vision deficiencies, 
        increase your understanding through an interactive module about 
        visual impairments, watch related videos, and take a 
        quiz to test your knowledge. Click "Next" to start!
      </p>
      </div>
    </div>
  );
};

export default About;

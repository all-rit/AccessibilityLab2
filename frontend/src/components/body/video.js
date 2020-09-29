import React from "react";

const Video = ({ link, title }) => {
  return (
    <div class="container">
      <section class="page-section" style={{ paddingBottom: "25px" }}>
        <div class="container">
          <div class="row">
            <div class="col-lg-12 text-center">
              <br />
              <br />
              <h2 class="section-heading text-uppercase">
                Color Clicker: Video
              </h2>
            </div>
          </div>
          <div class="row">
            <h4 style={{fontWeight: "normal"}}>Here are some videos to aid in understanding the material.</h4>
          </div>
          <div class="row">
            <iframe
              title="Color Blindness Testimony"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/d6KKsmmOKEI"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="row">
            <p>Color Blindness Testimony</p>
          </div>
          <div class="row">
            <iframe
              title="Color Contrast Lecture"
              width="560"
              height="315"
              src="https://www.youtube.com/embed/zrl0CW8m-Qk"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="row">
            <p>Color Contrast Lecture</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Video;

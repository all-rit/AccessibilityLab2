import React from "react";
import "./../../vendor/bootstrap/css/bootstrap.min.css";
import "./../../css/agency.min.css";
import "./../../css/style.css";
// import Form from "./../forms/form";
import Quiz from "./../../quiz/App";

const QuizLab2 = ({ title, description, links }) => {
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
                Color Clicker: Quiz
              </h2>
            </div>
          </div>
        </div>
      </section>
      <Quiz />
    </div>
  );
};

export default QuizLab2;

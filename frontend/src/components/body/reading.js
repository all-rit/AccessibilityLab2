import React, { Component } from "react";
import "./../../vendor/bootstrap/css/bootstrap.min.css";
import "./../../css/agency.min.css";
import "./../../css/style.css";
import AboutInfo from "./../aboutInformation/aboutInfo";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    baseBackground: state.changeColors.baseBackground,
    aboutState: state.changeGameState.aboutState
  };
};

/*
Component for displaying information about color vision deficiencies to users
*/

class Reading extends Component {
  render() {
    //Props from redux used in the application

    return (
      <div class="container">
        <section class="page-section" style={{ paddingBottom: "25px" }}>
          <div class="container">
            <div class="row">
              <div class="col-lg-12 text-center">
                <br />
                <br />
                <h2 class="section-heading text-uppercase">
                  Color Clicker: Reading
                </h2>
              </div>
            </div>
          </div>
          <AboutInfo />
        </section>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Reading);

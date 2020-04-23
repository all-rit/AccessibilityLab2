import React, { Component } from "react";

import Button from "@material-ui/core/Button";

import Grid from "@material-ui/core/Grid";
import { navigate } from "@reach/router";


class Header extends Component {
  handleSubmit() {
    navigate(process.env.PUBLIC_URL + "/HelloWorld");
  }
  render() {
    const buttonStyle = { marginTop: "5px" };

    return (
      <Grid justify="space-between" container spacing={10}>
        <Grid item>
          <Button
            href="#"
            onClick={this.handleSubmit}
            variant={"contained"}
            style={buttonStyle}
          >
            Screenreader Tutorial
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default Header;

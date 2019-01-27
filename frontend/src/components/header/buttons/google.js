import React, {Component} from 'react';
import GoogleButton from 'react-google-button';
import {withRouter} from 'react-router';
import '../title.css';

/*
Class for handling the google signin button
*/
export class Google extends Component {

  //Constructor for binding the callback api to the state
  constructor(props) {
    super(props);
    this.callBackendAPI = this.callBackendAPI.bind(this);
  }

  //Handles the call back api controller
  callBackendAPI = async () => {
    const response = await fetch('http://localhost:5000/auth/google');

    if (response.status !== 200) {
      throw Error(response.message)
    }
    console.log(response.url);
    window.location = response.url;
  };

  //Renderer for button
  render() {
    return (
      <div>
        <GoogleButton
          className='signinButton'
          onClick={() => this.callBackendAPI()}
        />
      </div>
    );
  }
}

export default withRouter(Google);

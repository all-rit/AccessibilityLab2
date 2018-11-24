import React, {Component} from 'react';
import GoogleButton from 'react-google-button';
import {withRouter} from 'react-router';
import '../title.css';

export class Google extends Component { 

  constructor(props) {
    super(props);
    this.callBackendAPI = this.callBackendAPI.bind(this);
  }

  callBackendAPI = async () => {
    const response = await fetch('http://localhost:5000/auth/google');

    if (response.status !== 200) {
      throw Error(response.message)
    }
    console.log(response.url);
    window.location = response.url;
  };

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

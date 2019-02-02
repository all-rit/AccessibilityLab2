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
    super(props)
  }

  //Renderer for button
  render() {

    //Handles the call back api controller
    const clickMethod = () => {
      fetch(process.env.API_URL + '/auth/google', {
        method: 'GET',
	credentials:'include',
      })
      .then(res => res.json())
      .then(data => {
	console.log(data);
      	window.location.href = data.link;
      })
      .catch(error => console.log(error))
    };

    return (
      <div>
        <GoogleButton
          className='signinButton'
          onClick={clickMethod}
        />
      </div>
    );
  }
}

export default withRouter(Google);

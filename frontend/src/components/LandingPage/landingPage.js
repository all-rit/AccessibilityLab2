import React from 'react';
import Button from '../header/buttons/button';
import {Google} from '../header/buttons/google';
import MainInstructions from './mainInstructions';

const LandingPage = ({endFirstGame, toWhiteBackground, background, loggedIn}) => {

  const closePage = () => {
    endFirstGame();
  }

  if (background !== 'white') {
    toWhiteBackground();
  }

  return (
    <div>
      <div id='Header'>
        <p className='mainTitle'>Welcome!</p>
      </div>
      <div id='Body'>
        <MainInstructions />
        {!loggedIn?
          <div className="instructionsContainer">
            <p
              className='instructionList'
              style={{marginTop: '40px', marginBottom:'10px'}}
            >
              To help track your game history and to help ensure we are providing
              you with the best possible learning experience, please sign in with google.
            </p>
            <div className='center'>
              <Google />
            </div>
          </div>
          :
          null
        }
        <p
          className='instructionList'
          style={{marginTop: '40px', marginBottom:'10px'}}
        >
          Now that you've been familarized with the instructions, click the
          button to continue onto the game!
        </p>
        <div className='center'>
          <Button
            clickMethod={closePage}
            message={"Lets Get Started!"}
            fontSizing={"25px"}
          />
        </div>
          <br /><br /><br />
      </div>
    </div>
  );
}

export default LandingPage;

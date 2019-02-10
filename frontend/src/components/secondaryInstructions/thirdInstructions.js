import React from 'react';
import Button from '../header/buttons/button';
import './secondaryInstructions.css';

/*
Page containing the instructions for the second popup the user sees
this instructional popup covers color contrast
*/
const ThirdInstructions  = ({closePage, activatePopup, toWhiteBackground,
  background}) => {

  const changeColors = () => {
    activatePopup(true);
    closePage();
  }

  if (background !== 'white') {
    toWhiteBackground();
  }

  return (
    <div>
      <p className='secondInstructionTitle'>Instructions Part Three</p>
      <div>
        <p className='instructionInfo'>
          As you can see, this game is quite tricky with the colors we are
          currently using. This is due to the colors being in contrast with
          both the background and the other circles.
        </p>
        <p className='instructionInfo'>
          Color contrast is a measurement of how much two colors differ from
          one another. This measurement makes a huge difference to people color
          vision defiencies.
        </p>
        <p className='instructionInfo'>
          To help improve the game, we have added the option to change the colors
          used in the game, via the "Update Colors" button in the upper left
          corner of your screen.
        </p>
        <p className='instructionInfo'>
          To help meet color contrast standards, you can use any online calculator
          or a calculator you've created for your lab! In order to fix the
          problem, the contrast must be above a ratio of 7:1. Black is also
          not an applicable option, as the entire system relies upon black
          for text coloring (giving you zero contrast between the background
          and text).
        </p>
        <p className='instructionInfo'>
          Now that you know how to fix the main issue with the game,
          click the button to jump back into the game. Try to get the highest
          score possible!
        </p>
      </div>
      <div className='center'>
        <Button
          clickMethod={changeColors}
          message={"I'm ready!"}
          fontSizing={"25px"}
        />
      </div>
    </div>
  );
}

export default ThirdInstructions;

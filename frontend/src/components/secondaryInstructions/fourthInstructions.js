import React from 'react';
import Button from '../header/buttons/button';
import './secondaryInstructions.css';

/*
Responible for displaying the fourth and final page of instructions to the users
*/
const FourthInstructions = ({closePage, activatePopup, endSystem}) => {

  const changeColors = () => {
    activatePopup(true);
    closePage();
  }

  const endGame = () => {
    endSystem();
    closePage();
  }

  return (
    <div>
      <p className='secondInstructionTitle'>Instructions Part Four</p>
      <div>
        <p className='instructionInfo'>
          Now that you've made some adjustments and played the game again,
          it's time to make one last decision:
        </p>
        <p className='instructionInfo'>
          Option #1: You can click the "Continue Playing!" button to try and
          get a higher score with your current color configuration.
        </p>
        <p className='instructionInfo'>
          Option #2: You can click the "I'm Finished!" button to finalize the
          application and see the conclusion (you can play more but all of your
          work will be reset to the beginning).
        </p>
        <p className='instructionInfo'>
          Option #3: You can click the "Make Adjustments!" button to change the
          colors you are using in the system to attempt to get a higher score
          or to improve the contrast in the colors you are using.
        </p>
      </div>
      <div className='center'>
        <Button
          clickMethod={closePage}
          message={"Continue Playing!"}
          fontSizing={"25px"}
        />
        <Button
          clickMethod={endGame}
          message={"I'm Finished!"}
          fontSizing={"25px"}
        />
        <Button
          clickMethod={changeColors}
          message={"Make Adjustments!"}
          fontSizing={"20px"}
        />
      </div>
    </div>
  );
}

export default FourthInstructions;
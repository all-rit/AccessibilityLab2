import React from 'react';
import Button from '../header/buttons/button';
import './secondInstructions.css';

const SecondInstructions = ({closePage}) => {
  return (
    <div>
      <p className='secondInstructionTitle'>Instructions Part Two</p>
      <div>
        <p className='instructionInfo'>
          As you can see, this game is quite tricky with the colors we are
          currently using. This is due to the colors being in contrast with
          both the background and the other circles
        </p>
        <p className='instructionInfo'>
          Color contrast is a measurement of how much two colors differ from
          one another. This measurement makes a huge difference to people color
          vision defiencies.
        </p>
        <p className='instructionInfo'>
          A color vision defiency (also sometimes referred to as color blindness)
          is when an individual is unable to see a portion of the color spectrum.
          These are quite common, especially in men, across the world.
        </p>
        <p className='instructionInfo'>
          An app, like this one, would be impossible for someone with a color
          vision defiency to use properly. To simulate this, we have added
          the ability to simulate what an individual with this defiency would
          see.
        </p>
        <p className='instructionInfo'>
          There are three main color vision defiencies: Protanopia (Red blindness),
          Deuteranopia (Green blindness), and Tritanopia (Blue blindness).
          These are all options for simulation for the game. Check them all
          out and see how much your score changes!
        </p>
        <p className='instructionInfo'>
          To help these people, we have added the option to change the colors
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
          Now that you know how to simulate color vision defiencies and how to
          fix the issue, click the button to jump back into the game. Try to
          get the highest score possible!
        </p>
      </div>
      <div className='center'>
        <Button
          clickMethod={closePage}
          message={"I'm ready!"}
          fontSizing={"25px"}
        />
      </div>
    </div>
  );
}

export default SecondInstructions;

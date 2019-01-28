import React from 'react';
import Button from '../header/buttons/button';
import './secondaryInstructions.css';

/*
Page containing the instructions for the second popup the user sees
this instructional popup covers color vision defiencies
*/
const SecondInstructions = ({closePage, selectOption}) => {

  var alreadyCalled = false;
  if (!alreadyCalled) {
    selectOption('Protanopia');
  }

  return (
    <div>
      <p className='secondInstructionTitle'>Instructions Part Two</p>
      <div>
        <p className='instructionInfo'>
          Good job so far! As you can see, this game is very difficult to
          to get high (or even positive) score in. Its even more difficult
          to users with a color vision deficiency.
        </p>
        <p className='instructionInfo'>
          A color vision deficiency (also sometimes referred to as color blindness)
          is when an individual is unable to see a portion of the color spectrum.
          These are quite common, especially in men, across the world.
        </p>
        <p className='instructionInfo'>
          An app, like this one, would be impossible for someone with a color
          vision deficiency to use properly. To simulate this, we have added
          the ability to simulate what an individual with this deficiency would
          see.
        </p>
        <p className='instructionInfo'>
          There are three main color vision defiencies: Protanopia (Red blindness),
          Deuteranopia (Green blindness), and Tritanopia (Blue blindness).
          These are all options for simulation for the game. Check them all
          out and see how much your score changes!
        </p>
        <p className='instructionInfo'>
          Using the dropdown next to the start page, select one of the options
          and play the game again. Remember, you are tying to get the highest
          score possible! When you're readty, click the button below.
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

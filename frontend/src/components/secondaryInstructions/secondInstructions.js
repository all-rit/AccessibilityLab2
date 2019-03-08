import React from 'react';
import Button from '../header/buttons/button';
import './secondaryInstructions.css';

/*
Page containing the instructions for the second popup the user sees
this instructional popup covers color vision defiencies
*/
const SecondInstructions = ({closePage, selectOption, toWhiteBackground,
  background}) => {

  var alreadyCalled = false;
  if (!alreadyCalled) {
    selectOption('Protanopia');
  }

  if (background !== 'white') {
    toWhiteBackground();
  }

  const closeInstructions = () => {
    closePage();
  }

  return (
    <div className="instructionsContainer">
      <p className='secondInstructionTitle'>Good job so far!</p>
      <ul>
        <li className='instructionsItem'>
          As you can see, this game isn't too difficult. However, to a user with a <em>color
	        vision deficiency</em>, it is.
        </li>
        <li className='instructionsItem'>
          A color vision deficiency (also sometimes referred to as color blindness)
          is when an individual is unable to see a portion of the color spectrum.
          These are quite common, especially in men, across the world.
        </li>
        <li className='instructionsItem'>
          An app, like this one, would be impossible for someone with a color
          vision deficiency to use properly. To simulate this, we have added
          the ability to simulate what an individual with this deficiency would
          see.
        </li>
          {/*
        <li className='instructionsItem'>
          There are three main color vision defiencies: Protanopia (Red blindness),
          Deuteranopia (Green blindness), and Tritanopia (Blue blindness).
          These are all options for simulation for the game. Check them all
          out and see how much your score changes!
        </li>
          */}
        <li className='instructionsItem'>
          Using the dropdown next to the start page, select one of the options
          and play the game again. Remember, you are tying to get the highest
          score possible! When you're readty, click the button below.
        </li>
      </ul>
      <div className='center'>
        <Button
          clickMethod={closeInstructions}
          message={"I'm ready!"}
          fontSizing={"25px"}
        />
      </div>
    </div>
  );
}

export default SecondInstructions;

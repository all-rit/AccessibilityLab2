import React from 'react';
import Button from '../header/buttons/button';

const Conclusion = ({resetSystem}) => {

  const resetFullSystem = () => {
    resetSystem();
  }

  return (
    <div>
      <p className='secondInstructionTitle'>Conclusion</p>
      <p className='instructionInfo'>
        Thank you for using our system! Here's a quick recap of what you learned
        using this application.
      </p>
      <p className='instructionInfo'>
        1). Color Contrast and how to calculate color contrast
      </p>
      <p className='instructionInfo'>
        2). Color vision defiencies and how much of an impact they make on
        individuals who have them
      </p>
      <p className='instructionInfo'>
        If you would like to play through this again, click the button below!
      </p>
      <Button
        clickMethod={resetFullSystem}
        message={"Play Again!"}
        fontSizing={"25px"}
      />
    </div>
  );
}

export default Conclusion;

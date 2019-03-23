import React from 'react';

/*
Component for the home reset button
*/
const HomeReset = ({gameEnded, changeGameColors, colors}) => {

  //Handles a click of the button
  const handleClick = () => {
    changeGameColors(colors);
    gameEnded();
  }

  return (
    <div>
      <button
        type='submit'
        className='backButton'
        onClick={handleClick}
      >
        Back
      </button>
    </div>
  );
}

export default HomeReset;

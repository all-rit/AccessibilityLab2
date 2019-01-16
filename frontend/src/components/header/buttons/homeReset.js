import React from 'react';

/*
Component for the home reset button
*/
const HomeReset = ({gameEnded, changeGameColors, baseBackground, baseRightCircle, baseWrongCircleOne, baseWrongCircleTwo}) => {

  //Handles a click of the button
  const handleClick = () => {
    changeGameColors([baseBackground, baseRightCircle, baseWrongCircleOne,
      baseWrongCircleTwo]);
    gameEnded();
  }

  return (
    <div>
      <button
        type='submit'
        className='backButton'
        onClick={handleClick}
      >
        Home
      </button>
    </div>
  );
}

export default HomeReset;

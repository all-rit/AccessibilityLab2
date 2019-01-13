import React from 'react';

const HomeReset = ({gameEnded, changeGameColors, baseBackground, baseRightCircle, baseWrongCircleOne, baseWrongCircleTwo}) => {

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

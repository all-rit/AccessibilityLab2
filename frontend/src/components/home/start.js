import React from 'react';
import './homeStyle.css';
import ColorVision from '../colors/colorVision';

const Start = ({startGame, gameOption, onChangeGameColors, colors}) => {

  const startClick = () => {
    if (gameOption !== 'default' && gameOption !== 'hex') {
      ColorVision(onChangeGameColors, gameOption, colors);
    };
    startGame();
  }

  return (
      <button
        className='start center inline'
        type='submit'
        onClick={startClick}
        aria-label="When you click this button, move your mouse slightly over to the left. This will allow you to click the circles as they popup on the screen"
      >
        Start
      </button>
  );
}

export default Start;

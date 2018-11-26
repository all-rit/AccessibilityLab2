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
    <div className='center'>
      <p className='thirdTitle center inline'>Ready?</p>
      <button 
        className='start center inline' 
        type='submit'
        onClick={startClick}
      >
        Start
      </button>
    </div>
  );
}

export default Start;

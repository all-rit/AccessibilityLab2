import React from 'react';
import Circle from './circle';
import Instructions from '../instructions/instructions';
import './gameStyle.css';

const Game = ({correctColor, incorrectColorOne, incorrectColorTwo}) => {
  return (
    <div>
      <div className='circleClicked'>
        <Circle color={correctColor}/>
      </div>
      <Instructions 
        correctColor={correctColor} 
        incorrectColorOne={incorrectColorOne}
        incorrectColorTwo={incorrectColorTwo}
      />
    </div>
  );
}

export default Game;

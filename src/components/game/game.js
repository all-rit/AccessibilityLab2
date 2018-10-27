import React from 'react';
import Circle from './circle';
import Instructions from '../instructions/instructions';
import Score from './score';
import './gameStyle.css';

const Game = ({correctColor, incorrectColorOne, incorrectColorTwo, score, right, wrong, timeRemaining}) => {
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
      <Score score={score} time={timeRemaining} right={right} wrong={wrong}/>
    </div>
  );
}

export default Game;

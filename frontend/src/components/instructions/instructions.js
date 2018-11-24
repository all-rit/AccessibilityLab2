import React from 'react';
import Circle from '../game/circle';

const Instructions = ({correctColor, incorrectColorOne, incorrectColorTwo}) => {
  return (
    <div>
      <p className='thirdTitle center'>Instructions:</p>
      <div className='instruction'>
        <p className='fourthTitle Left'>When this colored circle pops up, click it!</p>
        <p className='fourthTitle Right'>When either of these colored circles pop up, don't click them!</p>
      </div>
      <div className='circles'>
        <div className='correctCircle'>
          <Circle color= {correctColor}/>
        </div>
        <div className='incorrectCircle'>
          <Circle color= {incorrectColorOne}/>
        </div>
        <div className='incorrectCircle'>
          <Circle color= {incorrectColorTwo}/>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
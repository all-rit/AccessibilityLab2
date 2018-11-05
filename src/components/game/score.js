import React from 'react';
import './gameStyle.css';

const Score = ({score, right, wrong, isHex, background, currentColor}) => {

  return (
    <div className='scoreLine'>
      <p className='scoreElement'>Score: {score}</p>
      <p className='scoreElement'>Number Right: {right}</p>
      <p className='scoreElement'>Number Wrong: {wrong}</p>
      {isHex ? 
        <div className='oneline'>
          <p className='scoreElement spaceRight'>Background: {background}</p>
          <p className='scoreElement spaceLeft'>Current Color: {currentColor}</p>
        </div>
        : null
      }
    </div>
  );
}

export default Score;

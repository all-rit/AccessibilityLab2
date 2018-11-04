import React from 'react';
import './gameStyle.css';

const Score = ({score, right, wrong}) => {

  return (
    <div className='scoreLine'>
      <p className='scoreElement'>Score: {score}</p>
      <p className='scoreElement'>Number Right: {right}</p>
      <p className='scoreElement'>Number Wrong: {wrong}</p>
    </div>
  );
}

export default Score;

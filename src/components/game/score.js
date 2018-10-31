import React from 'react';
import './gameStyle.css';

const Score = ({score, right, wrong, updateColor}) => {

  let startTime, interval

  const start = () => {
    startTime = Date.now();
    interval = setInterval(function() {
      updateTime(Date.now() - startTime);
    }, 50);
  }

  const updateTime = (time) => {
    if (time/1000 > 15) {
      clearInterval(interval);
      document.getElementById('time').innerHTML = 0
    } else {
      document.getElementById('time').innerHTML = (15 - (time / 1000)).toFixed(3);
      console.log('timer: ', 15-(time/1000));
    }
  }

  start();

  return (
    <div className='scoreLine'>
      <p className='scoreElement'>Score: {score}</p>
      <p className='scoreElement'>Number Right: {right}</p>
      <p className='scoreElement'>Number Wrong: {wrong}</p>
      <p className='scoreElement'>Amount of Time Left: <span id='time'></span>s</p>
    </div>
  );
}

export default Score;

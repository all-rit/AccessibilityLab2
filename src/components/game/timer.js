import React from 'react';

const Timer = () => {

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
      if ((15 - (time / 1000)).toFixed(2) % 1 === 0) {
        console.log('calc score');
        //calculateScore(.38);
      }
    }
  }

  start();

  return(
    <div>
      <p className='timer'>Amount of Time Left: <span id='time'></span>s</p>
    </div>
  );
}

export default Timer;

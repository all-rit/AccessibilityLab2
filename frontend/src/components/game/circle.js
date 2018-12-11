import React from 'react';
import Countdown from 'react-countdown-now'; 
import './gameStyle.css';

const style = {
  backgroundColor: ''
}

const Circle = ({color, clickable, onClick}) => {

  const toDark = ({milliseconds}) => {
    style.backgroundColor = color;
    if (milliseconds < 100) {
      style.backgroundColor = 'black';
    }     
    return (
      <span
        className='circle clickable'
        style={{backgroundColor: style.backgroundColor}}
        onClick={onClick}
      />
    );
  } 
  
  if (clickable) {
    return (
      <div>
        <Countdown 
          date={Date.now() + 10000} 
          intervalDelay={0}
          precision={3}
          renderer={toDark}
        />
      </div>
    );
  }

  else {
    return (
      <span className='circle' style={{backgroundColor: `${color}`}}></span>
    );
  }
}

export default Circle;

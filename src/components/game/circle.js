import React from 'react';
import Countdown from 'react-countdown-now'; 
import './gameStyle.css';

const Circle = ({color, clickable, colors, userClicked, startTime}) => {

  var hasClicked = false;
  let currentColor;

  const click = () => {
    if (!hasClicked) {
      if (currentColor === colors[0]) {
        userClicked([true, Date.now()]);
      } else {
        userClicked([false, Date.now()]);
      }
      hasClicked = true;
    }
  }

  if(clickable) {
    const calculateRandomcolor = () => {
      let options = [colors[0], colors[1], colors[2]];
      let position = Math.floor(Math.random() * (3));
      console.log(options[position]);
      hasClicked = false;
      return options[position];
    }

    const renderer = () => {
      return (
        <span
          className='circle clickable'
          id='middleColor'
          onClick={() => click()}
          style={{background: calculateRandomcolor()}}
        ></span>
      );
    }

    return (
      <div>
        <Countdown
          date={startTime + 15000}
          intervalDelay={1000}
          precision={2}
          renderer={renderer} 
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

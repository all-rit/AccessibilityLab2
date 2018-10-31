import React from 'react';
import './gameStyle.css';

const Circle = ({color, clickable, colors}) => {

  const click = () => {
    console.log('click');
  }

  var count = 15;

  if(clickable) {
    const calculateRandomcolor = () => {
      let options = [colors[0], colors[1], colors[2]];
      let position = Math.floor(Math.random() * (3));
      console.log(options[position]);
      return options[position];
    }

    const setColor = () => {
      if (count === 1) {
          clearInterval(setColor);
      } else {
        var doc = document.getElementById('middleColor');
        var color = calculateRandomcolor();
        doc.style.background = color;
        count --;
        console.log(Date.now());
      }
    }
    setInterval(setColor, 1000);

    return (
      <div>
        <span 
          className='circle clickable' 
          id='middleColor'
          onClick={() => click()} 
          style={{background: colors[0]}}
        ></span>
      </div>
    );
  } else {
    return (
      <div>
        <span className='circle' style={{backgroundColor: `${color}`}}></span>
      </div>
    );
  }
}

export default Circle;

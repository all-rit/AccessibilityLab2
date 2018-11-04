import React from 'react';
import './gameStyle.css';

const Circle = ({color, clickable, onClick}) => {

  if (clickable) {
    return (
      <span 
        className='circle clickable' 
        style={{backgroundColor: `${color}`}}
        onClick={onClick}
      ></span>
    );
  }

  else {
    return (
      <span className='circle' style={{backgroundColor: `${color}`}}></span>
    );
  }
}

export default Circle;

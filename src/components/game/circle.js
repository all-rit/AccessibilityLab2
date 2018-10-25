import React from 'react';
import './gameStyle.css';

const Circle = ({color}) => {

  console.log(color);
  return (
    <div>
      <span className='circle' style={{backgroundColor: `${color}`}}></span>
    </div>
  );
}

export default Circle;

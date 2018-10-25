import React from 'react';
import './homeStyle.css';

const Instructions = () => {
  return (
    <div>
      <p className='thirdTitle center'>Instructions:</p>
      <div className='instruction'>
        <p className='fourthTitle Left'>When this colored circle pops up, click it!</p>
        <p className='fourthTitle Right'>When either of these colored circles pop up, don't click them!</p>
      </div>
    </div>
  );
}

export default Instructions;

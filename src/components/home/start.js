import React from 'react';
import './homeStyle.css';

const Start = ({startGame}) => {
  return (
    <div className='center'>
      <p className='thirdTitle center inline'>Ready?</p>
      <button 
        className='start center inline' 
        type='submit'
        onClick={startGame}
      >
        Start
      </button>
    </div>
  );
}

export default Start;

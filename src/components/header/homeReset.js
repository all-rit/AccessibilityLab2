import React from 'react';

const HomeReset = ({gameEnded}) => {
  return (
    <div>
      <button 
        type='submit' 
        className='backButton' 
        onClick={gameEnded}
      > 
        Home
      </button>
    </div>
  );
}

export default HomeReset;

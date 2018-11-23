import React from 'react';

const HomeReset = ({gameEnded, resetOption, resetColors}) => {

  const handleClick = () => {
    gameEnded();
    //console.log('resetting colors');
    //resetColors();
    //resetOption();
  }

  return (
    <div>
      <button 
        type='submit' 
        className='backButton' 
        onClick={handleClick}
      > 
        Home
      </button>
    </div>
  );
}

export default HomeReset;

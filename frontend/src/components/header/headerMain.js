import React from 'react';
import ColorUpdate from './buttons/colorUpdate';
import {Google} from './buttons/google';
import Home from './buttons/homeReset.js';

const Header = ({gameState, popupController, gameEnded}) => {
  return (
    <div className='headerStyle'>
      {gameState? 
        <Home gameEnded={gameEnded} />
        :
        <ColorUpdate popupController={popupController}/>
      }
      <Google />
    </div>
  );
}

export default Header;

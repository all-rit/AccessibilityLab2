import React from 'react';
import ColorUpdate from './buttons/colorUpdate';
import {Google} from './buttons/google';
import Signout from './buttons/signout';
import Home from './buttons/homeReset.js';

const Header = ({gameState, popupController, gameEnded, loggedIn, user, baseBackground, baseRightCircle, baseWrongCircleOne, baseWrongCircleTwo, changeGameColors}) => {
  return (
    <div className='headerStyle'>
      {gameState? 
        <Home 
          gameEnded={gameEnded} 
          baseBackground={baseBackground}
          baseRightCircle={baseRightCircle}
          baseWrongCircleOne={baseWrongCircleOne}
          baseWrongCircleTwo={baseWrongCircleTwo}
          changeGameColors={changeGameColors}
        />
        :
        <ColorUpdate popupController={popupController}/>
      }
      {loggedIn? 
        <Signout user={user} />
        :
        <Google />
      }
    </div>
  );
}

export default Header;

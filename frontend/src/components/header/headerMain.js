import React from 'react';
import ColorUpdate from './buttons/colorUpdate';
import {Google} from './buttons/google';
import Signout from './buttons/signout';
import Home from './buttons/homeReset.js';
import Button from './buttons/button';

const Header = ({gameState, popupController, gameEnded, loggedIn, user,
  baseBackground, baseRightCircle, baseWrongCircleOne, baseWrongCircleTwo,
  changeGameColors, openAboutPage, aboutState, closeAboutPage, admin,
  openStatPage, closeStatPage, statState}) => {
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
        <div>
        {aboutState?
          <Button
            clickMethod={closeAboutPage}
            message={"Home"}
            fontSizing={"25px"}
          />
          :
          <div>
          {statState?
            <Button
              clickMethod={closeStatPage}
              message={"Home"}
              fontSizing={"25px"}
            />
            :
            <div className='oneline'>
              <ColorUpdate popupController={popupController}/>
              <Button
                clickMethod={openAboutPage}
                message={"About Color Vision Deficiencies"}
                fontSizing={"17px"}
              />
            </div>
          }
          </div>
        }
        </div>
      }
      {loggedIn?
        <Signout user={user} admin={admin} openStatPage={openStatPage}/>
        :
        <Google />
      }
    </div>
  );
}

export default Header;

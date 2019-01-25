import React from 'react';
import ColorUpdate from './buttons/colorUpdate';
import {Google} from './buttons/google';
import Signout from './buttons/signout';
import Home from './buttons/homeReset.js';
import Button from './buttons/button';

/*
Component for the header of the pages. Controls the buttons and options
displayed to the users on each page of the appilcation
*/
const Header = ({gameState, popupController, gameEnded, loggedIn, user,
  baseBackground, baseRightCircle, baseWrongCircleOne, baseWrongCircleTwo,
  changeGameColors, openAboutPage, aboutState, closeAboutPage, admin,
  openStatPage, closeStatPage, statState, firstGame, oneGamePlayed}) => {
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
            <div>
            {firstGame?
              null
              :
              <div className='oneline'>
                <Button
                  clickMethod={openAboutPage}
                  message={"About Color Vision Deficiencies"}
                  fontSizing={"17px"}
                />
                <div>
                {oneGamePlayed?
                  <ColorUpdate popupController={popupController}/>
                  :
                  null
                }
                </div>
              </div>
            }
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

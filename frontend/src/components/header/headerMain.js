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
  openStatPage, closeStatPage, statState, firstGame, gamesPlayed,
  openLeaderboard, closeLeaderboard, leaderboardState, openColorChange,
  colorChange, closeColorChange, openSecondInfoState, thirdInfoState, gameMode}) => {

  const backButton = () => {
    if (gamesPlayed == 2) {
      closeColorChange();
      openSecondInfoState();
    } else {
      closeColorChange();
    }
  }

  if (gameState) {
    return (
      <div
        className='headerStyle'
        style={{background: "black"}}
      >
        <div className='oneline center'>
          <Home
            gameEnded={gameEnded}
            baseBackground={baseBackground}
            baseRightCircle={baseRightCircle}
            baseWrongCircleOne={baseWrongCircleOne}
            baseWrongCircleTwo={baseWrongCircleTwo}
            changeGameColors={changeGameColors}
          />
          <p className='deficiencyCheck'>
            Vision Deficiency Simulation: {gameMode === 'Main'?' Off':' On'}
          </p>
        </div>
        {loggedIn?
          <Signout user={user} admin={admin} openStatPage={openStatPage}/>
          :
          <div>
            {firstGame?
              <Google />
              :
              null
            }
          </div>
        }
      </div>
    );
  }

  return (
    <div className='headerStyle'>
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
            {leaderboardState?
              <Button
                clickMethod={closeLeaderboard}
                message={"Home"}
                fontSizing={"25px"}
              />
              :
              <div>
              {firstGame?
                null
                :
                <div>
                {colorChange?
                  <div className='inlineForm'>
                    <Button
                      clickMethod={backButton}
                      message={"Back"}
                      fontSizing={"25px"}
                    />
                    <p
                      className='mainColor secondTitle'
                      style={{marginTop: '15px', marginLeft: '25px',
                      background: 'rgba(38,38,38,1)'}}
                    >
                      Adjust the colors below to be in better color contrast
                    </p>
                  </div>
                  :
                  <div className='oneline'>
                    <Button
                      clickMethod={openAboutPage}
                      message={"About Color Vision Deficiencies"}
                      fontSizing={"17px"}
                    />
                    <div>
                    {gamesPlayed > 1 && !thirdInfoState?
                      <ColorUpdate
                        openColorChange={openColorChange}
                      />
                      :
                      null
                    }
                    </div>
                    <div>
                      {gamesPlayed > 2?
                        <Button
                          clickMethod={openLeaderboard}
                          message={"Leaderboard"}
                          fontSizing={"17px"}
                        />
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
          </div>
        }
        </div>
      {loggedIn?
        <Signout user={user} admin={admin} openStatPage={openStatPage}/>
        :
        <div>
          {firstGame?
            <Google />
            :
            null
          }
        </div>
      }
    </div>
  );
}

export default Header;

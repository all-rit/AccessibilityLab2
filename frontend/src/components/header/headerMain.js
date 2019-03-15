import React, { Component } from 'react';
import ColorUpdate from './buttons/colorUpdate';
import {Google} from './buttons/google';
import Signout from './buttons/signout';
import Home from './buttons/homeReset.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from './buttons/button';
import { Dialog } from "@reach/dialog";
import '../secondaryInstructions/secondaryInstructions.css';

/*
Component for the header of the pages. Controls the buttons and options
displayed to the users on each page of the appilcation
*/
class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      openHelp: false,
    }
  }

  render() {
    const {gameState, popupController, gameEnded, loggedIn, user,
      baseBackground, baseRightCircle, baseWrongCircleOne, baseWrongCircleTwo,
      changeGameColors, openAboutPage, aboutState, closeAboutPage, admin,
      openStatPage, closeStatPage, statState, firstGame, gamesPlayed,
      openLeaderboard, closeLeaderboard, leaderboardState, openColorChange,
      colorChange, closeColorChange, openSecondInfoState, thirdInfoState, gameMode,
      endSystem} = this.props;

    const backButton = () => {
      if (gamesPlayed == 2) {
        closeColorChange();
        openSecondInfoState();
      } else {
        closeColorChange();
      }
    }

    const openHelpDialog = () => {
      this.setState({openHelp: true})
    }

    const closeHelpDialog = () => {
      this.setState({openHelp: false})
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
        {this.state.openHelp?
          <Dialog>
            <div className='instructionsContainer'>
              <p className='thirdTitle center'>Changing Color Contrast</p>
              <p className='fourthTitle center'>
                For each of the four colors, do the following:
              </p>
                <ul>
                  <li className='mainInstructionsItem'>
                    Click on the colored box to open the color selection popup
                  </li>
                  <li className='mainInstructionsItem'>
                    If it's the background, change it to whatever color you want
                  </li>
                  <li className='mainInstructionsItem'>
                    If it's one of the circles, use a color contrast calculator
                    to find a good contrast between the background and the new color
                  </li>
                  <li className='mainInstructionsItem'>
                    Repeat until all of the colors have been changed
                  </li>
                </ul>
              <p className='fourthTitle center'>
                Some Helpful Tips:
              </p>
                <ul>
                  <li className='mainInstructionsItem'>
                    Choose either a very light or very dark background. This helps
                    in the contrast later
                  </li>
                  <li className='mainInstructionsItem'>
                    The most common color vision deficiencies are red and green
                    focused. Avoid these colors if you can.
                  </li>
                </ul>
              <div className='center'>
                <button
                  onClick={() => closeHelpDialog()}
                  className="buttonPopup"
                >
                  Close
                </button>
              </div>
            </div>
          </Dialog>
          :
          null
        }
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
                  message={"Back"}
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
                      <FontAwesomeIcon
                        icon="question-circle"
                        size={"3x"}
                        style={{marginTop: "15px"}}
                        onClick={() => openHelpDialog()}
                      />
                    </div>
                    :
                    <div className='oneline'>
                      <Button
                        clickMethod={openAboutPage}
                        message={"About Color Vision Deficiencies"}
                        fontSizing={"17px"}
                      />
                      <div>
                      {gamesPlayed > 1 && !thirdInfoState && !endSystem?
                        <ColorUpdate
                          openColorChange={openColorChange}
                        />
                        :
                        null
                      }
                      </div>
                      <div>
                        {gamesPlayed > 2 && !endSystem?
                          <Button
                            clickMethod={openLeaderboard}
                            message={"Leaderboard"}
                            fontSizing={"17px"}
                          />
                          :
                          null
                        }
                      </div>
                      <div>
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
}

export default Header;

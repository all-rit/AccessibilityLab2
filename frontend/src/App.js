import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactGA from 'react-ga';
import './App.css';
import Title from './components/header/title';
import Home from './components/home/Home';
import GameCenter from './components/game/GameCenter';
import ColorChangePopup from './components/home/colorChangePopup';
import Header from './components/header/headerMain';
import SuccessMessage from './components/home/successMessage';
import Countdown from 'react-countdown-now';
import Form from './components/forms/form';
import AboutInfo from './components/aboutInformation/aboutInfo';
import UserStats from './components/userStatistics/userStats';
import LandingPage from './components/LandingPage/landingPage';
import SecondInstructions from './components/secondaryInstructions/secondInstructions';
import ThirdInstructions from './components/secondaryInstructions/thirdInstructions';
import FourthInstructions from './components/secondaryInstructions/fourthInstructions';
import Leaderboard from './components/userStatistics/leaderboard';
import Conclusion from './components/secondaryInstructions/conclusion';

//Imports from redux actions
import {changeDefaultColors, changeGameColors, selectGameOption, activatePopup,
  startGame, endGame, resetOption, resetColors, login, resetChange,
  closeInfoPopup, openAboutPage, closeAboutPage, openStatPage, closeStatPage,
  endFirstGame, enterInfoState, closeInfoState, enterSecondInfoState,
  closeSecondInfoState, openLeaderboard, closeLeaderboard, openThirdInfoState,
  closeThirdInfoState, openConclusion} from './controllers/actions';

//State mapping for redux
const mapStateToProps = state => {
  return {
    baseBackground: state.changeColors.baseBackground,
    baseRightCircle: state.changeColors.baseRightCircle,
    baseWrongCircleOne: state.changeColors.baseWrongCircleOne,
    baseWrongCircleTwo: state.changeColors.baseWrongCircleTwo,
    gameBackground: state.changeColors.gameBackground,
    gameRightCircle: state.changeColors.gameRightCircle,
    gameWrongCircleOne: state.changeColors.gameWrongCircleOne,
    gameWrongCircleTwo: state.changeColors.gameWrongCircleTwo,
    gameOption: state.selectGameOption.option,
    popup: state.changeColors.popup,
    gameState: state.changeGameState.gameState,
    user: state.changeUser.user,
    loggedIn: state.changeUser.loggedIn,
    changed: state.changeColors.changed,
    infoPopup: state.changeUser.infoPopup,
    aboutState: state.changeGameState.aboutState,
    admin: state.changeUser.admin,
    statState: state.changeGameState.statState,
    firstGame: state.changeGameState.firstGame,
    secondInfoState: state.changeGameState.secondInfoState,
    thirdInfoState: state.changeGameState.thirdInfoState,
    gamesPlayed: state.changeGameState.gamesPlayed,
    leaderboardState: state.changeGameState.leaderboardState,
    fourthInfoState: state.changeGameState.fourthInfoState,
    endSystem: state.changeGameState.endSystem,
  }
}

//Mapping dispatches for redux
const mapDispatchToProps = (dispatch) => {
  return{
    onChangeDefaultColors: (event) => dispatch(changeDefaultColors(event)),
    onChangeGameColors: (event) => dispatch(changeGameColors(event)),
    onSelectOption: (event) => dispatch(selectGameOption(event)),
    popupController: (event) => dispatch(activatePopup(event)),
    onStartGame: () => dispatch(startGame()),
    onEndGame: () => dispatch(endGame()),
    onResetOption: () => dispatch(resetOption()),
    onResetColors: () => dispatch(resetColors()),
    onLogin: (event) => dispatch(login(event)),
    onResetChange: () => dispatch(resetChange()),
    onCloseInfoPopup: () => dispatch(closeInfoPopup()),
    onOpenAboutPage: () => dispatch(openAboutPage()),
    onCloseAboutPage: () => dispatch(closeAboutPage()),
    onOpenStatPage: () => dispatch(openStatPage()),
    onCloseStatPage: () => dispatch(closeStatPage()),
    onEndFirstGame: () => dispatch(endFirstGame()),
    onEnterInfoState: () => dispatch(enterInfoState()),
    onCloseInfoState: () => dispatch(closeInfoState()),
    onEnterSecondInfoState: () => dispatch(enterSecondInfoState()),
    onCloseSecondInfoState: () => dispatch(closeSecondInfoState()),
    onOpenLeaderboard: () => dispatch(openLeaderboard()),
    onCloseLeaderboard: () => dispatch(closeLeaderboard()),
    onOpenThirdInfoState: () => dispatch(openThirdInfoState()),
    onCloseThirdInfoState: () => dispatch(closeThirdInfoState()),
    onOpenConclusion: () => dispatch(openConclusion())
  }
}

/*
Class declaration for main application
*/
class App extends Component {

  //Mounting control for backend check
  componentDidMount() {
    this.callBackendAPI()
      .then(res => {
        console.log(res.status);
        if (res.status === 'new user logged into system') {
          this.props.onLogin([res.user, true, res.admin]);
        } else if (res.status === 'existing user logged into system') {
          this.props.onLogin([res.user, false, res.admin]);
        } else {
          console.log(res.status);
        }
      })
      .catch(err => console.log(err));
    };

    //function call for backend
    callBackendAPI = async () => {
      console.log('sending request to backend');
      const response = await fetch('http://localhost:5000/main');
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.message)
      }
      return body;
    };

  //Used to establish React GA (google information)
  initializeReactGA() {
    ReactGA.initialize('UA-129523795-1');
    ReactGA.pageView(window.location.pathname);
  }

  //Renderer for class application
  render() {
    //Props from redux used in the application
    const {onChangeDefaultColors, onChangeGameColors, gameState, onStartGame,
      onEndGame, onSelectOption, baseBackground, baseRightCircle,
      baseWrongCircleOne, baseWrongCircleTwo, gameBackground,
      gameRightCircle, gameWrongCircleOne, gameWrongCircleTwo,
      gameOption, popupController, popup, loggedIn, user, onResetOption,
      onResetColors, changed, onResetChange, onCloseInfoPopup, infoPopup,
      aboutState, onOpenAboutPage, onCloseAboutPage, admin, onOpenStatPage,
      onCloseStatPage, statState, onEndFirstGame, firstGame, secondInfoState,
      onEnterInfoState, onCloseInfoState, thirdInfoState, onEnterSecondInfoState,
      onCloseSecondInfoState, gamesPlayed, leaderboardState,
      onOpenLeaderboard, onCloseLeaderboard, fourthInfoState,
      onOpenThirdInfoState, onCloseThirdInfoState, endSystem, onOpenConclusion}
      = this.props

    //establishing array of current colors for the system
    const colors = [baseBackground, baseRightCircle, baseWrongCircleOne,
      baseWrongCircleTwo];

    //custom renderer for top of page popup
    //popup occurs after a successful change to the colors in the system
    const renderer = (props) => {
      if (props.total > 0) {
        return(
          <div className='successPopup'>
            <SuccessMessage />
          </div>
        );
      } else {
        onResetChange();
        return null;
      }
    }

    //Return statement for rendering of the application
    return (
      <div>
        {infoPopup?
          <Form
            closeInfoPopup={onCloseInfoPopup}
          />
          :
          <div style={{background: `${gameBackground}`}} className='main'>
            {changed?
              <Countdown
                date={Date.now() + 2000}
                intervalDelay={1000}
                precision={2}
                renderer={renderer}
              />
              :
              null
            }
            <Header
              gameState={gameState}
              firstGame={firstGame}
              gameEnded={onEndGame}
              popupController={popupController}
              loggedIn={loggedIn}
              user={user}
              baseBackground={baseBackground}
              baseRightCircle={baseRightCircle}
              baseWrongCircleOne={baseWrongCircleOne}
              baseWrongCircleTwo={baseWrongCircleTwo}
              changeGameColors={onChangeGameColors}
              openAboutPage={onOpenAboutPage}
              closeAboutPage={onCloseAboutPage}
              aboutState={aboutState}
              admin={admin}
              openStatPage={onOpenStatPage}
              closeStatPage={onCloseStatPage}
              statState={statState}
              gamesPlayed={gamesPlayed}
              openLeaderboard={onOpenLeaderboard}
              closeLeaderboard={onCloseLeaderboard}
              leaderboardState={leaderboardState}
            />
            {gameState ?
              <div>
                <GameCenter
                  gameEnded={onEndGame}
                  correctColor={gameRightCircle}
                  incorrectColorOne={gameWrongCircleOne}
                  incorrectColorTwo={gameWrongCircleTwo}
                  gameOption={gameOption}
                  background={gameBackground}
                  selectOption={onSelectOption}
                  resetOption={onResetOption}
                  onChangeGameColors={onChangeGameColors}
                  colors={colors}
                  resetColors={onResetColors}
                  enterInfoState={onEnterInfoState}
                  enterSecondInfoState={onEnterSecondInfoState}
                  gamesPlayed={gamesPlayed}
                  enterThirdInfoState={onOpenThirdInfoState}
                />
              </div>
              :
              <div>
              {aboutState?
                <AboutInfo />
                :
                <div>
                {statState?
                  <UserStats />
                  :
                  <div>
                  {secondInfoState?
                    <SecondInstructions
                      closePage={onCloseInfoState}
                      selectOption={onSelectOption}
                    />
                    :
                    <div>
                    {thirdInfoState?
                      <ThirdInstructions
                        closePage={onCloseSecondInfoState}
                        activatePopup={popupController}
                      />
                      :
                      <div>
                      {fourthInfoState?
                        <FourthInstructions
                          closePage={onCloseThirdInfoState}
                          activatePopup={popupController}
                          endSystem={onOpenConclusion}
                        />
                        :
                        <div>
                        {leaderboardState?
                          <Leaderboard closeLeaderboard={onCloseLeaderboard}/>
                          :
                          <div>
                          {endSystem?
                            <Conclusion />
                            :
                            <div>
                            {firstGame?
                              <LandingPage endFirstGame={onEndFirstGame}/>
                              :
                              <div>
                                <Title gameState={gameState}/>
                                <Home
                                  background={gameBackground}
                                  onChangeGameColors={onChangeGameColors}
                                  gameOption={gameOption}
                                  correctColor={gameRightCircle}
                                  incorrectColorOne={gameWrongCircleOne}
                                  incorrectColorTwo={gameWrongCircleTwo}
                                  startGame={onStartGame}
                                  selectOption={onSelectOption}
                                  gamesPlayed={gamesPlayed}
                                />
                              {popup ?
                                <ColorChangePopup
                                  changeDefaultColors={onChangeDefaultColors}
                                  changeGameColors={onChangeGameColors}
                                  popupController={popupController}
                                />
                                : null
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
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

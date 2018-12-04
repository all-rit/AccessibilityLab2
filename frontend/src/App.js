import React, {Component} from 'react';
import {connect} from 'react-redux';
import ReactGA from 'react-ga';
import './App.css';
import Title from './components/header/title';
import Home from './components/home/Home';
import GameCenter from './components/game/GameCenter';
import ColorChangePopup from './components/home/colorChangePopup'
import Header from './components/header/headerMain';

import {changeDefaultColors, changeGameColors, selectGameOption, activatePopup, startGame, endGame, resetOption, resetColors, login} from './controllers/actions';

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
    loggedIn: state.changeUser.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onChangeDefaultColors: (event) => dispatch(changeDefaultColors(event)),
    onChangeGameColors: (event) => dispatch(changeGameColors(event)),
    onSelectOption: (event) => dispatch(selectGameOption(event.target.value)),
    popupController: (event) => dispatch(activatePopup(event)),
    onStartGame: () => dispatch(startGame()),
    onEndGame: () => dispatch(endGame()),
    onResetOption: () => dispatch(resetOption()),
    onResetColors: () => dispatch(resetColors()),
    onLogin: (event) => dispatch(login(event))
  }
}

class App extends Component {

  componentDidMount() {
    this.callBackendAPI()
      .then(res => {
        if (res.status === 'user logged into system') {
          this.props.onLogin(res.user);                    
        } else {
          console.log(res.status);
        }
      })
      .catch(err => console.log(err));
    };

    callBackendAPI = async () => {
      console.log('sending request to backend');
      const response = await fetch('http://localhost:5000/main');
      const body = await response.json();

      if (response.status !== 200) {
        throw Error(body.message)
      }
      return body;
    };

  initializeReactGA() {
    ReactGA.initialize('UA-129523795-1');
    ReactGA.pageView(window.location.pathname);
  }

  render() {
    const {onChangeDefaultColors, onChangeGameColors, gameState, onStartGame, onEndGame, onSelectOption, baseBackground, baseRightCircle, baseWrongCircleOne, baseWrongCircleTwo, gameBackground, gameRightCircle, gameWrongCircleOne, gameWrongCircleTwo, gameOption, popupController, popup, loggedIn, user} = this.props

    return (
      <div style={{background: `${gameBackground}`}} className='main'>
        <Header 
          gameState={gameState} 
          gameEnded={onEndGame} 
          popupController={popupController}
          loggedIn={loggedIn}
          user={user}
          baseBackground={baseBackground}
          baseRightCircle={baseRightCircle}
          baseWrongCircleOne={baseWrongCircleOne}
          baseWrongCircleTwo={baseWrongCircleTwo}
          changeGameColors={onChangeGameColors}
        />
        {gameState ?
          <div>
            <GameCenter
              correctColor={gameRightCircle}
              incorrectColorOne={gameWrongCircleOne}
              incorrectColorTwo={gameWrongCircleTwo}
              gameOption={gameOption}
              background={gameBackground}
            />
          </div>
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
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

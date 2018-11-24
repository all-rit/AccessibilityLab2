import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Title from './components/header/title';
import Home from './components/home/Home';
import GameCenter from './components/game/GameCenter';
import ColorChangePopup from './components/home/colorChangePopup'
import Header from './components/header/headerMain';

import {changeColors, selectGameOption, activatePopup, startGame, endGame, resetOption, resetColors, login} from './controllers/actions';

const mapStateToProps = state => {
  return {
    background: state.changeColors.background,
    rightCircle: state.changeColors.rightCircle,
    wrongCircleOne: state.changeColors.wrongCircleOne,
    wrongCircleTwo: state.changeColors.wrongCircleTwo,
    gameOption: state.selectGameOption.option,
    popup: state.changeColors.popup,
    gameState: state.changeGameState.gameState,
    user: state.changeUser.user,
    loggedIn: state.changeUser.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onChangeColors: (event) => dispatch(changeColors(event)),
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
        if (res.status === 'session cookie set') {
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

  render() {
    const {onChangeColors, gameState, onStartGame, onEndGame, onSelectOption, background, rightCircle, wrongCircleOne, gameOption, wrongCircleTwo, popupController, popup, onResetOption, loggedIn, user} = this.props

    return (
      <div style={{background: `${background}`}} className='main'>
        <Header 
          gameState={gameState} 
          gameEnded={onEndGame} 
          popupController={popupController}
          loggedIn={loggedIn}
          user={user}
        />
        {gameState ?
          <div>
            <Title 
              gameState={gameState} 
              resetOption={onResetOption}
              resetColors={resetColors}
            />
            <GameCenter
              correctColor={rightCircle}
              incorrectColorOne={wrongCircleOne}
              incorrectColorTwo={wrongCircleTwo}
              gameOption={gameOption}
              background={background}
            />
          </div>
          :
          <div>
            <Title gameState={gameState}/>
            <Home 
              background={background}
              onChangeColors={onChangeColors}
              gameOption={gameOption}
              correctColor={rightCircle} 
              incorrectColorOne={wrongCircleOne} 
              incorrectColorTwo={wrongCircleTwo} 
              startGame={onStartGame}
              selectOption={onSelectOption}
            />
          {popup ?
            <ColorChangePopup
              changeColors = {onChangeColors}
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

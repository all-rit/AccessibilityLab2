import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Title from './components/header/title';
import ColorUpdate from './components/header/colorUpdate';
import Home from './components/home/Home';
import Game from './components/game/game';
import ColorChangePopup from './components/home/colorChangePopup'

import {changeColors, selectGameOption, activatePopup, startGame, endGame} from './controllers/actions';

const mapStateToProps = state => {
  return {
    background: state.changeColors.background,
    rightCircle: state.changeColors.rightCircle,
    wrongCircleOne: state.changeColors.wrongCircleOne,
    wrongCircleTwo: state.changeColors.wrongCircleTwo,
    gameOption: state.selectGameOption.option,
    gameState: state.gameState.gameStarted,
    popup: state.changeColors.popup
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onChangeColors: (event) => dispatch(changeColors(event)),
    onSelectOption: (event) => dispatch(selectGameOption(event.target.value)),
    onStartGame: () => dispatch(startGame()),
    onEndGame: () => dispatch(endGame()),
    popupController: (event) => dispatch(activatePopup(event)),
  }
}

class App extends Component {
  render() {
    const {onChangeColors, onStartGame, onEndGame, onSelectOption, gameState, background, rightCircle, wrongCircleOne, wrongCircleTwo, popupController, popup} = this.props
      
    return (
      <div style={{background: `${background}`}} className='main'>
        {gameState ?
          <div>
            <Title gameState={gameState} gameEnded={onEndGame}/>
            <Game 
              correctColor={rightCircle}
              incorrectColorOne={wrongCircleOne}
              incorrectColorTwo={wrongCircleTwo}
            />
          </div>
          :
          <div>
            <ColorUpdate popupController={popupController}/>
            <Title gameState={gameState}/>
            <Home 
              correctColor={rightCircle} 
              incorrectColorOne={wrongCircleOne} 
              incorrectColorTwo={wrongCircleTwo} 
              startGame={onStartGame}
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

import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Title from './components/header/title';
import ColorUpdate from './components/header/colorUpdate';
import Home from './components/home/Home';
import GameCenter from './components/game/GameCenter';
import ColorChangePopup from './components/home/colorChangePopup'

import {changeColors, selectGameOption, activatePopup, startGame, endGame} from './controllers/actions';

const mapStateToProps = state => {
  return {
    background: state.changeColors.background,
    rightCircle: state.changeColors.rightCircle,
    wrongCircleOne: state.changeColors.wrongCircleOne,
    wrongCircleTwo: state.changeColors.wrongCircleTwo,
    gameOption: state.selectGameOption.option,
    popup: state.changeColors.popup,
    gameState: state.changeGameState.gameState
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onChangeColors: (event) => dispatch(changeColors(event)),
    onSelectOption: (event) => dispatch(selectGameOption(event.target.value)),
    popupController: (event) => dispatch(activatePopup(event)),
    onStartGame: () => dispatch(startGame()),
    onEndGame: () => dispatch(endGame())
  }
}

class App extends Component {
  render() {
    const {onChangeColors, gameState, onStartGame, onEndGame, onSelectOption, background, rightCircle, wrongCircleOne, gameOption, wrongCircleTwo, popupController, popup} = this.props
      
    return (
      <div style={{background: `${background}`}} className='main'>
        {gameState ?
          <div>
            <Title gameState={gameState} gameEnded={onEndGame}/>
            <GameCenter
              correctColor={rightCircle}
              incorrectColorOne={wrongCircleOne}
              incorrectColorTwo={wrongCircleTwo}
              gameOption={gameOption}
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

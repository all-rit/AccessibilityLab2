import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Title from './components/header/title';
import ColorUpdate from './components/header/colorUpdate';
import Home from './components/home/Home';
import GameCenter from './components/game/GameCenter';
import ColorChangePopup from './components/home/colorChangePopup'

import {changeColors, selectGameOption, activatePopup, startGame, endGame, score, gotRight, gotWrong} from './controllers/actions';

const mapStateToProps = state => {
  return {
    background: state.changeColors.background,
    rightCircle: state.changeColors.rightCircle,
    wrongCircleOne: state.changeColors.wrongCircleOne,
    wrongCircleTwo: state.changeColors.wrongCircleTwo,
    gameOption: state.selectGameOption.option,
    gameState: state.gameState.gameStarted,
    popup: state.changeColors.popup,
    numberRight: state.gameState.numRight,
    numberWrong: state.gameState.numWrong,
    currentScore: state.gameState.score,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onChangeColors: (event) => dispatch(changeColors(event)),
    onSelectOption: (event) => dispatch(selectGameOption(event.target.value)),
    onStartGame: () => dispatch(startGame()),
    onEndGame: () => dispatch(endGame()),
    popupController: (event) => dispatch(activatePopup(event)),
    onGotRight: () => dispatch(gotRight()),
    onGotWrong: () => dispatch(gotWrong()),
    onUpdateScore: (event) => dispatch(score(event)),
  }
}

class App extends Component {
  render() {
    const {onChangeColors, onStartGame, onEndGame, onSelectOption, gameState, background, rightCircle, wrongCircleOne, wrongCircleTwo, popupController, popup, numberRight, numberWrong, currentScore,  onUpdateScore, onGotRight, onGotWrong} = this.props
      
    return (
      <div style={{background: `${background}`}} className='main'>
        {gameState ?
          <div>
            <Title gameState={gameState} gameEnded={onEndGame}/>
            <GameCenter
              correctColor={rightCircle}
              incorrectColorOne={wrongCircleOne}
              incorrectColorTwo={wrongCircleTwo}
              score={currentScore}
              scoreUpdate={onUpdateScore}
              right={numberRight}
              wrong={numberWrong}
              gotRight={onGotRight}
              gotWrong={onGotWrong}
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

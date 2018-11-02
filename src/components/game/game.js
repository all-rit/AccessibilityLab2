import React from 'react';
import { connect }  from 'react-redux';
import Circle from './circle';
import Instructions from '../instructions/instructions';
import Score from './score';
import './gameStyle.css';

import {startGame, endGame, score, gotRight, gotWrong} from './controllers/actions';

const mapStateToProps = state => {
  return {
    gameStarted: state.changeColor.gameStarted,
    score: state.changeColor.score,
    numRight: state.changeColor.numRight,
    numWrong: state.changeColor.numWrong,
    amountTime: state.changeColor.amountTime
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onStartGame: () => dispatch(startGame()),
    onEndGame: () => dispatch(endGame()),
    onScore: (event) => dispatch(score(event)),
    onGotRight: () => dispatch(gotRight()),
    onGotWrong: () => dispatch(gotWrong())
  }
}

const game = ({correctColor, incorrectColorOne, incorrectColorTwo, score, right, wrong, onChangeColors, currentColor}) => {

  return (
    <div>
      <div className='circleClicked'>
        <Circle color={currentColor} clickable={true} colors={[correctColor, incorrectColorOne, incorrectColorTwo]}/>
      </div>
      <Instructions 
        correctColor={correctColor} 
        incorrectColorOne={incorrectColorOne}
        incorrectColorTwo={incorrectColorTwo}
      />
      <Score score={score} right={right} wrong={wrong}/>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(game);

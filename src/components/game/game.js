import React from 'react';
import { connect }  from 'react-redux';
import Circle from './circle';
import Instructions from '../instructions/instructions';
import Score from './score';
import Countdown from 'react-countdown-now';
import './gameStyle.css';

import {score, gotRight, clicked, noClick, gotWrong, updateTime} from './controllers/actions';

const mapStateToProps = state => {
  return {
    gameStarted: state.changeColor.gameStarted,
    score: state.changeColor.score,
    numRight: state.changeColor.numRight,
    numWrong: state.changeColor.numWrong,
    amountTime: state.changeColor.amountTime,
    clicked: state.circleClick.clicked,
    correct: state.circleClick.correct,
    startTime: state.changeColor.startTime
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onScore: (event) => dispatch(score(event)),
    onGotRight: () => dispatch(gotRight()),
    onGotWrong: () => dispatch(gotWrong()),
    onClick: (event) => dispatch(clicked(event)),
    onNoClick: (event) => dispatch(noClick()),
    onUpdateTime: (event) => dispatch(updateTime(event))
  }
}

const game = ({correctColor, incorrectColorOne, incorrectColorTwo, startTime, onUpdateTime, onClick, numRight, numWrong}) => {

  if (numRight === 0 && numWrong === 0 && startTime === 0) {
    onUpdateTime(Date.now())
  }

  return (
    <div>
      <Countdown 
        date={startTime + 15000} 
        intervalDelay={0} 
        precision={3} 
        renderer={props => <div className='timer'>Time Remaining: {props.total}</div>}
      />
      <div className='circleClicked'>
        <Circle 
          clickable={true} 
          colors={[correctColor, incorrectColorOne, incorrectColorTwo]} 
          userClicked={onClick}
          startTime={startTime}
        />
      </div>
      <Instructions 
        correctColor={correctColor}
        incorrectColorOne={incorrectColorOne}
        incorrectColorTwo={incorrectColorTwo}
      />
      <Score score={score} right={numRight} wrong={numWrong}/>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(game);

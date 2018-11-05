import React from 'react';
import { connect }  from 'react-redux';
import Countdown from 'react-countdown-now';
import SecondTimer from './secondTimer';
import './gameStyle.css';

import {updateTime} from './controllers/actions';

const mapStateToProps = state => {
  return {
    startTime: state.changeColor.startTime,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onUpdateTime: (event) => dispatch(updateTime(event))
  }
}

const game = ({correctColor, incorrectColorOne, incorrectColorTwo, startTime, onUpdateTime, background, gameOption}) => {

  if (startTime === 0) {
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
      <SecondTimer
        correctColor={correctColor}
        incorrectColorOne={incorrectColorOne}
        incorrectColorTwo={incorrectColorTwo}
        startTime={startTime}
        background={background}
        gameOption={gameOption}
      />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(game);

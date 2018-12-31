import React, {Component} from 'react';
import { connect }  from 'react-redux';
import Countdown from 'react-countdown-now';
import SecondTimer from './secondTimer';
import Instructions from '../instructions/instructions';
import Circle from './circle';
import Title from './../header/title';
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

class game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startTime: 0
    }
  }

  render() {
    const {correctColor, incorrectColorOne, incorrectColorTwo,
      background, gameOption, resetOption, onChangeGameColors, colors,
      resetColors} = this.props;

  if (this.state.startTime === 0) {
    this.setState({startTime: Date.now()})
  }

  const updateTime = () => {
    this.setState({startTime: 0});
  }

  const mainTimerRenderer = (props) => {
    if (props.total === 0) {
      return null;
    } else {
      let milliseconds = props.milliseconds;
      milliseconds = milliseconds / 100;
      return (<div className='timer right'>{props.seconds}.{milliseconds}</div>);
    }
  }

  const renderer = (props) => {
    if (props.total === 0) {
      return(
        <div>
          <Countdown
            date={this.state.startTime + 18000}
            intervalDelay={0}
            precision={1}
            renderer={mainTimerRenderer}
          />
          <Title gameState={true} />
          <SecondTimer
            onUpdateTime={updateTime}
            correctColor={correctColor}
            incorrectColorOne={incorrectColorOne}
            incorrectColorTwo={incorrectColorTwo}
            startTime={this.state.startTime}
            background={background}
            gameOption={gameOption}
            resetOption={resetOption}
            onChangeGameColors={onChangeGameColors}
            colors={colors}
            resetColors={resetColors}
          />
        </div>
      );
    }
    return (
      <div>
        <Title gameState={true} />
        <div className='timer startTimer'>
          {props.seconds}
        </div>
        <div className='center prescreen'>
          <Circle color={correctColor} />
          <div className='arrow'>
            <div className='point'></div>
            <div className='line'></div>
          </div>
          <div>
            <p className='prescreenText'>Click this color whenever it appears here!</p>
            <p className='prescreenText'>If its one of the other colors, don't click!</p>
          </div>
        </div>
        <Instructions
          correctColor={correctColor}
          incorrectColorOne={incorrectColorOne}
          incorrectColorTwo={incorrectColorTwo}
        />
      </div>
    );
  }

  return (
    <div>
      {this.state.startTime === 0 ?
        null
        :
      <Countdown
        date={this.state.startTime + 3000}
        intervalDelay={1000}
        precision={1}
        renderer={renderer}
      />
      }
    </div>
  );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(game);

import React, {Component} from 'react';
import { connect }  from 'react-redux';
import Countdown from 'react-countdown-now';
import SecondTimer from './secondTimer';
import Instructions from '../instructions/instructions';
import Circle from './circle';
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
    const {correctColor, incorrectColorOne, incorrectColorTwo, background, gameOption} = this.props;

  if (this.state.startTime === 0) {
    console.log(this.state.startTime);
    this.setState({startTime: Date.now()})
    console.log(this.state.startTime);
  }

  const updateTime = () => {
    this.setState({startTime: 0});
  }

  const mainTimerRenderer = (props) => {
    if (props.total === 0) {
      return null;
    } else {
      return (<div className='timer'>Time Remaining: {props.total}</div>);
    }
  }

  const renderer = (props) => {
    console.log(props.total);
    if (props.total === 0) {
      return(
        <div>
          <Countdown 
            date={this.state.startTime + 18000} 
            intervalDelay={0} 
            precision={3} 
            renderer={mainTimerRenderer}
          />
          <SecondTimer
            onUpdateTime={updateTime}
            correctColor={correctColor}
            incorrectColorOne={incorrectColorOne}
            incorrectColorTwo={incorrectColorTwo}
            startTime={this.state.startTime}
            background={background}
            gameOption={gameOption}
          />
        </div>
      );
    }
    return (
      <div>
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

  console.log(this.state.startTime);

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

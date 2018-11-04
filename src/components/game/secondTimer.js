import React from 'react';
import Score from './score';
import Instructions from './../instructions/instructions';
import Circle from './circle';
import Countdown from 'react-countdown-now';

const SecondTimer = ({correctColor, incorrectColorOne, incorrectColorTwo, startTime}) => {

  let currentColor, correct;
  let clicked = false;
  let time = 1;
  let score = 0;
  let numRight = 0;
  let numWrong = 0;

  const calculateScore = () => {
    if (clicked) {
      if (correct) {
        numRight ++;
        if (time < .1) {
          score += 100;
        } else if (time > .1 && time < .21) {
          score += 75;
        } else if (time > .2 && time < .31) {
          score += 50;
        } else if (time > .3 && time < .41) {
          score += 35;
        } else if (time > .4 && time < .51) {
          score += 25;
        } else if (time > .5 && time < .61) {
          score += 15;
        } else if (time > .6 && time < .71) {
          score += 10;
        } else {
          score += 5;
        }
      } else {
        numWrong ++;
        score -= 75;
      }
      clicked = false;
      time = 1;
    } else {
      if (correct) {
        numWrong ++;
        score -= 200;
      } else {
        numRight ++;
        score += 10;
      }
    }
  }

  const calculateRandomColor = () => {
    let options = [correctColor, incorrectColorOne, incorrectColorTwo];
    let position = Math.floor(Math.random() * (3));
    currentColor = options[position];
    return options[position];
  }

  const onClick = () => {
    if(!clicked) {
      clicked = true;
      time = ((Date.now() - startTime)/1000) % 1;
    }
  }

  const renderer = () => {
    correct = (currentColor === correctColor);
    calculateRandomColor();
    calculateScore();
    return (
      <div>
        <div className='circleClicked'>
          <Circle 
            clickable={true}
            color={currentColor}
            onClick={onClick}
          />
        </div>
        <Instructions
          correctColor={correctColor}
          incorrectColorOne={incorrectColorOne}
          incorrectColorTwo={incorrectColorTwo}
        />
        <Score
          score={score}
          right={numRight}
          wrong={numWrong}
        />
      </div>
    );
  }

  return(
    <div>
      <Countdown
        date={startTime + 14000}
        intervalDelay={1000}
        precision={2}
        renderer={renderer}
      />
    </div>
  );
}

export default SecondTimer;

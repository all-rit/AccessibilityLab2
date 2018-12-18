import React from 'react';
import Score from './score';
import Instructions from './../instructions/instructions';
import Circle from './circle';
import Replay from './replay';
import Countdown from 'react-countdown-now';

//Component for the secondary timer used for each of the circles per second
const SecondTimer = ({correctColor, incorrectColorOne, incorrectColorTwo,
  startTime, gameOption, background, onUpdateTime, selectOption}) => {

  let currentColor, correct;
  let clicked = false;
  let time = 1;
  let score = 0;
  let numRightOnClick = 0;
  let numRightOnNoClick = 0;
  let numWrongOnClick = 0;
  let numWrongOnNoClick = 0;
  let first = true;

  const isHex = (gameOption === 'hex');

  //Calculates the score based on the response from the user
  const calculateScore = () => {
    if (clicked) {
      if (correct) {
        numRightOnClick ++;
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
        numWrongOnClick ++;
        score -= 75;
      }
      clicked = false;
      time = 1;
    } else {
      if (correct) {
        numWrongOnNoClick ++;
        score -= 200;
      } else {
        numRightOnNoClick ++;
        score += 10;
      }
    }
  }

  //Randomly generates a color for the middle circle
  const calculateRandomColor = () => {
    let options = [correctColor, incorrectColorOne, incorrectColorTwo];
    let position = Math.floor(Math.random() * (3));
    currentColor = options[position];
    return options[position];
  }

  //Handles the click of the middle circle and records the time
  const onClick = () => {
    if(!clicked) {
      clicked = true;
      time = ((Date.now() - startTime)/1000) % 1;
    }
  }

  //turns the data found into an object so it can be passed to the backend
  //after it is converted, the system sends the info to the backend and then
  //will record the results from the past five games in the state of the game
  const recordData = () => {
    const data = {
      score,
      numRightOnClick,
      numWrongOnClick,
      numRightOnNoClick,
      numWrongOnNoClick,
      Mode: [gameOption.toUpperCase()],
    };

    const dataJSON = JSON.stringify(data);
    console.log(dataJSON);

    fetch('http://localhost:5000/gameStats', {
      method: 'POST',
      headers: new Headers({'content-type': 'application/json'}),
      body: JSON.stringify(data)
    })
    .then(response => console.log(response))
    //Need to store response in the controller (redux) and pass to previousGames
    .catch(err => console.log(err));
  }

  //Specified by the timer for custom rendering of the center circle
  const renderer = (props) => {
    correct = (currentColor === correctColor);
    calculateRandomColor();
    if (!first) {
      calculateScore();
    } else {
      first = false;
    }
    if (props.total === 0) {
      recordData();
    }
    //Returns either the replay screen option or the center circle that
    //Changes every second
    return (
      <div>
        {props.total === 0 ?
        <Replay
          onUpdateTime={onUpdateTime}
          score={score}
          right={numRightOnClick+numRightOnNoClick}
          wrong={numWrongOnClick+numWrongOnNoClick}
          selectOption={selectOption}
        />
        :
        <div className='circleClicked'>
          <Circle
            clickable={true}
            color={currentColor}
            onClick={onClick}
          />
        </div>
        }
        <Instructions
          correctColor={correctColor}
          incorrectColorOne={incorrectColorOne}
          incorrectColorTwo={incorrectColorTwo}
        />
        <Score
          score={score}
          rightClick={numRightOnClick}
          wrongClick={numWrongOnClick}
          rightNoClick={numRightOnNoClick}
          wrongNoClick={numWrongOnNoClick}
          isHex={isHex}
          background={background}
          currentColor={currentColor}
        />
      </div>
    );
  }

  //Used only for the react component used for the countdown system
  return(
    <div>
      <Countdown
        date={startTime + 18000}
        intervalDelay={1000}
        precision={2}
        renderer={renderer}
      />
    </div>
  );
}

export default SecondTimer;

import React, {Component} from 'react';
import Score from './score';
import Instructions from './../instructions/instructions';
import Circle from './circle';
import Replay from './replay';
import Countdown from 'react-countdown-now';

//Component for the secondary timer used for each of the circles per second
class SecondTimer extends Component {

  //State for score information
  constructor(props) {
    super(props);
    this.currentColor = null;
    this.correct = null;
    this.clicked = false;
    this.time = 1;
    this.score = 0;
    this.numRightOnClick = 0;
    this.numRightOnNoClick = 0;
    this.numWrongOnClick = 0;
    this.numWrongOnNoClick = 0;
    this.first = true;
  }

  render() {
    const {correctColor, incorrectColorOne, incorrectColorTwo, startTime,
      gameOption, background, onUpdateTime, selectOption, resetOption}
       = this.props;

    const isHex = (gameOption === 'hex');

    //Calculates the score based on the response from the user
    const calculateScore = () => {
      if (this.numRightOnClick + this.numRightOnNoClick + this.numWrongOnClick +
      this.numWrongOnNoClick !== 15) {
        if (this.clicked) {
          if (this.correct) {
            this.numRightOnClick ++;
            if (this.time < .1) {
              this.score += 100;
            } else if (this.time > .1 && this.time < .21) {
              this.score += 75;
            } else if (this.time > .2 && this.time < .31) {
              this.score += 50;
            } else if (this.time > .3 && this.time < .41) {
              this.score += 35;
            } else if (this.time > .4 && this.time < .51) {
              this.score += 25;
            } else if (this.time > .5 && this.time < .61) {
              this.score += 15;
            } else if (this.time > .6 && this.time < .71) {
              this.score += 10;
            } else {
              this.score += 5;
            }
          } else {
            this.numWrongOnClick ++;
            this.score -= 75;
          }
          this.clicked = false;
          this.time = 1;
        } else {
          if (this.correct) {
            this.numWrongOnNoClick ++;
            this.score -= 200;
          } else {
            this.numRightOnNoClick ++;
            this.score += 10;
          }
        }
      }
    }

    //Randomly generates a color for the middle circle
    const calculateRandomColor = () => {
      let options = [correctColor, incorrectColorOne, incorrectColorTwo];
      let position = Math.floor(Math.random() * (3));
      this.currentColor = options[position];
      return options[position];
    }

    //Handles the click of the middle circle and records the time
    const onClick = () => {
      if(!this.clicked) {
        this.clicked = true;
        this.time = ((Date.now() - startTime)/1000) % 1;
      }
    }

    //turns the data found into an object so it can be passed to the backend
    //after it is converted, the system sends the info to the backend and then
    //will record the results from the past five games in the state of the game
    const recordData = () => {
      let score = this.score;
      let numRightOnClick = this.numRightOnClick;
      let numWrongOnClick = this.numWrongOnClick;
      let numRightOnNoClick = this.numRightOnNoClick;
      let numWrongOnNoClick = this.numWrongOnNoClick;
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
      console.log(this.currentColor);
      console.log(correctColor);
      this.correct = (this.currentColor === correctColor);
      console.log(this.correct);
      calculateRandomColor();
      if (!this.first) {
        calculateScore();
      } else {
        this.first = false;
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
            score={this.score}
            right={this.numRightOnClick+this.numRightOnNoClick}
            wrong={this.numWrongOnClick+this.numWrongOnNoClick}
            selectOption={selectOption}
            resetOption={resetOption}
          />
          :
          <div className='circleClicked'>
            <Circle
              clickable={true}
              color={this.currentColor}
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
            score={this.score}
            rightClick={this.numRightOnClick}
            wrongClick={this.numWrongOnClick}
            rightNoClick={this.numRightOnNoClick}
            wrongNoClick={this.numWrongOnNoClick}
            isHex={isHex}
            background={background}
            currentColor={this.currentColor}
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
}

export default SecondTimer;

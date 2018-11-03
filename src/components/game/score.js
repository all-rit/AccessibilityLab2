import React from 'react';
import './gameStyle.css';

const Score = ({score, right, wrong, scored, clicked, gotRight, gotWrong, correct}) => {

  const calculateScore = (time) => {
    if (clicked) {
      if (correct) {
        gotRight();
        const timeCalculation = time % 1
        if (timeCalculation < .1) {
          scored(100);
        } else if (timeCalculation > .1 && timeCalculation < .21) {
          scored(75);
        } else if (timeCalculation > .20 && timeCalculation < .31) {
          scored(50);
        } else if (timeCalculation > .30 && timeCalculation < .41) {
          scored(35);
        } else if (timeCalculation > .40 && timeCalculation < .51) {
          scored(25);
        } else if (timeCalculation > .50 && timeCalculation < .61) {
          scored(15);
        } else if (timeCalculation > .60 && timeCalculation < .71) {
          scored(10);
        } else {
          scored(5);
        }
      } else {
        gotWrong();
        scored(-75);
      }
    } else {
      if (correct) {
        gotWrong();
        scored(-200);
      } else {
        gotRight();
        scored(10);
      }
    }
  }

  return (
    <div className='scoreLine'>
      <p className='scoreElement'>Score: {score}</p>
      <p className='scoreElement'>Number Right: {right}</p>
      <p className='scoreElement'>Number Wrong: {wrong}</p>
    </div>
  );
}

export default Score;

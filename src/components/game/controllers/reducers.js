import {
  SCORE,
  RIGHT,
  WRONG,
  CLICKED,
  NOCLICK,
  STARTTIME
} from './constants';

const initalGameState = {
  gameStarted: false,
  score: 0,
  numRight: 0,
  numWrong: 0,
  amountTime: 15.0,
  startTime: 0
}

export const changeColor = (state = initalGameState, action = {}) => {
  switch (action.type) {
    case SCORE:
      return {...state, score: action.payload}
    case RIGHT:
      return {...state, numRight: state.numRight + 1}
    case WRONG:
      return {...state, numWrong: state.numWrong + 1};
    case STARTTIME:
      return {...state, startTime: action.payload};
    default:
      return state;
  }
}

const Click = {
  clicked: false,
  correct: false,
  time: 1.0
}

export const circleClick = (state = Click, action = {}) => {
  switch (action.type) {
    case CLICKED:
      console.log(action.payload);
      return Object.assign({}, state, {clicked: true, correct: action.playload})
    case NOCLICK:
      return Object.assign({}, state, {clicked: false, correct: action.playload})
    default:
      return state;
  }
}

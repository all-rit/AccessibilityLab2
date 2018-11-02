import {
  START_GAME,
  END_GAME,
  SCORE,
  RIGHT,
  WRONG
} from './constants';

const initalGameState = {
  gameStarted: false,
  score: 0,
  numRight: 0,
  numWrong: 0,
  amountTime: 15.0
}

export const changeColor = (state = initalGameState, action = {}) => {
  switch (action.type) {
    case START_GAME:
      return {...state, gameStarted: true}
    case END_GAME:
      return {...state, gameStarted: false}
    case SCORE:
      return {...state, score: action.payload}
    case RIGHT:
      return {...state, numRight: state.numRight + 1}
    case WRONG:
      return {...state, numWrong: state.numWrong + 1};
    default:
      return state;
  }
}

import {
  STARTTIME
} from './constants';

const initalGameState = {
  startTime: 0
}

export const changeColor = (state = initalGameState, action = {}) => {
  switch (action.type) {
    case STARTTIME:
      return {...state, startTime: action.payload};
    default:
      return state;
  }
}

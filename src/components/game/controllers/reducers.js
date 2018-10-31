import {
  UPDATE_RAND_COLOR,
} from './constants';

const initalColor = {
  clickableColor: '#FFFFFF'
}

export const changeColor = (state = initalColor, action = {}) => {
  switch(action.type) {
    case UPDATE_RAND_COLOR:
      console.log(action.payload);
      return {...state, clickableColor: action.payload};
    default:
      return state;
  }
}

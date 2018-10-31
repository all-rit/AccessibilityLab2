import {
  UPDATE_RAND_COLOR,
} from './constants';

export const updateColor = (color) => ({
  type: UPDATE_RAND_COLOR,
  payload: color
})

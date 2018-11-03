import {
  SCORE, 
  RIGHT, 
  WRONG,
  CLICKED,
  NOCLICK,
  STARTTIME
} from './constants';

export const score = (points) => ({
  type: SCORE,
  payload: points
})

export const gotRight = () => ({
  type: RIGHT
})

export const gotWrong = () => ({
  type: WRONG
})

export const updateTime = (time) => ({
  type: STARTTIME,
  payload: time
})

export const clicked = (correct) => ({
  type: CLICKED,
  payload: correct
})

export const noClick = (correct) => ({
  type: NOCLICK
});

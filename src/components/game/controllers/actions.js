import {
  START_GAME, 
  END_GAME,
  SCORE, 
  RIGHT, 
  WRONG
} from './constants';

export const startGame = () => ({
  type: START_GAME
})

export const endGame = () => ({
  type: END_GAME
})

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

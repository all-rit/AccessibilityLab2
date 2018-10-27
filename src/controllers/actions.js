import {
  UPDATE_COLORS,
  START_GAME,
  END_GAME,
  SELECT_OPTION, 
  ACTIVATE_POPUP,
  SCORE,
  RIGHT,
  WRONG,
  TIME
} from './constants.js';

export const changeColors = (colors) => ({
  type: UPDATE_COLORS,
  payload: colors
})

export const selectGameOption = (gameType) => ({
  type: SELECT_OPTION,
  payload: gameType
})

export const startGame = () => ({
  type: START_GAME
})

export const endGame = () => ({
  type: END_GAME
})

export const activatePopup = (popup) => ({
  type: ACTIVATE_POPUP,
  payload: popup
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

export const updateTime = (time) => ({
  type: TIME
})

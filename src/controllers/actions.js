import {
  UPDATE_COLORS,
  START_GAME,
  SELECT_OPTION, 
} from './constants.js';

export const changeColors = () => ({
  type: UPDATE_COLORS
})

export const selectGameOption = (gameType) => ({
  type: SELECT_OPTION,
  payload: gameType
})

export const startGame = () => ({
  type: START_GAME
})

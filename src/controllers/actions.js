import {
  UPDATE_COLORS,
  START_GAME,
  END_GAME,
  SELECT_OPTION, 
  ACTIVATE_POPUP
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

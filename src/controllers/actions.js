import {
  UPDATE_COLORS,
  START_GAME,
  SELECT_OPTION, 
  ACTIVATE_POPUP
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

export const activatePopup = (popup) => ({
  type: ACTIVATE_POPUP,
  payload: popup
})

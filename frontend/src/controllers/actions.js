import {
  UPDATE_DEFAULT_COLORS,
  UPDATE_GAME_COLORS,
  SELECT_OPTION,
  ACTIVATE_POPUP,
  RESET_COLORS,
  RESET_OPTION,
  START_GAME,
  END_GAME,
  LOGIN,
  CHANGED_RESET
} from './constants.js';

export const changeDefaultColors = (colors) => ({
  type: UPDATE_DEFAULT_COLORS,
  payload: colors
})

export const changeGameColors = (colors) => ({
  type: UPDATE_GAME_COLORS,
  payload: colors
})

export const selectGameOption = (gameType) => ({
  type: SELECT_OPTION,
  payload: gameType
})

export const activatePopup = (popup) => ({
  type: ACTIVATE_POPUP,
  payload: popup
})

export const startGame = () => ({
  type: START_GAME
})

export const endGame = () => ({
  type: END_GAME
})

export const resetOption = () => ({
  type: RESET_OPTION
})

export const resetColors = () => ({
  type: RESET_COLORS
})

export const login = (user) => ({
  type: LOGIN,
  payload: user
})

export const resetChange = () => ({
  type: CHANGED_RESET
})

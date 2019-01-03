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
  CHANGED_RESET,
  CLOSE_INFO_POPUP,
  ABOUT_STATE,
  END_ABOUT_STATE
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

export const closeInfoPopup = () => ({
  type: CLOSE_INFO_POPUP
})

export const openAboutPage = () => ({
  type: ABOUT_STATE
})

export const closeAboutPage = () => ({
  type: END_ABOUT_STATE
})

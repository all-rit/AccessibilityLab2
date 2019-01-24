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
  END_ABOUT_STATE,
  STAT_STATE,
  END_STAT_STATE,
  FIRST_GAME,
} from './constants.js';

/*
Used to update the colors for the entire system (from popup)
*/
export const changeDefaultColors = (colors) => ({
  type: UPDATE_DEFAULT_COLORS,
  payload: colors
})

/*
Used to update the colors for the game screen only (from simulation calculation)
*/
export const changeGameColors = (colors) => ({
  type: UPDATE_GAME_COLORS,
  payload: colors
})

/*
Used to specifiy the game option outlined by the individual on the system
*/
export const selectGameOption = (gameType) => ({
  type: SELECT_OPTION,
  payload: gameType
})

/*
Used to open the popup allowing for an individual to change the colors in
the system
*/
export const activatePopup = (popup) => ({
  type: ACTIVATE_POPUP,
  payload: popup
})

/*
Used to declare the game state has started
*/
export const startGame = () => ({
  type: START_GAME
})

/*
Used to declare the game state has ended
*/
export const endGame = () => ({
  type: END_GAME
})

/*
Used to reset the options for the dropdown each time to ensure the
'default' option is always used unless otherwise specified
*/
export const resetOption = () => ({
  type: RESET_OPTION
})

/*
Resets all of the game colors to the current colors for the system
*/
export const resetColors = () => ({
  type: RESET_COLORS
})

/*
Starts the login process for users
*/
export const login = (user) => ({
  type: LOGIN,
  payload: user
})

/*
Used to declare changes have not been made to the system to cause the rerender
*/
export const resetChange = () => ({
  type: CHANGED_RESET
})

/*
Used to close the popup for changing the system colors
*/
export const closeInfoPopup = () => ({
  type: CLOSE_INFO_POPUP
})

/*
Used to switch pages to the about page
*/
export const openAboutPage = () => ({
  type: ABOUT_STATE
})

/*
Used to switch pages back to the home page from the about page
*/
export const closeAboutPage = () => ({
  type: END_ABOUT_STATE
})

/*
Used to switch pages to the statistics page
*/
export const openStatPage = () => ({
  type: STAT_STATE
})

/*
Used to switch pages back to the home page from the stats page
*/
export const closeStatPage = () => ({
  type: END_STAT_STATE
})

/*
Used to declare a game as not the first game
*/
export const endFirstGame = () => ({
  type: FIRST_GAME
})

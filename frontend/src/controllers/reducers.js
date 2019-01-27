import{
  SELECT_OPTION,
  UPDATE_DEFAULT_COLORS,
  UPDATE_GAME_COLORS,
  RESET_COLORS,
  RESET_OPTION,
  ACTIVATE_POPUP,
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
  INFO_STATE,
  END_INFO_STATE,
  INFO_STATE_TWO,
  END_INFO_STATE_TWO,
  OPEN_LEADERBOARD,
  CLOSE_LEADERBOARD
} from "./constants.js"

//Declaing initial state for the colors in the system
const initialColors = {
  baseBackground: "#00CC00",
  baseRightCircle: "#0000E6",
  baseWrongCircleOne: "#0000CC",
  baseWrongCircleTwo: "#0000FF",
  gameBackground: '#00CC00',
  gameRightCircle: '#0000E6',
  gameWrongCircleOne: '#0000CC',
  gameWrongCircleTwo: '#0000FF',
  popup: false,
  changed: false
}

//Function for changing the colors for both the game and entire system
export const changeColors = (state = initialColors, action = {}) => {
  switch(action.type) {
    case UPDATE_DEFAULT_COLORS:
      return Object.assign({}, state, {baseBackground: action.payload[0],
        baseRightCircle: action.payload[1], baseWrongCircleOne: action.payload[2],
        baseWrongCircleTwo: action.payload[3], changed: true});
    case UPDATE_GAME_COLORS:
      return Object.assign({}, state, {gameBackground: action.payload[0],
        gameRightCircle: action.payload[1], gameWrongCircleOne: action.payload[2],
        gameWrongCircleTwo: action.payload[3]});
    case ACTIVATE_POPUP:
      return {...state, popup: action.payload};
    case RESET_COLORS:
      return Object.assign({}, state,
        {gameBackground: initialColors.baseBackground,
        gameRightCircle: initialColors.baseRightCircle,
        gameWrongCircleOne: initialColors.baseWrongCircleOne,
        gameWrongCircleTwo: initialColors.baseWrongCircleTwo});
    case CHANGED_RESET:
      return Object.assign({}, state, {changed: false});
    default:
      return state;
  }
}

//initial state for the game option
const initialOption = {
  option: "default",
}

//Function for changing the game option
export const selectGameOption = (state = initialOption, action = {}) => {
  switch(action.type) {
    case SELECT_OPTION:
      return {...state, option: action.payload};
    case RESET_OPTION:
      return {...state, option: 'default'};
    default:
      return state;
  }
}

//initial state for the other page controllers
const initialGameState = {
  gameState: false,
  oneGamePlayed: false,
  alreadyCalled: false,
  secondInfoState: false,
  thirdInfoState: false,
  aboutState: false,
  statState: false,
  firstGame: true,
  secondGame: false,
  gamesPlayed: 0,
  leaderboardState: false,
}

//Function for changing to other pages in the application
export const changeGameState = (state = initialGameState, action = {}) => {
  switch(action.type) {
    case START_GAME:
      return {...state, gameState: true}
    case END_GAME:
      return {...state, gameState: false,
        gamesPlayed: initialGameState.gamesPlayed += 1, alreadyCalled: false}
    case FIRST_GAME:
      return {...state, firstGame: false}
    case ABOUT_STATE:
      return {...state, aboutState: true}
    case END_ABOUT_STATE:
      return {...state, aboutState: false}
    case STAT_STATE:
      return {...state, statState: true}
    case END_STAT_STATE:
      return {...state, statState: false}
    case INFO_STATE:
      return {...state, secondInfoState: true}
    case END_INFO_STATE:
      return {...state, secondInfoState: false, alreadyCalled: true}
    case INFO_STATE_TWO:
      return {...state, thirdInfoState: true}
    case END_INFO_STATE_TWO:
      return {...state, thirdInfoState: false, alreadyCalled: true}
    case OPEN_LEADERBOARD:
      return {...state, leaderboardState: true}
    case CLOSE_LEADERBOARD:
      return {...state, leaderboardState: false}
    default:
      return state;
  }
}

//Initial state for user information
const initialLoginState = {
  user: null,
  loggedIn: false,
  infoPopup: false,
  admin: null
}

//Function for changing the user information to include login information
export const changeUser = (state = initialLoginState, action = {}) => {
  switch(action.type) {
    case LOGIN:
      return Object.assign({}, state, {user: action.payload[0], loggedIn: true,
      infoPopup: action.payload[1], admin: action.payload[2]});
    case CLOSE_INFO_POPUP:
      return Object.assign({}, state, {infoPopup: false})
    default:
      return state;
  }
}

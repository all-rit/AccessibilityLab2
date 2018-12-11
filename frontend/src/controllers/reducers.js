import{
  SELECT_OPTION, 
  UPDATE_DEFAULT_COLORS,
  UPDATE_GAME_COLORS,
  RESET_COLORS,
  RESET_OPTION,
  ACTIVATE_POPUP,
  START_GAME, 
  END_GAME,
  LOGIN
} from "./constants.js"

const initialColors = {
  baseBackground: "#00CC00",
  baseRightCircle: "#0000E6",
  baseWrongCircleOne: "#0000CC",
  baseWrongCircleTwo: "#0000FF",
  gameBackground: '#00CC00',
  gameRightCircle: '#0000E6',
  gameWrongCircleOne: '#0000CC',
  gameWrongCircleTwo: '#0000FF',
  popup: false
}

export const changeColors = (state = initialColors, action = {}) => {
  switch(action.type) {
    case UPDATE_DEFAULT_COLORS:
      return Object.assign({}, state, {baseBackground: action.payload[0], 
        baseRightCircle: action.payload[1], baseWrongCircleOne: action.payload[2], 
        baseWrongCircleTwo: action.payload[3]});
    case UPDATE_GAME_COLORS:
      return Object.assign({}, state, {gameBackground: action.payload[0],
        gameRightCircle: action.payload[1], gameWrongCircleOne: action.payload[2],
        gameWrongCircleTwo: action.payload[3]});
    case ACTIVATE_POPUP:
      return {...state, popup: action.payload};
    case RESET_COLORS:
      return Object.assign({}, state, {background: '#FFA64D', rightCircle: '#00D670', 
        wrongCircleOne: '#FFC2C2', wrongCircleTwo: '#B8B800'});
    default:
      return state;
  }
}

const initialOption = {
  option: "default",
}

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

const initialGameState = {
  gameState: false
}

export const changeGameState = (state = initialGameState, action = {}) => {
  switch(action.type) {
    case START_GAME:
      return {...state, gameState: true}
    case END_GAME:
      return {...state, gameState: false}
    default:
      return state;
  }
}

const initialLoginState = {
  user: null,
  loggedIn: false
}

export const changeUser = (state = initialLoginState, action = {}) => {
  switch(action.type) {
    case LOGIN:
      return Object.assign({}, state, {user: action.payload, loggedIn: true})
    default:
      return state;
  }
}

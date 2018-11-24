import{
  SELECT_OPTION, 
  UPDATE_COLORS,
  RESET_COLORS,
  RESET_OPTION,
  ACTIVATE_POPUP,
  START_GAME, 
  END_GAME,
  LOGIN
} from "./constants.js"

const initialColors = {
  background: "#FFA64D",
  rightCircle: "#00D67D",
  wrongCircleOne: "#FFC2C2",
  wrongCircleTwo: "#B8B800",
  popup: false
}

export const changeColors = (state = initialColors, action = {}) => {
  switch(action.type) {
    case UPDATE_COLORS:
      return Object.assign({}, state, {background: action.payload[0], 
        rightCircle: action.payload[1], wrongCircleOne: action.payload[2], 
        wrongCircleTwo: action.payload[3]});
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

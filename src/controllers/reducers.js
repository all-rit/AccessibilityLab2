import{
  START_GAME,
  END_GAME,
  SELECT_OPTION, 
  UPDATE_COLORS,
  ACTIVATE_POPUP,
  SCORE,
  RIGHT,
  WRONG,
  TIME
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
    default:
      return state;
  }
}

const initialOption = {
  option: "default"
}

export const selectGameOption = (state = initialOption, action = {}) => {
  switch(action.type) {
    case SELECT_OPTION:
      return {...state, option: action.payload};
    default:
      return state;
  }
}

const initialGameState = {
  gameStarted: false,
  score: 0,
  numRight: 0,
  numWrong: 0,
  amountTime: 15.0,
}

export const gameState = (state = initialGameState, action = {}) => {
  switch(action.type) {
    case START_GAME:
      return {...state, gameStarted: true};
    case END_GAME:
      return {...state, gameStarted: false};
    case SCORE: 
      return {...state, score: action.payload};
    case RIGHT:
      return {...state, numRight: state.numRight + 1};
    case WRONG:
      return {...state, numWrong: state.numWrong + 1};
    case TIME:
      return {...state, amountTime: action.payload};
    default:
      return state;
  }
}

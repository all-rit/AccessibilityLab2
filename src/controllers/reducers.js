import{
  START_GAME,
  SELECT_OPTION, 
  UPDATE_COLORS,
} from "./constants.js"

const initialColors = {
  background: "#FFA64D",
  rightCircle: "#00D67D",
  wrongCircleOne: "#FFC2C2",
  wrongCircleTwo: "#B8B800"
}

export const changeColors = (state = initialColors, action = {}) => {
  switch(action.type) {
    case UPDATE_COLORS:
      return Object.assign({}, state, {background: action.payload[0], 
        rightCircle: action.payload[1], wrongCircleOne: action.payload[2], 
        wrongCircleTwo: action.payload[3]});
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
  gameStarted: false
}

export const startGame = (state = initialGameState, action = {}) => {
  switch(action.type) {
    case START_GAME:
      return {...state, option: action.payload};
    default:
      return state;
  }
}

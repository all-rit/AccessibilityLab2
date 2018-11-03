import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import {changeColor, circleClick} from './controllers/reducers';
import Game from './game.js';

class GameCenter extends Component {
  constructor(props) {
    super(props)
    this.rootReducer = combineReducers({changeColor, circleClick})
    this.store = createStore(this.rootReducer)
  }

  render() {
    const {correctColor, incorrectColorOne, incorrectColorTwo, score, right, wrong} = this.props; 

    return (
      <Provider store={this.store}>
        <Game 
          correctColor={correctColor}
          incorrectColorOne={incorrectColorOne}
          incorrectColorTwo={incorrectColorTwo}
          score={score}
          right={right}
          wrong={wrong}
        />
      </Provider>
    );
  }
}

export default GameCenter; 

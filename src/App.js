import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';

import {changeColors, selectGameOption, startGame} from './controllers/actions';

const mapStateToProps = state => {
  return {
    background: state.changeColors.background,
    rightCircle: state.changeColors.rightCircle,
    wrongCircleOne: state.changeColors.wrongCircleOne,
    wrongCircleTwo: state.changeColors.wrongCircleTwo,
    gameOption: state.selectGameOption.option,
    gameState: state.startGame.gameStartedm
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onChangeColors: (event) => dispatch(changeColors(event)),
    onSelectOption: (event) => dispatch(selectGameOption(event.target.value)),
    onStartGame: () => dispatch(startGame()),
  }
}

class App extends Component {
  render() {
    const {onChangeColors, onStartGame, onSelectOption} = this.props

    return (
      <div>
        <h1>Color Clicker</h1>
        <p>How fast can you click the right colored circle?</p>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

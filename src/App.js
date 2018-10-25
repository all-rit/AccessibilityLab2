import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Title from './components/header/title';
import ColorUpdate from './components/header/colorUpdate';

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
    const {onChangeColors, onStartGame, onSelectOption, background} = this.props
      
    return (
      <div style={{background: `${background}`}}>
        <ColorUpdate />
        <Title />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

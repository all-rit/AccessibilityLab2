import React, {Component} from 'react';
import {connect} from 'react-redux';
import './App.css';
import Title from './components/header/title';
import ColorUpdate from './components/header/colorUpdate';
import Home from './components/home/Home';
import ColorChangePopup from './components/home/colorChangePopup'

import {changeColors, selectGameOption, activatePopup, startGame} from './controllers/actions';

const mapStateToProps = state => {
  return {
    background: state.changeColors.background,
    rightCircle: state.changeColors.rightCircle,
    wrongCircleOne: state.changeColors.wrongCircleOne,
    wrongCircleTwo: state.changeColors.wrongCircleTwo,
    gameOption: state.selectGameOption.option,
    gameState: state.startGame.gameStartedm,
    popup: state.changeColors.popup
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onChangeColors: (event) => dispatch(changeColors(event)),
    onSelectOption: (event) => dispatch(selectGameOption(event.target.value)),
    onStartGame: () => dispatch(startGame()),
    popupController: (event) => dispatch(activatePopup(event)),
  }
}

class App extends Component {
  render() {
    const {onChangeColors, onStartGame, onSelectOption, background, rightCircle, wrongCircleOne, wrongCircleTwo, popupController, popup} = this.props
      
    return (
      <div style={{background: `${background}`}} className='main'>
        <ColorUpdate popupController={popupController}/>
        <Title />
        <Home 
          correctColor={rightCircle} 
          incorrectColorOne={wrongCircleOne} 
          incorrectColorTwo={wrongCircleTwo} 
        />
        {popup ?
          <ColorChangePopup
            changeColors = {onChangeColors}
            popupController={popupController}
          />
          : null
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

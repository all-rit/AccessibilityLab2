import React from 'react';
import { connect }  from 'react-redux';
import Circle from './circle';
import Instructions from '../instructions/instructions';
import Score from './score';
import './gameStyle.css';

import {updateColor} from './controllers/actions';

const mapStateToProps = state => {
  return {
    currentColor: state.changeColor.clickableColor,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onChangeColors: (event) => dispatch(updateColor(event)),
  }
}

const game = ({correctColor, incorrectColorOne, incorrectColorTwo, score, right, wrong, onChangeColors, currentColor}) => {

  return (
    <div>
      <div className='circleClicked'>
        <Circle color={currentColor} clickable={true} colors={[correctColor, incorrectColorOne, incorrectColorTwo]}/>
      </div>
      <Instructions 
        correctColor={correctColor} 
        incorrectColorOne={incorrectColorOne}
        incorrectColorTwo={incorrectColorTwo}
      />
      <Score score={score} right={right} wrong={wrong} updateColor={updateColor}/>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(game);

import React from 'react';
import './homeStyle.css'
import Instructions from '../instructions/instructions';
import Dropdown from './dropdown';

const Home = ({correctColor, incorrectColorOne, incorrectColorTwo, startGame, selectOption, background, gameOption, onChangeGameColors}) => {
  const colors = [background, correctColor, incorrectColorOne, incorrectColorTwo];

  if(gameOption !== 'default') {
    onChangeGameColors([`${background}`, `${correctColor}`, `${incorrectColorOne}`, `${incorrectColorTwo}`])
  }

  return (
    <div>
      <div>
        <Dropdown 
          selectOption = {selectOption} 
          startGame = {startGame}
          gameOption = {gameOption}
          onChangeGameColors = {onChangeGameColors}
          colors = {colors}
        />
      </div>
      <Instructions 
        correctColor={correctColor} 
        incorrectColorOne={incorrectColorOne}
        incorrectColorTwo={incorrectColorTwo}
      />
    </div>
  );
}

export default Home;

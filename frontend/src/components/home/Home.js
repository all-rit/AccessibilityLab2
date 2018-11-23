import React from 'react';
import './homeStyle.css'
import Start from './start';
import Instructions from '../instructions/instructions';
import Dropdown from './dropdown';

const Home = ({correctColor, incorrectColorOne, incorrectColorTwo, startGame, selectOption, background, gameOption, onChangeColors}) => {
  const colors = [background, correctColor, incorrectColorOne, incorrectColorTwo];

  if(gameOption !== 'default') {
    onChangeColors(['#FFA64D', '#00D67D', '#FFC2C2', '#B8B800'])
  }

  return (
    <div>
      <Start 
        startGame={startGame} 
        gameOption={gameOption}
        onChangeColors={onChangeColors}
        colors={colors} 
      />
      <Dropdown selectOption = {selectOption} />
      <Instructions 
        correctColor={correctColor} 
        incorrectColorOne={incorrectColorOne}
        incorrectColorTwo={incorrectColorTwo}
      />
    </div>
  );
}

export default Home;

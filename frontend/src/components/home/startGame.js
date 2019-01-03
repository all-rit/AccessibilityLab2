import React from 'react';
import Start from './start';
import Dropdown from './dropdown';
import './homeStyle.css';

const StartGame = ({selectOption, startGame, gameOption,
  onChangeGameColors, colors}) => {

  const changeOption = (event) => {
    selectOption(event.target.value);
  }

  return (
    <div>
      <div className='center fourthTitle'>
        <p>
          Choose a color vision simulation below and start the game!
        </p>
      </div>
      <div className='center'>
        <Dropdown
          selectOption = {changeOption}
        />
        <Start
          startGame={startGame}
          gameOption={gameOption}
          onChangeGameColors={onChangeGameColors}
          colors={colors}
        />
      </div>
    </div>
  );
}

export default StartGame;

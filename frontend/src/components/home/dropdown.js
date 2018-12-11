import React from 'react';
import Start from './start';
import './homeStyle.css';

const Dropdown = ({selectOption, startGame, gameOption, onChangeGameColors, colors}) => {

  const handleChosenOption = (event) => {
    selectOption(event);
  }

  return (
    <div>
      <div className='center fourthTitle'>
        <p>Choose a color option or optional hex display below and start the game!</p>
      </div>
      <div className='center'>
        <select className='selection' onChange={handleChosenOption}>
          <option 
            value='default' 
            className='textSelection'
          >
            Default
          </option>
          <option 
            value='hex' 
            className='textSelection'
          >
          Hex Numbers
          </option>
          <option 
            value='Protanopia' 
            className='textSelection'
          >
            Protanopia (Red Blindness)
          </option>
          <option 
            value='Deuteranopia'
            className='textSelection'
          >
            Deuteranopia (Green Blindess)
          </option>
          <option 
            value='Tritanomaly' 
            className='textSelection'
          >
            Tritanomaly (Blue Weakness)
          </option>
        </select>
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

export default Dropdown;

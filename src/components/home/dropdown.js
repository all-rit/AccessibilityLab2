import React from 'react';
import './homeStyle.css';

const Dropdown = ({selectOption}) => {

  const handleChosenOption = (event) => {
    selectOption(event);
  }

  return (
    <div className='center'>
      <select className='selection' onChange={handleChosenOption}>
        <option 
          value='default' 
          className='textSelection'
        >
        ---
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
    </div>
  );
}

export default Dropdown;

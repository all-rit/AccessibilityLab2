import React from 'react';

const Dropdown = ({selectOption}) => {

  const handleChosenOption = (event) => {
    selectOption(event);
  }

  return (
    <select className='selection' onChange={handleChosenOption}>
      <option
        value='default'
        className='textSelection'
      >
        Default
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
  );
}

export default Dropdown;

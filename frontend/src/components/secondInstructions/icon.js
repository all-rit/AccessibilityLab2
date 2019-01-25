import React from 'react';
import './secondInstructions.css';
import BellIcon from 'react-bell-icon'

const Icon = ({click}) => {

  return  (
    <BellIcon width='50' active={true} animate={true} onClick={click} />
  );
}

export default Icon;

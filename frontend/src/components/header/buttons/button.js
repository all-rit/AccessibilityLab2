import React from 'react';
import '../title.css';

/*
Component for creating a generic button for the system
*/
const Button = ({clickMethod, message, fontSizing}) => {

  //Handles a click by the user
  const onClick = () => {
    clickMethod();
  }

  return (
    <button
      onClick={onClick}
      style={{fontSize:`${fontSizing}`}}
      className='Button'
    >
      {message}
    </button>
  );
}

export default Button;

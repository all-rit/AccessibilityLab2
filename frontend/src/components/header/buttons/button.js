import React from 'react';
import '../title.css';

const Button = ({clickMethod, message, fontSizing}) => {

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

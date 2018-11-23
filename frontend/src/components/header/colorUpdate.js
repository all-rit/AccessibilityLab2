import React from 'react';
import './title.css';

const ColorUpdate = ({popupController}) => {
  return (
    <div>
      <button 
        type="button" 
        className="updateColorButton"
        onClick={() => popupController(true)}
      >
        Update Colors
      </button>
    </div>
  );
}

export default ColorUpdate;

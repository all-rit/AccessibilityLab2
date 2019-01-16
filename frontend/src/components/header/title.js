import React from 'react';
import './title.css';

/*
Displays the title of the page dependent on the state it is in
State options: Home page or Game apge
*/
const Title = ({gameState}) => {
  return (
    <div>
      {gameState?
        <div>
          <p
            className='mainTitle'
          >
            Let the Game Begin!
          </p>
          <p
            className='secondTitle'
          >
            Click as fast as you can the right colored circle!
          </p>
        </div>
        :
        <div>
          <p
            className='mainTitle'
          >
            Color Clicker
          </p>
          <p
            className='secondTitle'
          >
            How fast can you click the right colored circle?
          </p>
        </div>
      }
    </div>
  );
}

export default Title;

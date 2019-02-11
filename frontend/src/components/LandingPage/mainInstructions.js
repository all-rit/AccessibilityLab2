import React from 'react';
import Circle from '../game/circle';
import './landingpage.css';

const MainInstructions = () => {
  return (
    <div>
      <p className='instructionTitle'>
        Main instructions for application:
      </p>
      <p className='instructionList'>
        You are about to play a game involving three colored circles, the same
        size as the one below this text.
      </p>
      <div className='center'>
        <Circle color={'blue'} clickable={false}/>
      </div>
      <p className='instructionList'>
        A circle will be focused in the center of the screen that you will need
        to click.
      </p>
      <p className='instructionList'>
        However, two of the three circles that appear will be the wrong color!
        It is randomized as well, so the same color can show up multiple times
        in a row.
      </p>
      <p className='instructionList'>
        The color you need to click will always appear in the bottom left
        corner of the screen. The colors you should avoid clicking will be
        identified in the bottom right of the screen.
      </p>
      <p className='instructionList'>
        You will gain points based on if you clicked the correct or incorrect
        circle and based on how fast you clicked the correct colored circle.
        So click as fast as you possibly can!
      </p>
      <p className='instructionList'>
        The color changes in the center of the screen every second for fifteen
        seconds.
      </p>
    </div>
  )
}

export default MainInstructions;

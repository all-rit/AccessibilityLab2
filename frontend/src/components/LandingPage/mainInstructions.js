import React from 'react';
import Circle from '../game/circle';
import './landingpage.css';

const MainInstructions = () => {
  return (
    <div className='instructionsContainer'>
        {/*
      <p className='instructionTitle'>
        Main instructions for Color Clicker:
      </p>
        */}
      <p className='instructionList'>
        You are about to play a game involving three colored circles, the same
        size as this one:
      </p>
      <div className='center'>
        <Circle color={'blue'} clickable={false}/>
      </div>
      <ul>
        <li className='instructionsItem'>
          You will need to <strong>click the circle</strong> in the center of the screen.
        </li>
        <li className='instructionsItem'>
          The circle will be 1 of 3 colors. 
        </li>
        <li className='instructionsItem'>
          The color you need to click will appear in the <strong>bottom left</strong> corner
          of the screen.
        </li>
        <li className='instructionsItem'>
          The colors you should <strong>avoid</strong> clicking will appear 
          in the <strong>bottom right</strong> of the screen.
        </li>
        <li className='instructionsItem'>
          You will gain points based on if you clicked the <strong>correct or incorrect</strong> circle 
          and based on <strong>how fast you clicked</strong> the correct colored circle.
          So click as fast as you possibly can!
        </li>
        <li className='instructionsItem'>
          The color changes in the center of the screen every second for fifteen
          seconds.
        </li>
      </ul>
    </div>
  )
}

export default MainInstructions;

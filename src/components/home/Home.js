import React from 'react';
import './homeStyle.css'
import Start from './start';
import Instructions from '../instructions/instructions';
import Dropdown from './dropdown';

const Home = ({correctColor, incorrectColorOne, incorrectColorTwo, startGame, selectOption}) => {
  return (
    <div>
      <Start startGame = {startGame}/>
      <Dropdown selectOption = {selectOption} />
      <Instructions 
        correctColor={correctColor} 
        incorrectColorOne={incorrectColorOne}
        incorrectColorTwo={incorrectColorTwo}
      />
    </div>
  );
}

export default Home;

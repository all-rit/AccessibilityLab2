import React from 'react';
import './homeStyle.css'
import Start from './start';
import Instructions from './instructions';
import Dropdown from './dropdown';
import Circle from '../game/circle';

const Home = ({correctColor, incorrectColorOne, incorrectColorTwo}) => {
  return (
    <div>
      <Start />
      <Dropdown />
      <Instructions />
      <div className='circles'>
        <div className='correctCircle'>
          <Circle color= {correctColor}/>
        </div>
        <div className='incorrectCircle'>
          <Circle color= {incorrectColorOne}/>
        </div>
        <div className='incorrectCircle'>
          <Circle color= {incorrectColorTwo}/>
        </div>
      </div>
    </div>
  );
}

export default Home;

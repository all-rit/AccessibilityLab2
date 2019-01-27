import React from 'react';
import './homeStyle.css'
import Instructions from '../instructions/instructions';
import StartGame from './startGame';

/*
Component for the main home page
*/
const Home = ({correctColor, incorrectColorOne, incorrectColorTwo,
  startGame, selectOption, background, gameOption, onChangeGameColors,
  enterInfoState, gamesPlayed, enterSecondInfoState, alreadyCalled}) => {

  const colors = [background, correctColor, incorrectColorOne, incorrectColorTwo];

  //Handles switching the colors to a simulation for a selected game option
  if(gameOption !== 'default') {
    onChangeGameColors(colors);
  }

  return (
    <div>
      <div>
        <StartGame
          selectOption = {selectOption}
          startGame = {startGame}
          gameOption = {gameOption}
          onChangeGameColors = {onChangeGameColors}
          colors = {colors}
          enterInfoState = {enterInfoState}
          gamesPlayed={gamesPlayed}
          enterSecondInfoState={enterSecondInfoState}
          alreadyCalled={alreadyCalled}
        />
      </div>
      <Instructions
        correctColor={correctColor}
        incorrectColorOne={incorrectColorOne}
        incorrectColorTwo={incorrectColorTwo}
      />
      <br></br>
      <p className='center noBottomMargin'>
        For educational purposes, we record all scores and actions taken in the
        game, along with any information you choose to give us from our forum.
      </p>
      <p className='center noBottomMargin'>
        For further information and to see the other labs
        currently in development for this project, visit
        <a href="http://all.rit.edu" style={{cursor:'pointer', paddingLeft:'3px'}}>
          http://all.rit.edu
        </a>
      </p>
    </div>
  );
}

export default Home;

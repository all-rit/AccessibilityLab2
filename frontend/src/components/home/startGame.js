import React from 'react';
import Start from './start';
import Dropdown from './dropdown';
import './homeStyle.css';

/*
Start game component for rendering all of the instructions for starting a game
*/
const StartGame = ({selectOption, startGame, gameOption,
  onChangeGameColors, colors, gamesPlayed}) => {

  //Handles a game option changing in the dropdown
  const changeOption = (event) => {
    selectOption(event.target.value);
  }

  return (
    <div>
      <div className='center fourthTitle'>
        {gamesPlayed===0?
          <p>
            Click the button to start the game!
          </p>
          :
          <div>
          {gamesPlayed===1?
            <p>
              Click the button to start the game with a color vision defiency!
            </p>
            :
            <div>
            {gamesPlayed>1?
              <p>
                Choose a color vision defiency and click the button to start the
                game!
              </p>
              :
              null
            }
            </div>
          }
          </div>
        }
      </div>
      <div className='center'>
        {gamesPlayed===0?
          <div className='center'>
            <Start
              startGame={startGame}
              gameOption={gameOption}
              onChangeGameColors={onChangeGameColors}
              colors={colors}
            />
          </div>
          :
          <div>
          {gamesPlayed===1?
            <div className='center'>
              <Start
                startGame={startGame}
                gameOption={gameOption}
                onChangeGameColors={onChangeGameColors}
                colors={colors}
              />
              </div>
            :
            <div className='center'>
              <Dropdown
                selectOption = {changeOption}
              />
              <Start
                startGame={startGame}
                gameOption={gameOption}
                onChangeGameColors={onChangeGameColors}
                colors={colors}
              />
            </div>
          }
          </div>
        }
      </div>
    </div>
  );
}

export default StartGame;

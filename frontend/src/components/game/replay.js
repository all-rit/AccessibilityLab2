import React, {Component} from 'react';
import ScoreBreakdown from './scoreBreakdown';
import PreviousGames from './previousGames';
import ScoreComparison from './scoreComparison';
import Button from '../header/buttons/button';
import './gameStyle.css';

/*
  Class for replay screen and to allow the user to replay the game
*/
class Replay extends Component {

  //Constructor to hold state information
  constructor(props) {
    super(props)
    this.state = {
      scorePopup: false,
      gameMode: null
    }
  }

  //Renderer for application
  render(){
    // eslint-disable-next-line
    this.state.gameMode = 'default'

    //Handles the first click
    const clickFirst = () => {
      this.props.changeGameColors(this.props.colors);
      this.props.resetOption();
      this.props.enterInfoState();
    }

    const clickSecond = () => {
      this.props.changeGameColors(this.props.colors);
      this.props.resetOption();
      this.props.enterSecondInfoState();
    }

    const clickThird = () => {
      this.props.changeGameColors(this.props.colors);
      this.props.resetOption();
      this.props.enterThirdInfoState();
    }

    return(
      <div>
        {/*
         <div className='replay_screen'>
           <div className='left'>
             <ScoreBreakdown />
             <PreviousGames score={this.props.score} mode={this.props.gameMode}/>
             <ScoreComparison score={this.props.score} mode={this.props.gameMode}/>
           </div>
         </div>
        */}
        <div style={{marginTop: '100px'}}>
          <div>
            {this.props.score > 0 ?
            <div>
              <p className='timeEnd'>
                Good job! Your final score was {this.props.score}.
              </p>
              <p className='timeEnd'>
                That equates to {this.props.rightClick} correctly clicked
                circles, {this.props.rightNoClick} correctly not clicked
                circles, {this.props.wrongClick} incorrectly clicked
                circles, and {this.props.wrongNoClick} missed circles.
              </p>
            </div>
            :
            <div>
              <p className='timeEnd'>
                Better luck next time! Your final score was {this.props.score}.
              </p>
              <p className='timeEnd'>
                That equates to {this.props.rightClick} correctly clicked
                circles, {this.props.rightNoClick} correctly not clicked
                circles, {this.props.wrongClick} incorrectly clicked
                circles, and {this.props.wrongNoClick} missed circles.
              </p>
            </div>
            }
          </div>
          <div className='center'>
            {this.props.gamesPlayed === 0 ?
              <Button
                clickMethod={clickFirst}
                message={"Continue"}
                fontSizing={"25px"}
              />
              :
              <div>
              {this.props.gamesPlayed === 1 ?
                <Button
                  clickMethod={clickSecond}
                  message={"Continue"}
                  fontSizing={"25px"}
                />
                :
                <div>
                  <Button
                    clickMethod={clickThird}
                    message={"Continue"}
                    fontSizing={"25px"}
                  />
                </div>
              }
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Replay;

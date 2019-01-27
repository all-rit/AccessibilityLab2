import React, {Component} from 'react';
import ScoreBreakdown from './scoreBreakdown';
import PreviousGames from './previousGames';
import ScoreComparison from './scoreComparison';
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

    //Handles restarting the game
    const click = () => {
      this.props.changeGameColors(this.props.colors);
      this.props.resetOption();
      this.props.gameEnded();
    }

    return(
      <div>
        <div className='replay_screen'>
          <div className='left'>
            <ScoreBreakdown />
            <PreviousGames score={this.props.score} mode={this.props.gameMode}/>
            <ScoreComparison score={this.props.score} mode={this.props.gameMode}/>
          </div>
        </div>
        <div>
          <div>
            {this.props.score > 0 ?
            <div>
              <p className='timeEnd'>
                Good job! Your final score was {this.props.score}.
              </p>
              <p className='timeEnd'>
                That equates to {this.props.right} correct clicks and
                <span style={{paddingLeft: '7px'}}>
                  {this.props.wrong} incorrect clicks.
                </span>
              </p>
            </div>
            :
            <div>
              <p className='timeEnd'>
                Better luck next time! Your final score was {this.props.score}.
              </p>
              <p className='timeEnd'>
                That equates to {this.props.right} correct clicks and
                <span style={{paddingLeft: '7px'}}>
                  {this.props.wrong} incorrect clicks.
                </span>
              </p>
            </div>
            }
          </div>
          <div className='center'>
            <button className='replay' onClick={click}>Play again?</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Replay;

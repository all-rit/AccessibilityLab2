import React, {Component} from 'react';
import ScoreBreakdown from './scoreBreakdown';
import PreviousGames from './previousGames';
import Dropdown from '../home/dropdown';
import ColorVision from '../colors/colorVision';
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

    const recordMode = (event) => {
      // eslint-disable-next-line
      this.state.gameMode = event.target.value;
    }

    //Handles restarting the game
    const click = () => {
      if (this.state.gameMode !== 'default' &&
      this.state.gameMode !== 'hex') {
        ColorVision(this.props.onChangeGameColors, this.state.gameMode,
          this.props.colors);
        this.props.updateMode(this.state.gameMode);
      }
      else if (this.state.gameMode === 'default') {
        this.props.resetMode();
        this.props.resetColors();
      }
      this.props.onUpdateTime();
    }

    console.log(this.props.gameMode);

    return(
      <div className='replay_screen'>
        <div id='left'>
          <ScoreBreakdown />
        </div>
        <div className='pushBack'>
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
            <Dropdown
              selectOption = {recordMode}
            />
            <button className='replay' onClick={click}>Play again?</button>
          </div>
        </div>
        <div className='right'>
          <PreviousGames score={this.props.score} mode={this.props.gameMode}/>
          <ScoreComparison />
        </div>
      </div>
    );
  }
}

export default Replay;

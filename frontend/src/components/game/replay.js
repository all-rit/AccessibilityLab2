import React, {Component} from 'react';
import ScoreBreakdown from './scoreBreakdown';
import PreviousGames from './previousGames';
import Dropdown from '../home/dropdown';
import ColorVision from '../colors/colorVision';
import './gameStyle.css';

class Replay extends Component {

  constructor(props) {
    super(props)
    this.state = {
      scorePopup: false,
      gameMode: null
    }
  }

  render(){
    this.state.gameMode = 'default'

    const recordMode = (event) => {
      this.state.gameMode = event.target.value;
    }

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

    return(
      <div className='replay_screen'>
        <div id='left'>
          <ScoreBreakdown />
        </div>
        <div id='center'>
          <div>
            {this.props.score > 0 ?
            <div>
              <p className='timeEnd'>
                Good job! Your final score was {this.props.score}.
              </p>
              <p className='timeEnd'>
                That equates to {this.props.right} correct clicks and
                {this.props.wrong} incorrect clicks.
              </p>
            </div>
            :
            <div>
              <p className='timeEnd'>
                Better luck next time! Your final score was {this.props.score}.
              </p>
              <p className='timeEnd'>
                That equates to {this.props.right} correct clicks and
                {this.props.wrong} incorrect clicks.
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
        <div id='right'>
          <PreviousGames />
        </div>
      </div>
    );
  }
}

export default Replay;

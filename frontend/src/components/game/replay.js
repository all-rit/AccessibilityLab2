import React, {Component} from 'react';
import ScoreBreakdown from './scoreBreakdown';
import PreviousGames from './previousGames';
import './gameStyle.css';

class Replay extends Component {

  constructor(props) {
    super(props)
    this.state = {
      scorePopup: false
    }
  }

  render(){

    const click = () => {
      console.log('click');
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
              <p className='timeEnd'>Good job! Your final score was
              {this.props.score}.</p>
              <p className='timeEnd'>That equates to {this.props.right} correct
              clicks and {this.props.wrong} incorrect clicks.</p>
            </div>
            :
            <div>
              <p className='timeEnd'>Better luck next time! Your final score was
              {this.props.score}.</p>
              <p className='timeEnd'>That equates to {this.props.right} correct
              clicks and {this.props.wrong} incorrect clicks.</p>
            </div>
            }
          </div>
          <div className='center'>
            <button className='replay' onClick={click}>Play again?</button>
          </div>
        </div>
        <div id='right'>
        </div>
      </div>
    );
  }
}

export default Replay;

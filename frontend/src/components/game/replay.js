import React from 'react';
import './gameStyle.css';

const Replay = ({score, right, wrong, onUpdateTime}) => {

  const click = () => {
    console.log('click');
    onUpdateTime();
  }

  return(
    <div>
      <div className='center'>
        {score > 0 ?
        <div>
          <p className='timeEnd'>Good job! Your final score was {score}.</p>
          <p className='timeEnd'>That equates to {right} correct clicks and {wrong} incorrect clicks.</p>
        </div>
        :
        <div>
          <p className='timeEnd'>Better luck next time! Your final score was {score}.</p>
          <p className='timeEnd'>That equates to {right} correct clicks and {wrong} incorrect clicks.</p>
        </div>
        }
      </div>
      <div className='center'>
        <button className='replay' onClick={click}>Play again?</button>
      </div>
    </div>
  );
}

export default Replay;

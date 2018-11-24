import React from 'react';

const handleSignout = () => {
  console.log('click');
}

const Signout = ({user}) => {
  return (
    <div className='dropdown signinButton'>
      <p className='username'>Welcome, {user}! &#9662;</p>
      <div className='dropdown-content'>
        <button onClick={() => handleSignout()} className='link'>Signout</button>
      </div>
    </div>
  );
}

export default Signout;

import React from 'react';
import '../title.css';

/*
Function for handling the signout of a user
*/
const handleSignout = async () => {
  const response = await fetch('http://localhost:5000/logout');

  if (response.status !== 200) {
    throw Error(response.message)
  }
  console.log(response.url);
  window.location = response.url;
}

/*
Component for the dropdown below a users name on the application
*/
const Signout = ({user, admin, openStatPage}) => {
  return (
    <div className='dropdown signinButton'>
      <p className='username'>Welcome, {user}! &#9662;</p>
      <div className='dropdown-content'>
        {admin==='1'?
          <button
            onClick={openStatPage}
            className='link'
          >
            Statistics
          </button>
          :
          null
        }
        <button onClick={() => handleSignout()} className='link'>
          Signout
        </button>
      </div>
    </div>
  );
}

export default Signout;

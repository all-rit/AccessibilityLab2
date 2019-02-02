import React from 'react';
import '../title.css';

/*
Function for handling the signout of a user
*/
const handleSignout = () => {
  fetch(process.env.API_URL + '/logout', {
    method: 'GET',
    credentials:'include'
  })
  .then(res => res.json())
  .then(link => window.location.href = link.url)
  .catch(error => console.log(error))
}

/*
Component for the dropdown below a users name on the application
*/
const Signout = ({user, admin, openStatPage}) => {
  console.log(admin);
  return (
    <div className='dropdown signinButton'>
      <p className='username'>Welcome, {user}! &#9662;</p>
      <div className='dropdown-content'>
        {admin?
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

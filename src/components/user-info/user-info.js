import React from 'react';

const UserInfo = ({ isLoggedIn, username, submittedEntries }) => {
  if (isLoggedIn) {
    return (
      <div>
        <div className='f3'>
          <h3>
            {`Welcome ${username}, you've submitted ${submittedEntries} images.`}
          </h3>
        </div>
      </div>
    )
  }
  return('');
}

export default UserInfo;
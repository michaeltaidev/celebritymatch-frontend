import React from 'react';

const UserInfo = ({ isSignedIn, username, submittedEntries }) => {
  if (isSignedIn) {
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
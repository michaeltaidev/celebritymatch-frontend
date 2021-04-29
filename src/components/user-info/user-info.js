import React from 'react';

const UserInfo = ({ isLoggedIn, username, submittedEntries }) => {
  if (isLoggedIn) {
    return (
      <div className='mt1'>
        <div className='f5'>
          <h2>
            {`Welcome ${username}, you've submitted ${submittedEntries} image(s).`}
          </h2>
        </div>
      </div>
    )
  }
  return (
    <div className='mt0'>
      <div className='f5'>
        <h2>
          {`Find your celebrity look-alike.`}
        </h2>
      </div>
    </div>
  )
}

export default UserInfo;
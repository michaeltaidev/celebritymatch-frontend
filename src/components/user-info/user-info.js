import React from 'react';

const UserInfo = ({ username, submittedEntries }) => {
  return (
    <div>
      <div className='f3'>
        {`Welcome ${username}, you've identified ${submittedEntries} images.`}
      </div>
    </div>
  );
}

export default UserInfo;
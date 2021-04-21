import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <h1 style={{ marginRight: 'auto' }} onClick={() => onRouteChange('home')} className='link pa3 pointer'>Celebrity Match</h1>
          <p onClick={() => onRouteChange('signout')} className='f4 link dim pa3 pointer'>Logout</p>
        </nav>
      )
    } else {
      return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <h1 style={{ marginRight: 'auto' }} onClick={() => onRouteChange('home')} className='link pa3 pointer'>Celebrity Match</h1>
          <p onClick={() => onRouteChange('login')} className='f4 link dim pa3 pointer'>Login</p>
          <p onClick={() => onRouteChange('register')} className='f4 link dim pa3 pointer'>Register</p>
        </nav>
      );
    }
}

export default Navigation;
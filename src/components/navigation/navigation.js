import React from 'react';

const Navigation = ({ changeRoute, isLoggedIn, logout }) => {
    if (isLoggedIn) {
      return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <h1 style={{ marginRight: 'auto' }} onClick={() => changeRoute('home')} className='link pa3 pointer'>Celebrity Match</h1>
          <p onClick={() => logout()} className='f4 link dim pa3 pointer'>Logout</p>
        </nav>
      )
    } else {
      return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <h1 style={{ marginRight: 'auto' }} onClick={() => changeRoute('home')} className='link pa3 pointer'>Celebrity Match</h1>
          <p onClick={() => changeRoute('login')} className='f4 link dim pa3 pointer'>Login</p>
          <p onClick={() => changeRoute('register')} className='f4 link dim pa3 pointer'>Register</p>
        </nav>
      );
    }
}

export default Navigation;
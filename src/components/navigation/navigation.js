import React from 'react';

const Navigation = ({ changeRoute, isLoggedIn, logout }) => {
    if (isLoggedIn) {
      return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }} className='pt1'>
          <h1 onClick={() => changeRoute('home')} style={{ left: '50%', transform: 'translateX(-50%)' }} className='mv4 absolute f1 link pointer'>Celebrity Match</h1>
          <p onClick={() => logout()} className='f4 link dim pa3 pointer'>Logout</p>
        </nav>
      )
    } else {
      return (
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }} className='pt1'>
          <h1 onClick={() => changeRoute('home')} style={{ left: '50%', transform: 'translateX(-50%)' }} className='mt4 absolute f1 link pointer'>Celebrity Match</h1>
          <p onClick={() => changeRoute('login')} className='f4 link dim pa3 pointer'>Login</p>
          <p onClick={() => changeRoute('register')} className='f4 link dim pa3 pointer'>Register</p>
        </nav>
      );
    }
}

export default Navigation;
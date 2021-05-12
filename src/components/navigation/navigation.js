import React from 'react';
import './navigation.css'
import logo from '../../images/logo.png';

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
        <nav className='flex justify-center items-center pt4'>
          <img src={logo} alt="Logo" className='logo'></img>
          <h1 onClick={() => changeRoute('home')} className='title pl2 f1 mv0 link pointer'>Celebrity Match</h1>
        </nav>
      );
    }
}

export default Navigation;
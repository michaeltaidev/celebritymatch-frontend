import React from 'react';
import Tilty from 'react-tilty';
import './logo.css';
import logoIcon from './logo.svg';

const Logo = () => {
  return (
    <div className='ma4 mt0'>
      <Tilty className="Tilt">
        <div className="center pa3 w-10">
          <img style={{paddingTop: '5px'}} alt="logo" src={logoIcon} />
        </div>
      </Tilty>
    </div>
  );
}

export default Logo;
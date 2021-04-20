import React from 'react';

const IdentifyImage = ({ identifiedImage, imageURL }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='input-image' src={imageURL} alt='' width='500px' height='auto' />
        <h2 className='center'>{identifiedImage}</h2>
      </div>
    </div>
  );
}

export default IdentifyImage;
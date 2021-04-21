import React from 'react';

const IdentifyImage = ({ identifiedImage, celebrityImage, imageURL }) => {
  return (
    <div>
      <div className='flex items-center justify-center w-100 mt2'>
        <img style={{ maxHeight: '500px' }} id='input-image' className='shadow-5 ma3' src={imageURL} alt='' width='auto' />
        <img style={{ maxHeight: '500px' }} id='input-image' className='shadow-5 ma3' src={celebrityImage} alt='' width='auto'/>
      </div>
      <h1 className='relative ttc center'>{identifiedImage}</h1>
    </div>
  );
}

export default IdentifyImage;
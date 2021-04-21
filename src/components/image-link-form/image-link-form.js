import React from 'react';
import './image-link-form.css'

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f4'>
        {'Paste the URL for of photo:'}
      </p>
      <div className='center'>
        <div className='form center br3 mb3'>
          <input className='pa2 input-reset ba bg-transparent w-100 shadow-5' type='text' onChange={onInputChange}/>
          <button 
            className='b ml3 ph4 pv2 input-reset ba bg-transparent grow pointer f6 dib shadow-5'
            onClick={onButtonSubmit}
          >Submit</button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
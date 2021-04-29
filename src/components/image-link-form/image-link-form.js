import React from 'react';
import './image-link-form.css'

const ImageLinkForm = ({ onURLInputChange, onButtonSubmit }) => {
  return (
    <div className='mv4'>
      <div className='center'>
        <div className='form center br3'>
          <input className='pa2 input-reset ba bg-transparent w-100 shadow-5' type='text' onChange={onURLInputChange} placeholder='Enter image URL'/>
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
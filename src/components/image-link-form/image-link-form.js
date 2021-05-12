import React from 'react';
import './image-link-form.css'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFileUpload } from '@fortawesome/free-solid-svg-icons'

const ImageLinkForm = ({ onURLInputChange, clearInputField, findMatch }) => {
  return (
    <div className='mv4'>
      <div className='center'>
        <div className='form center br3 ph2'>
          <input className='pa2 f3 input-reset ba bg-transparent w-90 shadow-5' type='text' onChange={onURLInputChange} onClick={clearInputField} placeholder='Enter image URL'/>
          {/* <input id='upload-button' type='file' accept='image/*' onChange={onURLInputChange} hidden/>
          <label 
            htmlFor='upload-button'
            className='b ml3 ph3 pv3 input-reset ba bg-transparent grow pointer f6 dib shadow-5 w-50'
          >
            <FontAwesomeIcon icon={faFileUpload} className='pr1'></FontAwesomeIcon> Or Upload an Image
          </label> */}
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
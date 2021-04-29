import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import './image-display.css'
import { Fade } from 'react-slideshow-image';

const fadeImages = [
  ['https://images.news18.com/ibnlive/uploads/2019/08/Sports-61.png', 'The Rock'],
  ['https://static.onecms.io/wp-content/uploads/sites/20/2021/01/20/rihanna.jpg', 'Rihanna'],
  ['https://aws.revistavanityfair.es/prod/designs/v1/assets/785x589/184139.jpg', 'Matt Damon'],
  ['https://www.gundemtube.com/wp-content/uploads/2020/02/media.media_.0baba6bd-881d-4582-a155-568cd3be2961.original1024.jpg', 'Snoop Dog'],
  ['https://cdn-s-www.dna.fr/images/32C13867-028D-4F31-8B5A-1D20F8A66113/NW_raw/taylor-swift-lundi-soir-a-son-arrivee-a-la-ceremonie-des-mtv-video-music-awards-photo-johannes-eisele-afp-1566927405.jpg', 'Taylor Swift'],
  ['https://www.bankrate.com/2017/09/25151242/elon-musk-getty-mst-470x420.jpg', 'Elon Musk']
];

const fadeProperties = {
  duration: 1500,
  transitionDuration: 500,
  infinite: true,
  indicators: false,
  arrows: false,
  pauseOnHover: false,
  defaultIndex: 2
}

const ImageDisplay = ({ matchedCelebrityName, celebrityImageURL, submittedImageURL, isFindingMatch, hasMatchResults }) => {
  if (isFindingMatch) {
    return (
      <div>
        <h2>Matching...</h2>
      </div>
    );
  }

  if (!hasMatchResults) {
    return (
      <Fade {...fadeProperties}>
        <div className="each-fade">
          <div className="image-container">
            <img className='image-carousel' src={fadeImages[0][0]} alt={fadeImages[0][1]}/>
          </div>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img className='image-carousel' src={fadeImages[1][0]} alt={fadeImages[1][1]}/>
          </div>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img className='image-carousel' src={fadeImages[2][0]} alt={fadeImages[2][1]}/>
          </div>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img className='image-carousel' src={fadeImages[3][0]} alt={fadeImages[3][1]}/>
          </div>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img className='image-carousel' src={fadeImages[4][0]} alt={fadeImages[4][1]}/>
          </div>
        </div>
        <div className="each-fade">
          <div className="image-container">
            <img className='image-carousel' src={fadeImages[5][0]} alt={fadeImages[5][1]}/>
          </div>
        </div>
      </Fade>
    );
  } else {
    return (
      <div>
        <h2 className='relative ttc center f3 mb0'>You look like:</h2>
        <h1 className='relative ttc center f2 mv3'>{matchedCelebrityName}</h1>
        <div className='flex items-center justify-center w-100'>
          <div className='portrait-crop shadow-5'>
            <img id='input-image' className='portrait-crop' src={submittedImageURL} alt='' />
          </div>
          <div className='portrait-crop shadow-5'>
            <img id='input-image' className='portrait-crop' src={celebrityImageURL} alt='' />
          </div>
        </div>
      </div>
    );
  }
}

export default ImageDisplay;
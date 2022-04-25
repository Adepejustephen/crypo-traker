import React from 'react'
import Carousel from './Carousel'

const Banner = () => {
  return (
    <div className="banner">
      <div className="banner__content">
        <div className="banner__intro">
          <h2>Rate<span>.24</span></h2>
          <span>Get your favourite cryptocurrency rates today.</span>
        </div>
        <Carousel />
      </div>
    </div>
  );
}

export default Banner
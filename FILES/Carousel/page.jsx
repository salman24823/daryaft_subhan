import React from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import Suit from '../../../../public/images/Suit.png';

const Carousel = () => {
    const settings = {
        dots: false, // Disable navigation dots
        infinite: true, // Enable infinite scrolling
        speed: 5000, // Transition speed (higher value for smooth effect)
        slidesToShow: 7, // Number of slides visible at once
        slidesToScroll: 1, // Number of slides to scroll at a time
        autoplay: true, // Enable autoplay
        autoplaySpeed: 0, // Continuous scrolling by setting autoplay speed to 0
        cssEase: 'linear', // Smooth transition
        arrows: false, // Disable navigation arrows
        draggable: false, // Disable drag functionality
        swipe: false, // Disable swipe functionality
        pauseOnHover: false, // Prevent pause on hover
      };

      const slides = Array(7).fill(Suit);

      return (
        <div className="w-full">

          <div className='my-10'>
            <h1 className='kalam_font text-2xl text-blue-800 text-center'>Our Collections</h1>
            <h1 className='text-4xl text-black font-bold text-center'>Go through Our Ultra Collections</h1>
          </div>

          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className="p-4">
                <div className="border-2 overflow-hidden border-gray-700 rounded-full p-2">
                  <Image className="w-full h-full rounded-full" src={slide} alt={`Slide ${index + 1}`} />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      );
    
};

export default Carousel;

"use client";

import React from 'react';
import Slider from 'react-slick';

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    speed: 500,  // Added speed for smooth transition
  };

  const slideData = [
    {
      id: 0,
      img: "/cour-1.jpg",  // Make sure this path is correct (public directory)
      mainTitle: "WOMEN'S LATEST FASHION SALE",
      price: "$20",
    },
    {
      id: 1,
      img: "/cour-2.jpg",  // Make sure this path is correct (public directory)
      mainTitle: "WOMEN'S LATEST FASHION SALE",
      price: "$30",
    },
  ];

  return (
    <div className="container pt-6 lg:pt-0 px-0">
      <div className="w-full h-[200px] sm:h-[280px] md:h-[400px] lg:h-[500px] relative overflow-hidden">
        <Slider {...settings}>
          {slideData.map((item) => (
            <div key={item.id} className="w-full h-full relative">
              {/* Background Image */}
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item.img})`, backgroundSize: 'cover', minHeight: '500px' }}
              >
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Hero;

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
      img: "/cour-1.jpg",  
      mainTitle: "WOMEN'S LATEST FASHION SALE",
      price: "$20",
    },
    {
      id: 1,
      img: "/cour-2.jpg", 
      mainTitle: "WOMEN'S LATEST FASHION SALE",
      price: "$30",
    }
  ];

    const slideData2 = [
    {
      id: 2,
      img: "/cour-3.jpg", 
      mainTitle: "WOMEN'S LATEST FASHION SALE",
      price: "$40",
    },
    {
      id: 3,
      img: "/cour-4.jpg", 
      mainTitle: "WOMEN'S LATEST FASHION SALE",
      price: "$50",
    },
  ];

  return (
    <div className="container pt-6 lg:pt-0 px-0">
      <div className="w-full h-[200px] sm:h-[320px] md:h-[400px] lg:h-[500px] relative overflow-hidden">
        {/* Mobile images */}
        <div className="block sm:hidden">
          <div className="flex w-full h-full">
            {slideData2.slice(0, 2).map((item) => (
              <div key={item.id} className="w-1/2 h-full relative">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.img})`, backgroundSize: 'cover' }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider for larger screens */}
        <div className="hidden sm:block">
          <Slider {...settings}>
            {slideData.map((item) => (
              <div key={item.id} className="w-full h-full relative">
                {/* Background Image */}
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.img})`, backgroundSize: 'cover', minHeight: '500px' }}
                ></div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Hero;

"use client";

import React from 'react'
import Slider from 'react-slick';
import Slide from '../components/Slide';

const Hero = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnHover: false,
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
        },

    ];

    return (
<div className="container pt-6 lg:pt-0">
  <div className="w-full h-[200px] sm:h-[280px] md:h-[400px] lg:h-[500px] relative">
    <Slider {...settings}>
      {slideData.map((item) => (
        <Slide
          key={item.id}
          img={item.img}
          title={item.mainTitle}
          mainTitle={item.mainTitle}
          price={item.price}
        />
      ))}
    </Slider>
  </div>
</div>

    )
}

export default Hero;

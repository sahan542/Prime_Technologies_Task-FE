"use client";

import React from 'react';
import Slider from 'react-slick';
import Slide from '../components/Slide';
import Image from 'next/image';

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
                        <div key={item.id} className="w-full h-full relative">
                            <Image
                                src={item.img}
                                alt={item.mainTitle}
                                layout="fill"
                                objectFit="cover"
                                className="w-full h-full"
                            />
                            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4">
                                <h2>{item.mainTitle}</h2>
                                <p>{item.price}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Hero;

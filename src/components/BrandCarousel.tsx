"use client"; 

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BrandCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 4000,
    autoplay: true,
    autoplaySpeed: 0, 
    cssEase: "linear", 
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          speed: 4000,
          autoplaySpeed: 0,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          speed: 4000,
          autoplaySpeed: 0,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          speed: 4000,
          autoplaySpeed: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          speed: 4000,
          autoplaySpeed: 0,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto py-4 px-4">
      <h2 className="font-bold text-2xl pb-4 text-[#7b1f4b] mb-2">Our Brands</h2>
      <Slider {...settings}>
        {[
          "/images/home/brand/b1.jpg",
          "/images/home/brand/b2.jpg",
          "/images/home/brand/b3.jpg",
          "/images/home/brand/b4.jpg",
          "/images/home/brand/b5.jpg",
          "/images/home/brand/b6.jpg",
          "/images/home/brand/b7.jpg",
          "/images/home/brand/b8.jpg",
          "/images/home/brand/b1.jpg",
          "/images/home/brand/b2.jpg",
          "/images/home/brand/b3.jpg",
        ].map((logo, index) => (
          <div key={index} className="flex justify-center items-center w-full">
            <img
              src={logo}
              alt={`Brand ${index + 1}`}
              className="w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] md:w-[90px] md:h-[90px] object-cover mx-auto rounded-full"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandCarousel;

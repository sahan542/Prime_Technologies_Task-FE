"use client"; // This tells Next.js that this is a client component

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Carousel component
const BrandCarousel = () => {
  const settings = {
    dots: false, // No dots
    infinite: true, // Infinite loop
    speed: 500, // Transition speed
    slidesToShow: 5, // Number of logos displayed at a time
    slidesToScroll: 1, // Scroll one logo at a time
    autoplay: true, // Enable auto-slide
    autoplaySpeed: 1000, // Speed up the movement (1 second)
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4, // 4 logos at a time on medium screens
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3, // 3 logos at a time on small screens
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2, // 2 logos at a time on very small screens
        },
      },
    ],
  };

  return (
    <div className="container mx-auto py-12 px-4">
        <h2 className='font-bold text-2xl pb-4 text-[#7b1f4b]'>Our Brands</h2>
      <Slider {...settings}>
        {/* Directly reference the images in the public folder */}
        {[
          "/brizz bella.png",
          "/images/shared/google_logo.png",
          "/images/home/banner/banner3.jpg",
          "/images/home/banner/banner3.jpg",
          "/images/home/banner/banner3.jpg",
          "/images/home/banner/banner3.jpg",
          "/images/home/banner/banner3.jpg",
          "/images/home/banner/banner3.jpg",
          "/images/home/banner/banner3.jpg",
          "/images/home/banner/banner3.jpg",
          "/images/home/banner/banner3.jpg",
          "/images/home/banner/banner3.jpg",
        ].map((logo, index) => (
          <div key={index} className="flex justify-center flex items-center bg-green-600">
            <img
              src={logo}
              alt={`Brand ${index + 1}`}
              className="w-20 h-20 object-cover mx-2 " // Updated size, spacing, and object-fit
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BrandCarousel;

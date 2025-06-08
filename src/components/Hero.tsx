// "use client";

// import React from 'react'
// import Slider from 'react-slick';
// import Slide from '../components/Slide';


// const Hero = () => {
//     var settings = {
//         dots: true,
//         infinite: true,
//         slidesToShow: 1,
//         slidesToScroll: 1, // Corrected typo here
//         autoplay: true,
//         pauseOnHover: false,
// };

//     };

//     const slideData = [
//         {
//             id: 0,
//             img: "/../",
//             mainTitle: "WOMEN'S LATEST FASHION SALE",
//             price: "$20",
//         },
//         {
//             id: 1,
//             img: "/banner-12.jpg",
//             mainTitle: "WOMEN'S LATEST FASHION SALE",
//             price: "$30",
//         },
//         {
//             id: 2,
//             img: "/banner-11.jpg",
//             mainTitle: "WOMEN'S LATEST FASHION SALE",
//             price: "$40",
//         },
//                 {
//             id: 3,
//             img: "/banner-12.jpg",
//             mainTitle: "WOMEN'S LATEST FASHION SALE",
//             price: "$50",
//         },
//         {
//             id: 4,
//             img: "/banner-11.jpg",
//             mainTitle: "WOMEN'S LATEST FASHION SALE",
//             price: "$60",
//         },
//     ]
//   return (
//     <div className='containerpt-6 lg:pt-0'>
//         <Slider {...settings}>
//             {slideData.map((item) => (
//                 <Slide
//                     key={item.id}
//                     img={item.img}
//                     title={item.mainTitle}  {/* Pass the mainTitle as the title */}
//                     mainTitle={item.mainTitle}
//                     price={item.price}
//                 />

//             ))}
//         </Slider>
//     </div>
//   )


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
            img: "/banner-11.jpg", // Corrected image path
            mainTitle: "WOMEN'S LATEST FASHION SALE",
            price: "$20",
        },
        {
            id: 1,
            img: "/banner-11.jpg",
            mainTitle: "WOMEN'S LATEST FASHION SALE",
            price: "$30",
        },
        {
            id: 2,
            img: "/banner-11.jpg",
            mainTitle: "WOMEN'S LATEST FASHION SALE",
            price: "$40",
        },
        {
            id: 3,
            img: "/banner-11.jpg",
            mainTitle: "WOMEN'S LATEST FASHION SALE",
            price: "$50",
        },
        {
            id: 4,
            img: "/banner-11.jpg",
            mainTitle: "WOMEN'S LATEST FASHION SALE",
            price: "$60",
        },
    ];

    return (
        <div className='container pt-6 lg:pt-0'>
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
    )
}

export default Hero;

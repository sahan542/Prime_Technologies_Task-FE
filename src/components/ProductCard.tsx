// import Image from 'next/image';
// import React from 'react'

//     interface propsType {
//         img: String;
//         title: String;
//         desc: String;
//         rating: number;
//         price: String;
//     }
// const ProductCard = ({ img, title, desc, rating, price}) => {

//   return (
//     <div className='px-4 border border-gray-200 rounded-xl max-w-[400px]'>
//         <div>
//             <Image className='w-full h-auto' src={img}width={200} height={200} alt={title}  />
//         </div>
//     </div>
//   )
// }

// export default ProductCard

import Image from 'next/image';
import React from 'react';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

interface propsType {
    img: string;
    title: string;
    desc: string;
    rating: number;
    price: string;
}

// Explicitly define the type of the props for ProductCard
const ProductCard: React.FC<propsType> = ({ img, title, desc, rating, price }) => {

  // Correct the generateRating function to return JSX
  const generateRating = (rating: number) => {
    switch (rating) {
      case 1:
        return (
          <div className='flex gap-1 text-[20px] text-[#FF9529]'>
            <FaStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
          </div>
        );
      case 2:
        return (
          <div className='flex gap-1 text-[20px] text-[#FF9529]'>
            <FaStar />
            <FaStar />
            <FaRegStar />
            <FaRegStar />
            <FaRegStar />
          </div>
        );
      case 3:
        return (
          <div className='flex gap-1 text-[20px] text-[#FF9529]'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
            <FaRegStar />
          </div>
        );
      case 4:
        return (
          <div className='flex gap-1 text-[20px] text-[#FF9529]'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStar />
          </div>
        );
      case 5:
        return (
          <div className='flex gap-1 text-[20px] text-[#FF9529]'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        );
      default:
        return null; // Return null in case of invalid rating
    }
  };

  return (
    <div className='px-4 border border-gray-200 rounded-xl max-w-[400px]'>
        <div>
            <Image className='w-full h-auto' src={img} width={200} height={200} alt={title} />
        </div>
        <h3 className='text-black'>{title}</h3>
        <p className='text-black'>{desc}</p>
        <div>
            <span className='text-black'>{generateRating(rating)}</span>
        </div>
        <div className='font-bold flex gap-4 text-black'>
            ${price}
            <del className='text-gray-500 font-normal'>${parseInt(price) + 50}.00</del>
        </div>

        <div className='space-y-2 py-2'>
            <h2 className='text-red font-medium uppercase'> {title} </h2>
            <p className='text-gray-500 max-w-[150px]'> {desc} </p>
        </div>

    </div>
  );
}

export default ProductCard;


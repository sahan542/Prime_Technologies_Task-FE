'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface PropsType {
  img: string;
  title: string;
  desc: string;
  rating: number;
  price: string;
  slug: string;
}

const ProductCard: React.FC<PropsType> = ({ img, title, desc, rating, price, slug }) => {
  const generateRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return <div className="flex gap-1 text-[20px] text-[#FF9529]">{stars}</div>;
  };

  return (
    <Link href={`/product/${slug}`} className="w-full max-w-[400px]">
      <div className="px-4 border border-gray-200 rounded-xl cursor-pointer hover:shadow-md transition">
        <div>
          <Image className="w-full h-auto" src={img} width={200} height={200} alt={title} />
        </div>

        <h3 className="text-black font-semibold text-lg mt-2">{title}</h3>
        <p className="text-gray-600 text-sm">{desc}</p>

        <div className="mt-1">{generateRating(rating)}</div>

        <div className="font-bold flex gap-4 text-black mt-1">
          ${price}
          <del className="text-gray-500 font-normal">
            ${parseInt(price) + 50}.00
          </del>
        </div>

        <div className="space-y-2 py-2">
          <h2 className="text-red-600 font-medium uppercase">{title}</h2>
          <p className="text-gray-500 max-w-[150px]">{desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaRegStar, FaShoppingCart, FaRegHeart } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { HiShoppingBag } from "react-icons/hi2";

interface PropsType {
  img: string;
  title: string;
  desc: string;
  rating: number;
  price: string;
  slug: string;
}

const ProductCard: React.FC<PropsType> = ({
  img,
  title,
  desc,
  rating,
  price,
  slug,
}) => {
  const generateRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= rating ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return <div className="flex gap-1 text-[20px] text-[#FF9529]">{stars}</div>;
  };

  return (
    <Link href={`/product/${slug}`} className="w-full max-w-[400px]">
      <div className="relative px-2 py-1 border-[2px] border-[#7b1f4b] rounded-2xl cursor-pointer hover:shadow-lg transition group">
        {/* Product Image */}
        <div className="">
          <Image
            className="w-full h-auto"
            src={img}
            width={200}
            height={200}
            alt={title}
          />
          <hr className="border-t-2 border-[#52002c] w-full my-2" />
        </div>

        <div className="flex flex-col items-center justify-center text-center mb-2">
          {/* Product Info */}
          <h3 className="text-[#52002c] font-semibold text-lg mt-2">{title}</h3>
          <p className="text-gray-600 text-sm">{desc}</p>

          {/* Rating */}
          <div className="mt-1">{generateRating(rating)}</div>

          {/* Price */}
          <div className="font-bold flex gap-4 text-black mt-1">
            ${price}
            <del className="text-gray-500 font-normal">
              ${parseInt(price) + 50}.00
            </del>
          </div>

          {/* Product Info for Modal/Popup (Optional) */}
          {/* <div className="space-y-2 py-2">
            <h2 className="text-black font-medium">{title}</h2>
            <p className="text-gray-500 max-w-[150px]">{desc}</p>
          </div> */}
        </div>

      {/* Cart and Wishlist Icons */}
        <div className="flex flex-col">
          {/* Cart Icon */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg cursor-pointer">
              <HiShoppingBag className="text-2xl text-[#7b1f4b]" />
            </div>
          </div>

          {/* Wishlist Icon */}
          <div className="absolute top-16 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg cursor-pointer">
              <IoIosHeart className="text-2xl text-[#7b1f4b]" />
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default ProductCard;


'use client';

import React, { useEffect, useState } from 'react';
import { FaFacebook } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";

const HeaderTop = () => {
const rotatingMessages = [
  "🌸 Enjoy free shipping on all orders above $50 – no hidden fees!",
  "🌿 Crafted with love using 100% natural and skin-safe ingredients.",
  "🔒 Shop confidently with our secure and encrypted checkout process.",
  "💖 Radiant skin starts here – explore our bestsellers and feel the glow.",
  "🎁 Get a free beauty pouch with every order above $75 this week!"
];


  const [currentMsgIndex, setCurrentMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMsgIndex((prev) => (prev + 1) % rotatingMessages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
<div className='border-b border-gray-200 bg-gradient-to-r from-[#f4dce6] to-white hidden md:block'>
  <div className='container mx-auto py-3 px-[60px]'>
    <div className='flex flex-wrap justify-between items-center gap-2'>

      <div className='hidden lg:flex gap-2'>
        <div className='header_top__icon_wrapper text-[#7b1f4b] text-2xl'><FaFacebook /></div>
        <div className='header_top__icon_wrapper text-[#7b1f4b] text-2xl'><AiFillTwitterCircle /></div>
        <div className='header_top__icon_wrapper text-[#7b1f4b] text-2xl'><RiInstagramFill /></div>
        <div className='header_top__icon_wrapper text-[#7b1f4b] text-2xl'><IoLogoWhatsapp /></div>
      </div>

      <div className='w-full text-center sm:w-auto text-sm text-pink-600 font-medium transition-opacity duration-500 ease-in-out'>
        <div key={currentMsgIndex} className='text-[#52002c] font-[28px]'>
          <b>{rotatingMessages[currentMsgIndex]}</b>
        </div>
      </div>

      <div className='flex gap-3 items-center justify-center sm:justify-end w-full sm:w-auto'>
        <select className='text-gray-600 text-sm w-[80px] border border-gray-300 rounded px-2 py-1'>
          <option value="USD $">USD $</option>
          <option value="EUR €">EUR €</option>
          <option value="INR ₹">INR ₹</option>
        </select>
        <select className='text-gray-600 text-sm w-[90px] border border-gray-300 rounded px-2 py-1'>
          <option value="English">English</option>
          <option value="French">French</option>
        </select>
      </div>

    </div>
  </div>
</div>

  );
};

export default HeaderTop;




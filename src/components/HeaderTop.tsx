import React from 'react';
import { FaFacebook } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";

const HeaderTop = () => {
  return (
    <div className='border-b border-gray-200 hidden sm:block bg-white'>
      <div className='container mx-auto py-4 px-4'>
        <div className='flex justify-between items-center'>

          {/* Social Media Icons */}
          <div className='hidden lg:flex gap-2'>
            <div className='header_top__icon_wrapper'><FaFacebook /></div>
            <div className='header_top__icon_wrapper'><AiFillTwitterCircle /></div>
            <div className='header_top__icon_wrapper'><RiInstagramFill /></div>
            <div className='header_top__icon_wrapper'><IoLogoWhatsapp /></div>
          </div>

          {/* Currency + Language Selectors */}
          <div className='flex gap-4 items-center'>
            <select className='text-gray-500 text-sm w-[80px] border border-gray-300 rounded px-2 py-1' name='currency' id='currency'>
              <option value="USD $">USD $</option>
              <option value="EUR $">EUR $</option>
              <option value="INR $">INR ₹</option>
            </select>
            <select className='text-gray-500 text-sm w-[90px] border border-gray-300 rounded px-2 py-1' name='language' id='language'>
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

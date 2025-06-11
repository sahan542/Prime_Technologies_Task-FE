'use client';

import React from 'react';
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";

const HeaderMain = () => {
  return (
    <div className="border-b border-gray-200 py-4 bg-white px-4 sm:px-6 lg:px-[60px]">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">

        {/* Top Row: Logo + Icons (on mobile/tablet) */}
        <div className="w-full flex items-center justify-between lg:justify-start lg:w-auto gap-4">
          {/* Logo */}
          <img src="/brizz bella.png" alt="Logo" className="w-[150px] sm:w-[180px]" />

          {/* Icons (visible only below lg) */}
          <div className="flex items-center gap-4 text-[#7b1f4b] text-[22px] lg:hidden">
            <FaUser className="cursor-pointer hover:text-[#7b1f4b]" />
            <div className="relative">
              <HiShoppingBag className="cursor-pointer hover:text-[#7b1f4b]" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                3
              </span>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="w-full sm:w-[280px] md:w-[60%] relative">
          <input
            className="border border-[#7b1f4b] p-2 pr-10 px-4 rounded-xl w-full text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#7b1f4b]"
            type="text"
            placeholder="Enter any product name..."
          />
          <div className="absolute right-0 top-0 h-full w-10 bg-[#7b1f4b] flex items-center justify-center rounded-r-xl">
            <CiSearch className="text-white" size={20} />
          </div>
        </div>

        {/* Icons (desktop only) aligned right */}
        <div className="hidden lg:flex gap-5 text-[#7b1f4b] text-[22px]">
          <FaUser className="cursor-pointer hover:text-[#7b1f4b]" />
          <div className="relative">
            <HiShoppingBag className="cursor-pointer text-[#7b1f4b]" />
            <span className="absolute -top-2 -right-2 bg-[#d4749e] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
              3
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HeaderMain;

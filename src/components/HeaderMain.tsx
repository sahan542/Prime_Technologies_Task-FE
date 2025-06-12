'use client';

import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { IoIosHeart } from "react-icons/io";
import SignInModal from '@/components/modals/SignInModal';
import SignUpModal from '@/components/modals/SignupModal';

const HeaderMain = () => {
  // States for managing the dropdown and modal visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false); 
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);  // Track signup modal state

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const openSignInModal = () => {
    setIsSignInModalOpen(true); 
    setIsDropdownOpen(false); 
  };
  const closeSignInModal = () => setIsSignInModalOpen(false); 

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);  // Open Sign Up modal
    setIsDropdownOpen(false);   // Close the dropdown
  };
  const closeSignUpModal = () => setIsSignUpModalOpen(false); // Close Sign Up modal

  const handleLogout = () => {
    // Handle logout functionality here
    console.log('Logged out');
    setIsDropdownOpen(false); // Close dropdown on logout
  };

  return (
    <div className="border-b border-gray-200 py-4 bg-white px-4 sm:px-6 lg:px-[60px]">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">

        {/* Top Row: Logo + Icons (on mobile/tablet) */}
        <div className="w-full flex items-center justify-between lg:justify-start lg:w-auto gap-4">
          {/* Logo */}
          <img src="/brizz bella.png" alt="Logo" className="w-[150px] sm:w-[180px]" />

          {/* Icons (visible only below lg) */}
          <div className="flex items-center gap-4 text-[#7b1f4b] text-[22px] lg:hidden">
            <FaUser className="cursor-pointer hover:text-[#7b1f4b]" onClick={toggleDropdown} />
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
          <FaUser className="cursor-pointer hover:text-[#7b1f4b]" onClick={toggleDropdown} />
          <div className="relative">
            <HiShoppingBag className="cursor-pointer text-[#7b1f4b]" />
            <span className="absolute -top-2 -right-2 bg-[#d4749e] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
              3
            </span>
          </div>
          <div className="relative">
            <IoIosHeart className="cursor-pointer hover:text-[#7b1f4b]" />
            <span className="absolute -top-2 -right-2 bg-[#d4749e] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Dropdown Menu for User (mobile and desktop) */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2 border border-[#7b1f4b]">
          <button onClick={openSignInModal} className="block w-full text-left px-4 py-2 text-sm hover:bg-[#f5f5f5]">
            Sign In
          </button>
          <button onClick={openSignUpModal} className="block w-full text-left px-4 py-2 text-sm hover:bg-[#f5f5f5]">
            Register
          </button>
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-[#f5f5f5]">
            Logout
          </button>
        </div>
      )}

      {/* SignIn Modal */}
      <SignInModal isOpen={isSignInModalOpen} closeModal={closeSignInModal} />
      {/* SignUp Modal */}
      <SignUpModal isOpen={isSignUpModalOpen} closeModal={closeSignUpModal} />
    </div>
  );
};

export default HeaderMain;

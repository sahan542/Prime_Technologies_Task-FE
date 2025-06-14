'use client';

import React, { useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { IoIosHeart } from "react-icons/io";
import SignInModal from '@/components/modals/SignInModal';
import SignUpModal from '@/components/modals/SignupModal';
import CartPanel from './CartPanel';
import { useAppDispatch } from '@/store/hooks'; // adjust path if different
import { fetchProducts } from '@/store/actions';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectCartCount } from '@/store/slices/cartSlice';


const HeaderMain = () => {
  // States for managing the dropdown and modal visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false); 
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);  // Track signup modal state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();
  const cartItemCount = useSelector(selectCartCount);



  const toggleCart = () => setIsCartOpen(!isCartOpen);

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
    // Step 1: Remove the authentication data from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('user'); 
    localStorage.removeItem('loglevel');   // Assuming you store the JWT token under this key
    console.log('Logged out');  // Log the action for debugging purposes

    // Step 2: Close the dropdown (if there is any dropdown functionality)
    setIsDropdownOpen(false);  // Assuming you have this state for dropdown control

    // Step 3: Optionally, call the backend logout endpoint (optional for JWT)
    // You can skip this if the token is stateless (like JWT).
    fetch('http://localhost:8000/logout', { method: 'POST' })
      .then((response) => {
        if (response.ok) {
          console.log('Logged out on the server');
        } else {
          console.error('Failed to log out on the server');
        }
      })
      .catch((error) => console.error('Error logging out on the server:', error));

    // Step 4: Redirect to the login page or any other page
    const router = useRouter();
    router.push('/login');  // Redirect to the login page after logout
  };

const handleSearch = () => {
  if (searchTerm.trim()) {
    // Push to /products page with search query
    router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
  }
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
              <HiShoppingBag className="cursor-pointer hover:text-[#7b1f4b]" onClick={toggleCart}/>
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button
          className="absolute right-0 top-0 h-full w-10 bg-[#7b1f4b] flex items-center justify-center rounded-r-xl"
          onClick={handleSearch}
        >
          <CiSearch className="text-white" size={20} />
        </button>
      </div>

        {/* Icons (desktop only) aligned right */}
        <div className="hidden lg:flex gap-5 text-[#7b1f4b] text-[22px]">
          <FaUser className="cursor-pointer hover:text-[#7b1f4b]" onClick={toggleDropdown} />
          <div className="relative">
            <HiShoppingBag className="cursor-pointer text-[#7b1f4b]" onClick={toggleCart} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#d4749e] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </div>

          <div className="relative">
            <IoIosHeart className="cursor-pointer hover:text-[#7b1f4b]" />
            <span className="absolute -top-2 -right-2 bg-[#d4749e] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
              3
            </span>
          </div>
            <CartPanel isOpen={isCartOpen} toggleCart={toggleCart} />
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

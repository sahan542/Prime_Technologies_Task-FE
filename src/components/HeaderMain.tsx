// 'use client';

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from './../store/store'; 
// import { selectCartCount, setCartFromStorage } from '@/store/slices/cartSlice'; 
// import { useRouter } from 'next/navigation';
// import { CiSearch } from "react-icons/ci";
// import { FaUser } from "react-icons/fa";
// import { HiShoppingBag } from "react-icons/hi2";
// import { IoIosHeart } from "react-icons/io";
// import { BsFire } from "react-icons/bs";
// import Link from 'next/link';
// import CartPanel from './CartPanel';
// import SignInModal from '@/components/modals/SignInModal';
// import SignUpModal from '@/components/modals/SignupModal';
// import { selectWishlistCount } from '@/store/slices/wishlistSlice';

// const HeaderMain = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isSignInModalOpen, setIsSignInModalOpen] = useState(false); 
//   const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false); 
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
  
//   const dispatch = useDispatch();
//   const router = useRouter();

//   // Fetch cart count from Redux
//   const cartItemCount = useSelector(selectCartCount);
//     const wishlistItemCount = useSelector(selectWishlistCount);

//   const toggleCart = () => setIsCartOpen(!isCartOpen);
//   const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

//   // Modal functions
//   const openSignInModal = () => {
//     setIsSignInModalOpen(true); 
//     setIsDropdownOpen(false); 
//   };
//   const closeSignInModal = () => setIsSignInModalOpen(false);

//   const openSignUpModal = () => {
//     setIsSignUpModalOpen(true);  
//     setIsDropdownOpen(false);   
//   };
//   const closeSignUpModal = () => setIsSignUpModalOpen(false);

//   const handleLogout = () => {
//     // Clear authentication data from localStorage
//     localStorage.removeItem('isAuthenticated');
//     localStorage.removeItem('token');
//     localStorage.removeItem('user'); 
//     localStorage.removeItem('loglevel');  

//     console.log('Logged out'); 

//     // Close the dropdown
//     setIsDropdownOpen(false); 

//     // Perform logout on the server
//     fetch('http://localhost:8000/logout', { method: 'POST' })
//       .then((response) => {
//         if (response.ok) {
//           console.log('Logged out on the server');
//         } else {
//           console.error('Failed to log out on the server');
//         }
//       })
//       .catch((error) => console.error('Error logging out on the server:', error));

//     // Redirect to login page
//     router.push('/login');
//   };

//   const handleSearch = () => {
//     if (searchTerm.trim()) {
//       // Push to /products page with search query
//       router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
//     }
//   };

// useEffect(() => {
//   const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
//   dispatch(setCartFromStorage(storedCart)); // ✅ update cart state from localStorage
// }, [dispatch]);

//   return (
//     <div className="border-b border-gray-200 py-4 bg-white px-4 sm:px-6 lg:px-[60px]">
//       <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">

//         {/* Top Row: Logo + Icons (on mobile/tablet) */}
//         <div className="w-full flex items-center justify-between lg:justify-start lg:w-auto gap-4">
//           {/* Logo */}
//           <img src="/brizz bella.png" alt="Logo" className="w-[127.5px] sm:w-[180px]" />
//           <div className="flex items-center gap-4">
//             {/* Shop All */}
//             <Link href="/products" className="text-[#7b1f4b] hover:underline text-lg sm:text-lg block sm:inline">
//               <span className="block sm:inline w-full">Shop All</span>
//             </Link>
//           </div>
//         </div>

//         {/* Search bar */}
//         <div className="w-full sm:w-[280px] md:w-[60%] relative">
//           <input
//             className="border border-[#7b1f4b] p-2 pr-10 px-4 rounded-xl w-full text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#7b1f4b]"
//             type="text"
//             placeholder="Enter any product name..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
//           />
//           <button
//             className="absolute right-0 top-0 h-full w-10 bg-[#7b1f4b] flex items-center justify-center rounded-r-xl"
//             onClick={handleSearch}
//           >
//             <CiSearch className="text-white" size={20} />
//           </button>
//         </div>

//         {/* Icons (desktop only) */}
//         <div className="hidden lg:flex gap-5 text-[#7b1f4b] text-[22px]">
//           <FaUser className="cursor-pointer hover:text-[#7b1f4b]" onClick={toggleDropdown} />
//           <div className="relative">
//             <HiShoppingBag className="cursor-pointer text-[#7b1f4b]" onClick={toggleCart} />
//             {cartItemCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-[#d4749e] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
//                 {cartItemCount}
//               </span>
//             )}
//           </div>
//           <div className="relative">
//             <IoIosHeart className="cursor-pointer hover:text-[#7b1f4b]" />
//             {wishlistItemCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-[#d4749e] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
//                 {wishlistItemCount}
//               </span>
//             )}
//           </div>
//           <CartPanel isOpen={isCartOpen} toggleCart={toggleCart} />
//         </div>
//       </div>

//       {/* Dropdown Menu for User (mobile and desktop) */}
//       {isDropdownOpen && (
//         <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg w-48 py-2 border border-[#7b1f4b]">
//           <button onClick={openSignInModal} className="block w-full text-left px-4 py-2 text-sm hover:bg-[#f5f5f5]">
//             Sign In
//           </button>
//           <button onClick={openSignUpModal} className="block w-full text-left px-4 py-2 text-sm hover:bg-[#f5f5f5]">
//             Register
//           </button>
//           <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-[#f5f5f5]">
//             Logout
//           </button>
//         </div>
//       )}

//       {/* SignIn Modal */}
//       <SignInModal isOpen={isSignInModalOpen} closeModal={closeSignInModal} />
//       {/* SignUp Modal */}
//       <SignUpModal isOpen={isSignUpModalOpen} closeModal={closeSignUpModal} />
//     </div>
//   );
// };

// export default HeaderMain;

'use client';

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './../store/store';
import { selectCartCount, setCartFromStorage } from '@/store/slices/cartSlice';
import { useRouter } from 'next/navigation';
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi2";
import { IoIosHeart } from "react-icons/io";
import Link from 'next/link';
import CartPanel from './CartPanel';
import SignInModal from '@/components/modals/SignInModal';
import SignUpModal from '@/components/modals/SignupModal';
import { selectWishlistCount } from '@/store/slices/wishlistSlice';

const HeaderMain = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();

  const cartItemCount = useSelector(selectCartCount);
  const wishlistItemCount = useSelector(selectWishlistCount);

  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const openSignInModal = () => {
    setIsSignInModalOpen(true);
    setIsDropdownOpen(false);
  };
  const closeSignInModal = () => setIsSignInModalOpen(false);

  const openSignUpModal = () => {
    setIsSignUpModalOpen(true);
    setIsDropdownOpen(false);
  };
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('loglevel');
    setIsDropdownOpen(false);

    fetch('http://localhost:8000/logout', { method: 'POST' })
      .then((response) => {
        if (!response.ok) {
          console.error('Failed to log out on the server');
        }
      })
      .catch((error) => console.error('Error logging out on the server:', error));

    router.push('/login');
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    dispatch(setCartFromStorage(storedCart));
  }, [dispatch]);

  return (
    <div className="border-b border-gray-200 py-4 bg-white px-4 sm:px-6 lg:px-[60px] relative">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Logo and Shop All */}
        <div className="w-full flex items-center justify-between lg:justify-start lg:w-auto gap-4">
          <img src="/brizz bella.png" alt="Logo" className="w-[127.5px] sm:w-[180px]" />
          <div className="flex items-center gap-4">
            <Link href="/products" className="text-[#7b1f4b] hover:underline text-lg sm:text-lg block sm:inline">
              <span className="block sm:inline w-full">Shop All</span>
            </Link>
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

        {/* Icons (mobile only hidden) */}
        <div className="flex lg:hidden gap-4 text-[#7b1f4b] text-[22px]">
          <FaUser className="cursor-pointer" onClick={toggleDropdown} />
          <div className="relative">
            <HiShoppingBag className="cursor-pointer" onClick={toggleCart} />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#d4749e] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </div>
          <div className="relative">
            <IoIosHeart className="cursor-pointer" />
            {wishlistItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#d4749e] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                {wishlistItemCount}
              </span>
            )}
          </div>
        </div>

        {/* Desktop Icons */}
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
            {wishlistItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#d4749e] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                {wishlistItemCount}
              </span>
            )}
          </div>
          <CartPanel isOpen={isCartOpen} toggleCart={toggleCart} />
        </div>
      </div>

      {/* Dropdown Menu for User (mobile and desktop) */}
      {isDropdownOpen && (
        <div className="absolute right-4 top-full mt-2 bg-white shadow-lg rounded-lg w-48 py-2 border border-[#7b1f4b] z-50">
          <button onClick={openSignInModal} className="block w-full text-left px-4 py-2 text-sm hover:bg-[#f5f5f5] text-[#7b1f4b]">
            Sign In
          </button>
          <button onClick={openSignUpModal} className="block w-full text-left px-4 py-2 text-sm hover:bg-[#f5f5f5] text-[#7b1f4b]">
            Register
          </button>
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm hover:bg-[#f5f5f5] text-[#7b1f4b]">
            Logout
          </button>
        </div>
      )}

      <SignInModal isOpen={isSignInModalOpen} closeModal={closeSignInModal} openSignUpModal={openSignUpModal} />
      <SignUpModal isOpen={isSignUpModalOpen} closeModal={closeSignUpModal} openSignInModal={openSignInModal} />
    </div>
  );
};

export default HeaderMain;

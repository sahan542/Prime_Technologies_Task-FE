'use client';
import React from 'react';
import Link from 'next/link';
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaTiktok,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-black mt-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Google Review Box */}
        <div className="md:col-span-2 bg-blue-50 p-6 rounded shadow-md">
          <div className="flex items-center space-x-1 mb-2 text-yellow-400 text-lg">
            {Array(5).fill(0).map((_, i) => (
              <span key={i}>★</span>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-2">Rate Us On Google</h3>
          <p className="text-sm text-gray-700 mb-4">
            Your feedback helps us improve and provide better service. We appreciate your support and thank you for sharing your experience!
          </p>
          <Link
            href="#"
            className="inline-block border border-black px-4 py-2 text-sm rounded hover:bg-black hover:text-white transition"
          >
            Leave a Review
          </Link>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold mb-3">Categories</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>Skin Care</li>
            <li>Cleansers</li>
            <li>Moisturizers</li>
            <li>Sunscreens</li>
            <li>Serums Targeted Treatments</li>
            <li>Eye Creams & Treatments</li>
            <li>Makeup Removers</li>
            <li>Thermal & Soothing Products</li>
            <li>Hand & Foot Care</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold mb-3">Resources</h4>
          <ul className="space-y-1 text-sm text-gray-700">
            <li><Link href="#">Shop</Link></li>
            <li><Link href="#">About Beautymart</Link></li>
            <li><Link href="#">Contact Us</Link></li>
            <li><Link href="#">Deliveries</Link></li>
            <li><Link href="#">Expert Beauty Talk</Link></li>
          </ul>
        </div>

        {/* User Links & Contact */}
        <div>
          <h4 className="font-semibold mb-3">Beautymart</h4>
          <ul className="space-y-1 text-sm text-gray-700 mb-6">
            <li><Link href="#">My Account</Link></li>
            <li><Link href="#">My Wishlist</Link></li>
            <li><Link href="#">My Cart</Link></li>
            <li><Link href="#">My Orders</Link></li>
            <li><Link href="#">Delivery Fee</Link></li>
          </ul>

          <h4 className="font-semibold mb-2">Contact Us</h4>
          <p className="text-sm text-gray-700">
            Call: <a href="tel:0760116578" className="text-blue-600">076 011 6578</a><br />
            WhatsApp: <a href="https://wa.me/94760116578" className="text-blue-600">+94 76 011 6578</a><br />
            Email: <a href="mailto:info@beautymart.lk" className="text-blue-600">info@beautymart.lk</a><br />
            <span>(All days, between 8am–8pm)</span>
          </p>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">Social Media</h4>
            <div className="flex space-x-3 text-xl text-black">
              <Link href="#"><FaFacebookF /></Link>
              <Link href="#"><FaInstagram /></Link>
              <Link href="#"><FaWhatsapp /></Link>
              <Link href="#"><FaTiktok /></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black text-white text-sm py-4 px-4 flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 beautymart.lk. All Rights Reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link href="#" className="underline">Terms Of Use</Link>
          <Link href="#" className="underline">Privacy Policy</Link>
          <Link href="#" className="underline">Return Policy</Link>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/94760116578"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp className="text-2xl" />
      </a>
    </footer>
  );
};

export default Footer;

"use client";
import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" text-black mt-16 border-t border-gray-200 bg-[#f4dce6]">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-5 gap-8 ">
        {/* Google Review Box */}
        <div className="md:col-span-2 bg-blue-50 p-6 rounded shadow-md">
          <div className="flex items-center space-x-1 mb-2 text-yellow-400 text-lg">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <span key={i}>★</span>
              ))}
          </div>
          <h3 className="text-lg font-semibold mb-2">Rate Us On Google</h3>
          <p className="text-sm text-gray-700 mb-4">
            Your feedback helps us improve and provide better service. We
            appreciate your support and thank you for sharing your experience!
          </p>
          <Link href="#" className="btn-primary">
            Leave a Review
          </Link>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-semibold mb-3 text-[#7b1f4b]">Categories</h4>
          <ul className="space-y-1 text-sm text-black">
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
          <h4 className="font-semibold mb-3 text-[#7b1f4b]">Resources</h4>
          <ul className="space-y-1 text-sm text-black">
            <li>
              <Link href="#">Shop</Link>
            </li>
            <li>
              <Link href="#">About Beautymart</Link>
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
            <li>
              <Link href="#">Deliveries</Link>
            </li>
            <li>
              <Link href="#">Expert Beauty Talk</Link>
            </li>
          </ul>
        </div>

        {/* User Links & Contact */}
        <div>
          <h4 className="font-semibold mb-3 text-[#7b1f4b]">Beautymart</h4>
          <ul className="space-y-1 text-sm text-black mb-6">
            <li>
              <Link href="#">My Account</Link>
            </li>
            <li>
              <Link href="#">My Wishlist</Link>
            </li>
            <li>
              <Link href="#">My Cart</Link>
            </li>
            <li>
              <Link href="#">My Orders</Link>
            </li>
            <li>
              <Link href="#">Delivery Fee</Link>
            </li>
          </ul>

          <h4 className="font-semibold mb-2 text-[#7b1f4b]">Contact Us</h4>
          <p className="text-sm text-black">
            Call:{" "}
            <a href="tel:0770462772" className="text-black">
              <strong>0753319025</strong>
            </a>
            <br />
            WhatsApp:{" "}
            <a href="https://wa.me/94770462772" className="text-black ">
              <strong>+94 77 0462 772</strong>
            </a>
            <br />
            Email:{" "}
            <a href="mailto:info@brissbella.lk" className="text-black">
              <strong>info@brissbella.lk</strong>
            </a>
            <br />
            <span>
              <strong>(All days, between 8am–8pm)</strong>
            </span>
          </p>

          <div className="mt-4">
            <h4 className="font-semibold mb-2 text-[#7b1f4b]">Social Media</h4>
            <div className="flex space-x-3 text-xl">
              <Link href="#">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg cursor-pointer">
                  <FaFacebookF className="text-[#7b1f4b]" />
                </div>
              </Link>
              <Link href="#">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg cursor-pointer">
                  <FaInstagram className="text-[#7b1f4b]" />
                </div>
              </Link>
              <Link href="#">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg cursor-pointer">
                  <FaWhatsapp className="text-[#7b1f4b]" />
                </div>
              </Link>
              <Link href="#">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg cursor-pointer">
                  <FaTiktok className="text-[#7b1f4b]" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#7b1f4b] text-white text-sm py-4 px-4 flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 Briss_Bella. All Rights Reserved.</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <Link href="#" className="underline">
            Terms Of Use
          </Link>
          <Link href="#" className="underline">
            Privacy Policy
          </Link>
          <Link href="#" className="underline">
            Return Policy
          </Link>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/94770462772"
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

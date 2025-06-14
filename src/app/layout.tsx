"use client";

import React, { useState } from "react";
import { metadata } from './config/metadata';
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { Provider } from 'react-redux';  // Import the Provider from react-redux
import { store } from '@/store/store';
import HeaderTop from "@/components/HeaderTop";
import HeaderMain from "@/components/HeaderMain";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/Footer";
import NewProducts from "@/components/NewProducts";
import { AuthModalProvider } from "@/components/context/AuthModalContext";
import { AuthProvider } from "@/context/AuthContext";
import SignInModal from "@/components/modals/SignInModal";
import SignupModal from "@/components/modals/SignupModal";
import ProductCarousel from "@/components/carousel/ProductCarousel";
import { skincareProducts } from "@/data/sampleProducts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSignInOpen, setSignInOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);

  const openSignInModal = () => setSignInOpen(true);
  const closeSignInModal = () => setSignInOpen(false);
  const openSignUpModal = () => setSignUpOpen(true);
  const closeSignUpModal = () => setSignUpOpen(false);

  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{String(metadata.title || '')}</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>  {/* Wrap your app with the Redux Provider */}
          <AuthProvider>
            <AuthModalProvider>
              <HeaderTop />
              <HeaderMain />
              <Navbar />
              {children}
              <NewProducts />
              <ProductCarousel title="Skin Care" products={skincareProducts} />
              <ProductCarousel title="Nature's Secrets" products={skincareProducts} />


              <Footer />
              <SignupModal isOpen={isSignUpOpen} closeModal={closeSignUpModal} />
              <SignInModal isOpen={isSignInOpen} closeModal={closeSignInModal} />
            </AuthModalProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}

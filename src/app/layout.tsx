"use client";

import React, { useState } from "react";
import { metadata } from './config/metadata';
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import { Provider } from 'react-redux';  
import HeaderTop from "@/components/HeaderTop";
import Navbar from "@/components/nav/Navbar";
import Navbars from "@/components/shared/Ui/Navbar/Navbar";
import Footer from "@/components/Footer";
import { AuthModalProvider } from "@/components/context/AuthModalContext";
import { AuthProvider } from "@/context/AuthContext";
import SignInModal from "@/components/modals/SignInModal";
import SignupModal from "@/components/modals/SignupModal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



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
        <Provider store={store}> 
          <PersistGate loading={null} persistor={persistor}>

          <AuthProvider>
            <AuthModalProvider>
              <HeaderTop />
              <Navbars/>
              <Navbar />
              {children}
              <Footer />
              <SignupModal isOpen={isSignUpOpen} closeModal={closeSignUpModal} openSignInModal={openSignInModal}/>
              <SignInModal isOpen={isSignInOpen} closeModal={closeSignInModal}  openSignUpModal={openSignUpModal}/>
              <ToastContainer position="top-right" autoClose={3000} />

            </AuthModalProvider>
          </AuthProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}

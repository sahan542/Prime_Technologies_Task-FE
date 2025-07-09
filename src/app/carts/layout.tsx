"use client";

import React from "react";
import { Provider } from "react-redux"; 
// import Navbar from "@/components/nav/Navbar"; 
// import Footer from "@/components/Footer"; 
import { store } from "@/redux/store"; 

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Cart</title>
      </head>
      <body>
        <Provider store={store}> 

          <main>{children}</main>

        </Provider>
      </body>
    </html>
  );
}

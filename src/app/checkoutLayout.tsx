import React from 'react';
import Footer from "@/components/Footer";
import Navbar from "@/components/nav/Navbar";
import Navbars from "@/components/shared/Ui/Navbar/Navbar";

// TypeScript type for the `children` prop
interface CheckoutLayoutProps {
  children: React.ReactNode;
}

const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbars />
      <main>{children}</main>
    </div>
  );
};

export default CheckoutLayout;

"use client";

import { ChevronDown, ChevronRight, Heart, Menu, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authKey } from "@/constants/authKey";
import { cn } from "@/lib/utils";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, useCurrentUser } from "@/redux/reducers/authSlice";
import { removeUser } from "@/services/auth.services";
import { TCategory } from "@/types/category.type";
import axios from "axios";
import ActiveLink from "../ActiveLink";
import { MobileMenu } from "./MobileMenu";
// import SearchInput from "@/components/shared/Ui/Navbar/SearchInput";
import CartSheet from "./Sheets/CartSheet";
import WishlistSheet from "./Sheets/WishlistSheet";
import { Input } from "antd";
import SignInModal from "@/components/modals/SignInModal";
import SignupModal from "@/components/modals/SignupModal";
import { toast } from "react-toastify";
import { clearCart } from "@/redux/reducers/cartSlice";
import { clearWishlist } from "@/redux/reducers/wishlistSlice";
import PrivacyPolicyModal from "@/components/modals/PrivacyPolicyModal";
import TermsConditionsModal from "@/components/modals/TermsConditionsModal";
import ReturnPolicyModal from "@/components/modals/ReturnPolicyModal";
import { CiSearch } from "react-icons/ci";


const categoriesDemo = [

];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isProductsHovered, setIsProductsHovered] = React.useState(false);
  const [hoveredCategory, setHoveredCategory] = React.useState<string | null>(
    null
  );
  const [isClosing, setIsClosing] = React.useState(false);
  const [isSubMenuClosing, setIsSubMenuClosing] = React.useState(false);
  const megaMenuRef = React.useRef<HTMLDivElement>(null);
  const productsButtonRef = React.useRef<HTMLDivElement>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const subMenuTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isSignInModalOpen, setIsSignInModalOpen] = React.useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = React.useState(false); 
  const [isPrivacyOpen, setIsPrivacyOpen] = React.useState(false);
  const [isTermsOpen, setIsTermsOpen] = React.useState(false);
  const [isReturnOpen, setIsReturnOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');
  

  const dispatch = useAppDispatch();
  const router = useRouter();

  const pathname = usePathname();
  //sahan removed
  const user = useAppSelector(useCurrentUser);

  const isAdmin = user?.role === "admin";

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

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Handle menu opening with delay
  const handleMenuEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsClosing(false);
    setIsProductsHovered(true);
  };

  // Handle menu closing with delay for smooth transition
  const handleMenuLeave = () => {
    setIsClosing(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsProductsHovered(false);
      setHoveredCategory(null);
      setIsClosing(false);
    }, 300);
  };

 

  // Handle submenu closing with delay for smooth transition
  const handleCategoryLeave = () => {
    setIsSubMenuClosing(true);
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
    }
    subMenuTimeoutRef.current = setTimeout(() => {
      setHoveredCategory(null);
      setIsSubMenuClosing(false);
    }, 300);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleLogout = async () => {
    await axios.post("/api/auth/remove-cookies", {
      accessToken: authKey,
    });
    dispatch(logout());
      dispatch(clearCart());      // Clears cart state
    dispatch(clearWishlist());  // Clears wishlist state

    localStorage.removeItem("persist:moTeCart");
    localStorage.removeItem("persist:moTeWishlist");
    removeUser();
    toast.success("Logout Successful!");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#7b1f4b] text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex gap-2">
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[350px] bg-white"
              >
                <SheetHeader>
                <SheetTitle>
    <div className="pt-4 flex flex-col items-center text-white">
      <Link href="/" className="font-bold text-xl mb-2">
        <img src="/brizz bella.png" alt="Logo" className="w-[160px] sm:w-[180px]" />
      </Link>

      <div className="flex flex-col gap-4 mt-4 w-full items-center ">

<div className="w-full max-w-sm">
  <div className="flex rounded-2xl overflow-hidden border border-[#7b1f4b] bg-[#d4749e]">
    <input
      type="text"
      className="flex-1 px-4 py-2 text-gray-600 placeholder:text-gray-400 bg-white focus:outline-none"
      placeholder="Enter product name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
    />
    <button
      className="w-12 bg-[#f4dce6] flex items-center justify-center"
      onClick={handleSearch}
    >
      <CiSearch className="text-[#7b1f4b]" size={20} />
    </button>
  </div>
</div>

        <Link href="/products" className="btn-primary text-white hover:underline text-sm mt-12">
          All Products
        </Link>
        <Button  className="btn-primary text-white hover:underline text-sm" 
            onClick={() => {
                setIsMobileMenuOpen(false);
                setIsPrivacyOpen(true);
                }}>
          Privacy & Policy
        </Button>
        <Button  className="btn-primary text-white hover:underline text-sm" 
           onClick={() => {
                setIsMobileMenuOpen(false);
                setIsTermsOpen(true);
               }}>
          Terms and Conditions
        </Button>
        <Button  className="btn-primary text-white hover:underline text-sm" 
            onClick={() => {
                setIsMobileMenuOpen(false);
                setIsReturnOpen(true);
            }}>
          Return Policy
        </Button>
      </div>
    </div>
                  </SheetTitle>
                  <SheetDescription className="hidden"></SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>

            <div className="flex flex-row items-center gap-5 ">
              <Link href="/" className="font-bold text-xl">
                <img src="/brizz2bella.png" alt="Logo" className="w-[127.5px] sm:w-[180px]" />
              </Link>
              <Link
                href="/products"
                className="hidden sm:block text-[#7b1f4b] hover:underline text-lg"
              >
                <span className="text-white">Shop All</span>
              </Link>

            </div>
          </div>

          {/* Desktop Navigation */}

<div className="hidden sm:block w-full max-w-md">
    <div className="flex rounded-2xl overflow-hidden border border-[#7b1f4b] bg-[#d4749e]">
    <input
      type="text"
      className="flex-1 px-4 py-2 text-gray-600 placeholder:text-gray-400 bg-white focus:outline-none"
      placeholder="Enter any product name..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
    />
    <button
      className="w-10 bg-[#f4dce6] flex items-center justify-center"
      onClick={handleSearch}
    >
      <CiSearch className="text-[#7b1f4b]" size={20} />
    </button>
  </div>
</div>




          <div className="flex gap-4">

            {/* Right side icons */}
            <div className="ml-auto flex items-center space-x-4">
              <div className="flex gap-0">
                <WishlistSheet />
                <CartSheet />
              </div>

              {/* login/logout button */}
              <div className="flex items-center gap-4">
                {user ? (
                  <Button
                    className="cursor-pointer bg-orange-600 text-white hover:bg-white hover:text-orange-600"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                ) : (
                    <Button className="cursor-pointer bg-orange-600 text-white hover:bg-white hover:text-orange-600" onClick={openSignInModal}>
                      Login
                    </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
        <SignInModal isOpen={isSignInModalOpen} closeModal={closeSignInModal} openSignUpModal={openSignUpModal}/>
        <SignupModal isOpen={isSignUpModalOpen} closeModal={closeSignUpModal} openSignInModal={openSignInModal}/>
        <PrivacyPolicyModal isOpen={isPrivacyOpen} closeModal={() => setIsPrivacyOpen(false)} />
        <TermsConditionsModal isOpen={isTermsOpen} closeModal={() => setIsTermsOpen(false)} />
        <ReturnPolicyModal isOpen={isReturnOpen} closeModal={() => setIsReturnOpen(false)} />
    
    </header>
  );
};

export default Navbar;

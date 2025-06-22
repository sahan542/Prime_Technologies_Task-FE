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

  const dispatch = useAppDispatch();
  const router = useRouter();

  const pathname = usePathname();
  //sahan removed
  const user = useAppSelector(useCurrentUser);

  const isAdmin = user?.role === "admin";

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

  // Handle submenu opening
  const handleCategoryEnter = (categoryId: string) => {
    if (subMenuTimeoutRef.current) {
      clearTimeout(subMenuTimeoutRef.current);
    }
    setIsSubMenuClosing(false);
    setHoveredCategory(categoryId);
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

  const handleLogout = async () => {
    await axios.post("/api/auth/remove-cookies", {
      accessToken: authKey,
    });
    dispatch(logout());
    removeUser();

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
                className="w-[300px] sm:w-[350px] bg-secondary"
              >
                <SheetHeader>
                  <SheetTitle>
                    <div className="pt-4 flex items-center justify-center text-white ">
                      <Link href="/" className="font-bold text-xl">
                        MobileShop
                      </Link>
                    </div>
                  </SheetTitle>
                  <SheetDescription className="hidden"></SheetDescription>
                </SheetHeader>
                {/* <MobileMenu
                  categories={categoriesList}
                  setIsMobileMenuOpen={setIsMobileMenuOpen}
                /> */}
              </SheetContent>
            </Sheet>

            <div className="flex flex-row items-center gap-5 ">
              <Link href="/" className="font-bold text-xl">
                <img src="/brizz2bella.png" alt="Logo" className="w-[127.5px] sm:w-[180px]" />
              </Link>
                <Link href="/products" className="text-[#7b1f4b] hover:underline text-lg sm:text-lg block sm:inline">
                  <span className="block sm:inline w-full text-white">Shop All</span>
                </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:ml-6 lg:flex h-full">
            <ActiveLink href="/" exact>
              Home
            </ActiveLink>

            {/* Products Dropdown */}
            <div
              ref={productsButtonRef}
              className="relative h-full"
              onMouseEnter={handleMenuEnter}
              onMouseLeave={handleMenuLeave}
            >
              <div className="flex items-center h-full">
                <ActiveLink
                  href="/products"
                  className="flex items-center h-full"
                >
                  Products
                  <ChevronDown
                    className={cn(
                      "ml-1 h-4 w-4 transition-transform duration-300",
                      isProductsHovered && "rotate-180"
                    )}
                  />
                </ActiveLink>
              </div>

              {/* Mega Menu */}
              {isProductsHovered && (
                <div
                  ref={megaMenuRef}
                  className={cn(
                    "absolute left-0 z-10 mt-0 w-64 bg-[#5550A0] shadow-lg rounded-b-md border border-[#6660B0]",
                    "transition-all duration-300 ease-in-out",
                    isClosing
                      ? "opacity-0 translate-y-1"
                      : "opacity-100 translate-y-0"
                  )}
                >

                </div>
              )}
            </div>

            <ActiveLink href="/contact">Contact Us</ActiveLink>

            <ActiveLink href="/about">About Us</ActiveLink>
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
                  <Link href="/login">
                    <Button className="cursor-pointer bg-white text-[#5550A0] hover:bg-white/90">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  insideDhakaShippingCost,
  outsideDhakaShippingCost,
} from "@/constants/productKey";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  removeFromCart,
  updateQuantity,
  updateShippingOption,
} from "@/redux/reducers/cartSlice";
import { Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import CartDesktopCard from "./CartDesktopCard";
import CartMobileCard from "./CartMobileCard";

export default function Cart() {
  const [shippingOption, setShippingOption] = useState("outside");

  const router = useRouter();

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shippingCost =
    shippingOption === "inside"
      ? insideDhakaShippingCost
      : outsideDhakaShippingCost;

  const total = subtotal + shippingCost;

  const handleUpdateQuantity = (
    currStock: number,
    productId: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) {
      toast.error("You have to put at least 1 quantity!");
    } else if (newQuantity > currStock) {
      toast.error("Out of stock!");
    } else {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  const removeItem = (productId: string) => {
    // setCartItems((items) => items.filter((item) => item.id !== id));
    dispatch(removeFromCart(productId));
  };

  // handle checkout
  const handleCheckout = () => {
    dispatch(updateShippingOption(shippingOption));

    router.push("/checkout");
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-primary/10">
        <div className="w-full max-w-4xl mx-auto py-4 mt-6">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-1 lg:space-x-4">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-[#7b1f4b] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="ml-2 text-sm font-xl text-[#7b1f4b]">
                  Cart
                </span>
              </div>
              <div className="h-px w-6 md:w-10 lg:w-16 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-[#d4749e] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">
                  Checkout
                </span>
              </div>
              <div className="h-px w-6 md:w-10 lg:w-16 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-[#d4749e] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">
                  Confirmation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full py-12 lg:pb-20 ">
        <div className="grid grid-cols-12 lg:gap-12">
          <div className="col-span-12 lg:col-span-8">
            <div className="">
              {cartItems.length === 0 ? (
                <div className="h-full text-center py-12">
                  <h4 className="text-lg lg:text-xl font-medium mb-4 text-black">
                    Your cart is empty!
                  </h4>
                  <Button asChild className="bg-[#7b1f4b]"> 
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="py-6">
                  {cartItems.map((item, index) => (
                    <div key={item.product.id}>
                      <div className="">
                        <div className="block md:hidden w-full">
                          <CartMobileCard
                            item={item}
                            onCartQuantityUpdate={handleUpdateQuantity}
                            onCartRemove={removeItem}
                          />
                        </div>

                        <div className="hidden md:block w-full">
                          <CartDesktopCard
                            item={item}
                            onCartQuantityUpdate={handleUpdateQuantity}
                            onCartRemove={removeItem}
                          />
                        </div>
                      </div>
                      {index < cartItems.length - 1 && (
                        <hr className="my-4 border border-primary/10" />
                      )}
                    </div>
                  ))}

                  
                </div>
              )}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 my-8 lg:my-0">
            <Card className="">
              <CardContent className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium text-lg text-black">Subtotal:</span>
                  <span className="font-semibold text-black">Rs {subtotal.toFixed(2)}</span>
                </div>

                <div>
                  <p className="font-medium mb-3 text-black">Shipping</p>
                  <RadioGroup
                    value={shippingOption}
                    onValueChange={setShippingOption}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="outside" id="outside" />
                        <Label htmlFor="outside" className="text-black">
                          Outside Colombo City (3-5 Days):
                        </Label>
                      </div>
                      <span className="font-medium text-black">
                        Rs {outsideDhakaShippingCost}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="inside" id="inside" />
                        <Label htmlFor="inside" className="text-black">
                          Inside Colombo city (2-3 Days):
                        </Label>
                      </div>
                      <span className="font-medium text-black" >
                        Rs {insideDhakaShippingCost}
                      </span>
                    </div>
                  </RadioGroup>
                  <p className="text-sm text-[#7b1f4b] mt-2">
                    Shipping options will be updated during checkout.
                  </p>
                </div>

                <hr className="border border-gray-500/20" />

                <div className="flex justify-between items-center text-lg font-bold">
                  <span className="text-xl text-black">Total</span>
                  <span className="text-black">Rs {total.toFixed(2)}</span>
                </div>

                <Button
                  className="w-full py-5 bg-[#7b1f4b]"
                  asChild
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                >
                  <Link href="/checkout" className="text-black">
                    <Lock className="h-4 w-4 mr-2" />
                    Proceed to checkout
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

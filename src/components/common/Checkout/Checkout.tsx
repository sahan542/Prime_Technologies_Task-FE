"use client";

import MTForm from "@/components/shared/Forms/MTForm";
import MTInput from "@/components/shared/Forms/MTInput";
import MTTextArea from "@/components/shared/Forms/MTTextArea";
import { LoaderSpinner } from "@/components/shared/Ui/LoaderSpinner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  insideDhakaShippingCost,
  outsideDhakaShippingCost,
} from "@/constants/productKey";
import { useAddOrderMutation } from "@/redux/api/orderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart } from "@/redux/reducers/cartSlice";
import { Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const userBillingAddressSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  full_address: z.string().min(1, "Full address is required"),
  phone_no: z
    .string()
    .min(11, "Number must be at least 11 digits")
    .max(14, "Number can't exceed 14 digits"),
  email: z.string().email("Enter a valid email"),
  country: z.string().default("Bangladesh"), // or `.optional()` if not required
  order_notes: z.string().optional(), // allow empty or undefined notes
});

const userBillingAddress = {
  full_name: "",
  full_address: "",
  phone_no: "",
  email: "",
  country: "Srilanka",
  order_notes: "",
};

export default function Checkout() {
  const [isLoading, setIsLoading] = useState(false);
  const shipOption = useAppSelector((state) => state.cart.shippingOption);

  const [shippingOption, setShippingOption] = useState(shipOption || "outside");

  const cartItems = useAppSelector((state) => state.cart.items);

  const router = useRouter();

  const dispatch = useAppDispatch();

  // redux rtk api
  const [addOrder] = useAddOrderMutation();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // const items = cartItems.map((item) => ({
  //   product_id: item.product.id,
  //   quantity: item.quantity,
  // }));
  const items = cartItems.map((item) => {
  const rawId = item.product?.id;

  return {
    product_id: typeof rawId === "string" ? parseInt(rawId) : rawId,
    quantity: item.quantity,
  };
});


  const shippingCost =
    shippingOption === "inside"
      ? insideDhakaShippingCost
      : outsideDhakaShippingCost;
  const total = subtotal + shippingCost;

  const handleSubmit = async (values: FieldValues) => {
    setIsLoading(true);

    const orderData = {
      ...values,
      inside_dhaka: shippingOption === "inside" ? true : false,
      items,
      total_price: total,
      shipping_method: "colombo",
      shipping_cost: 0,
      service_fee: 0,
      payment_method: "CASH-ON-DELIVERY",
      user_id: 1
    };

    // send to db
    try {
      const res = await addOrder(orderData).unwrap();
      toast.success(res.message || "Order placed successfully!");
      dispatch(clearCart());
      router.push(`/checkout/confirmation?orderId=${res.order_id}`);
      setIsLoading(false);
    } catch (error: any) {
      toast.error(
        error?.data?.errorSources[0].message || "Something went wrong!"
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-primary/10">
        <div className="w-full max-w-4xl mx-auto py-4 mt-6">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-1 lg:space-x-4">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-[#d4749e] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="ml-2 text-sm font-medium text-[#d4749e]">Cart</span>
              </div>
              <div className="h-px w-6 md:w-10 lg:w-16 bg-[#d4749e]"></div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-[#d4749e] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-[#d4749e]">
                  Checkout
                </span>
              </div>
              <div className="h-px w-6 md:w-10 lg:w-16 bg-[#d4749e]"></div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
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
      <div className="max-w-6xl mx-auto py-8 lg:pb-16">
        <MTForm
          onSubmit={handleSubmit}
          defaultValues={userBillingAddress}
          schema={userBillingAddressSchema}
        >
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Billing & Shipping Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#7b1f4b]">Billing & Shipping</h2>

                <div className="space-y-6">
                  <div className="grid gap-1">
                    <label htmlFor="full_name" className="text-sm font-medium text-black">
                      Full Name{" "}
                      <span className="text-red-500 font-medium">*</span>
                    </label>

                    <MTInput name="full_name" type="text" placeholder="" className="border-[#7b1f4b]" />
                  </div>

                  <div className="grid gap-1">
                    <label
                      htmlFor="full_address"
                      className="text-sm font-medium text-black"
                    >
                      Full Address{" "}
                      <span className="text-red-500 font-medium">*</span>
                    </label>

                    <MTInput
                      name="full_address"
                      type="text"
                      placeholder="City, area, house number and street name etc" className="border-[#7b1f4b]"
                    />
                  </div>

                  <div className="grid gap-1">
                    <label htmlFor="phone_no" className="text-sm font-medium text-black" >
                      Phone No{" "}
                      <span className="text-red-500 font-medium">*</span>
                    </label>

                    <MTInput name="phone_no" type="tel" placeholder="" className="border-[#7b1f4b]"/>
                  </div>

                  <div className="grid gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-black">
                      Email Address{" "}
                      <span className="text-red-500 font-medium">*</span>
                    </label>

                    <MTInput name="email" type="email" placeholder="" className="border-[#7b1f4b]"/>
                  </div>

                  <div className="grid gap-1">
                    <label htmlFor="country" className="text-sm font-medium text-black">
                      Country / Region{" "}
                      <span className="text-red-500 font-medium">*</span>
                    </label>

                    <MTInput name="country" type="text" placeholder="" className="border-[#7b1f4b]"/>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4 text-[#7b1f4b]">
                    Additional information
                  </h3>

                  <div className="grid gap-1">
                    <label htmlFor="order_notes" className="text-sm font-medium text-black">
                      Order notes (optional)
                    </label>

                    <MTTextArea
                      placeholder="Notes about your order, e.g. special notes for delivery"
                      name="order_notes"
                      rows={10}
                      className="min-h-[120px] border-[#7b1f4b]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mb-8 lg:mb-0">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6 text-[#7b1f4b]">Your order</h3>

                  {cartItems.length === 0 ? (
                    <div className="h-full text-center pt-6 pb-12">
                      <h4 className="text-lg lg:text-xl font-medium mb-4 text-black">
                        Your cart is empty!
                      </h4>
                      <Button className="btn-primary">
                        <Link href="/products">Continue Shopping</Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4 mb-6">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex gap-3">
                          <Image
                            src={item.product.image || "/placeholder.svg"}
                            alt={`photo`}
                            width={60}
                            height={60}
                            className="rounded-md object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm leading-tight line-clamp-2 text-black">
                              {item.product.name}
                            </h4>

                            <p className="text-sm text-gray-600">
                              × {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-black">
                              Rs{" "}
                              {(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <hr className="mb-4 border border-[#7b1f4b]/60" />

                  {/* Pricing */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="font-medium text-black">Subtotal:</span>
                      <span className="font-semibold text-black">
                        Rs {subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div>
                      <p className="font-medium mb-3 text-lg text-black">Shipping</p>
                      <RadioGroup
                        value={shippingOption}
                        onValueChange={setShippingOption}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="outside"
                              id="outside-checkout"
                            />
                            <Label
                              htmlFor="outside-checkout"
                              className="text-sm text-black"
                            >
                              Outside Colombo City (3-5 Days):
                            </Label>
                          </div>
                          <span className="font-semibold text-black">
                            Rs {outsideDhakaShippingCost}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="inside"
                              id="inside-checkout"
                            />
                            <Label
                              htmlFor="inside-checkout"
                              className="text-sm text-black"
                            >
                              Inside Colombo city (2-3 Days):
                            </Label>
                          </div>
                          <span className="font-semibold text-black">
                            Rs {insideDhakaShippingCost}
                          </span>
                        </div>
                      </RadioGroup>
                    </div>

                    <hr className="border border-[#7b1f4b]/60" />

                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-xl text-black">Total</span>
                      <span className="text-black">Rs {total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6 bg-[#d4749e]/10 ">
                      <div className="p-4 border border-1 border-[#7b1f4b] rounded-xl shadow-lg">
                        <div className="flex items-center space-x-2 mb-2 ">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="font-medium text-black"><b>Cash on delivery</b></span>
                      </div>
                      <p className="text-sm text-gray-600">
                        Pay with cash upon delivery.
                      </p>
                    </div>
                  </div>

                  {/* Privacy Policy */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600">
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-blue-600 underline"
                      >
                        privacy policy
                      </Link>
                      .
                    </p>
                  </div>

                  {/* Place Order Button */}
                  <Button type="submit" className="w-full text-lg py-5 bg-[#7b1f4b] hover:bg-[#7b1f4b]/90">
                    {isLoading ? (
                      <span className="flex gap-2 items-center">
                        <LoaderSpinner /> <span>Processing...</span>
                      </span>
                    ) : (
                      <span className="flex gap-2 items-center">
                        <Lock className="h-5 w-5 mr-2" />
                        <span>Place order</span>
                      </span>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </MTForm>
      </div>
    </div>
  );
}

"use client";

import { MyLoader } from "@/components/shared/Ui/MyLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  insideColomboShippingCost,
  outsideColomboShippingCost,
} from "@/constants/productKey";
import { useGetSingleOrderQuery } from "@/redux/api/orderApi";
import { TProduct } from "@/types";
import {
  ArrowRight,
  Calendar,
  Info,
  MapPin,
  Package,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NoOrderFound from "./NoOrdersFound";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type TOrderItem = {
  _id: string;
  product: TProduct;
  quantity: number;
};

export default function OrderConfirmation({ orderId }: { orderId: string }) {
  const token = useSelector((state: RootState) => state.auth.token);
  const [productMap, setProductMap] = useState<Record<number, any>>({});
  const { data: order, isLoading: isOrderLoading } =
    useGetSingleOrderQuery(orderId);

  useEffect(() => {
    const fetchProductsForOrder = async () => {
      if (!order?.items?.length) return;

      const fetchedProducts: Record<number, any> = {};

      await Promise.all(
        order.items.map(async (item) => {
          try {
            const res = await fetch(
              `http://64.227.146.100:8000/api/admin/products/${item.product_id}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );
            const data = await res.json();
            fetchedProducts[item.product_id] = data;
          } catch (err) {
            console.error(`Failed to fetch product ${item.product_id}`, err);
          }
        })
      );

      setProductMap(fetchedProducts);
    };

    fetchProductsForOrder();
  }, [order, token]);

  if (isOrderLoading) {
    return <MyLoader />;
  }

  const subtotal = order?.data?.orderItems?.reduce(
    (acc: number, item: TOrderItem) => {
      return acc + item.product.price * item.quantity;
    },
    0
  );

  console.log("order : ", order);

  const shipping = order?.data?.insideDhaka
    ? insideColomboShippingCost
    : outsideColomboShippingCost;

  const total = subtotal + shipping;

  console.log("order data", order);
  return (
    <div className="min-h-screen">
      <div className="border-b border-primary/10">
        <div className="w-full max-w-4xl mx-auto py-4 mt-6">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-1 lg:space-x-4">
              <div className="flex items-center">
                <div className="h-8 w-8 bg-[#d4749e] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <span className="ml-2 text-sm font-medium text-[#7b1f4b]">
                  Cart
                </span>
              </div>
              <div className="h-px w-6 md:w-10 lg:w-16 bg-[#d4749e]"></div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-[#d4749e] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-[#7b1f4b]">
                  Checkout
                </span>
              </div>
              <div className="h-px w-6 md:w-10 lg:w-16 bg-[#d4749e]"></div>
              <div className="flex items-center">
                <div className="h-8 w-8 bg-[#d4749e] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <span className="ml-2 text-sm font-medium text-[#7b1f4b]">
                  Confirmation
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!orderId || !order || order?.data?.length === 0 ? (
        <NoOrderFound />
      ) : (
        <div className="max-w-4xl mx-auto px-4 pt-8 pb-24 bg-[#f4dce6]/40">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-black">
                    <Package className="h-5 w-5 text-black" />
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-black">Order Number</p>
                      <p className="font-semibold text-black">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black">Order Date</p>
                      <p className="font-semibold text-black">
                        {order.created_at.slice(0, 10)}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-black">Email</p>
                      <p className="font-semibold text-black ">{order.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-black">Payment Method</p>
                      <p className="font-semibold text-black">
                        {order.payment_method || "N/A"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-black">
                    <Truck className="h-5 w-5 text-black" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="md:flex justify-between gap-3 space-y-4 ">
                    <div className="w-full md:w-1/2 flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-black mt-0.5" />
                      <div>
                        <p className="font-semibold text-black">
                          {order.fullName}
                        </p>
                        <p className="text-black">{order.fullAddress}</p>
                        <p className="text-black">{order.country}</p>
                        <p className="text-black">{order.phoneNo}</p>
                      </div>
                    </div>
                    {order?.orderNotes && (
                      <div className="w-full md:w-1/2 flex items-start gap-3">
                        <Info className="h-5 w-5 text-black mt-0.5" />
                        <div>
                          <p className="font-semibold text-black">
                            Additional Notes:
                          </p>
                          <p className="text-black">{order.orderNotes}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-[#d4749e]/60">
                    <Calendar className="h-5 w-5 text-white" />
                    <div>
                      <p className="text-sm font-medium text-white">
                        Estimated Delivery
                      </p>
                      <p className="text-sm text-white">2-3 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items?.map(
                      (
                        item: { product_id: number; quantity: number },
                        index: number
                      ) => {
                        const product = productMap[item.product_id];

                        if (!product) return null;

                        return (
                          <div key={item.product_id}>
                            <div className="flex gap-4">
                              <Image
                                src={product.img || "/placeholder.svg"}
                                alt={product.title.slice(0, 5)}
                                width={80}
                                height={80}
                                className="rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h3 className="font-medium text-black">
                                  {product.title}
                                </h3>
                                <div className="flex items-center justify-between mt-2">
                                  <span className="text-sm text-black">
                                    Qty: {item.quantity}
                                  </span>
                                  <span className="font-semibold text-black">
                                    Rs{" "}
                                    {(product.price * item.quantity).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            {index < order.items.length - 1 && (
                              <Separator className="mt-4" />
                            )}
                          </div>
                        );
                      }
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-black">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-black">Subtotal:</span>
                    <span className="text-black">
                      Rs {order.total_price - shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black">Shipping:</span>
                    <span className="text-black">Rs {shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span className="text-black">Total:</span>
                    <span className="text-black">Rs {order.total_price}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  className="w-full primary-btn bg-[#7b1f4b] hover:bg-[#d4749e] rounded-md"
                  asChild
                >
                  <Link href="/">
                    Continue Shopping
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Support */}
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="font-semibold mb-2 text-black">
                      Need Help?
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Contact our customer support team for any questions about
                      your order.
                    </p>
                    <Button variant="outline" size="sm" className="btn-primary">
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

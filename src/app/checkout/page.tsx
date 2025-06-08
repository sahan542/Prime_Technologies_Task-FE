'use client';
import React, { useState } from 'react';

export default function CheckoutPage() {
  const [shipping, setShipping] = useState('outside');

  const subtotal = 7500;
  const shippingCost = shipping === 'outside' ? 600 : 300;
  const serviceFee = subtotal * 0.05;
  const total = subtotal + shippingCost + serviceFee;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
          <form className="space-y-4">
            <div className="flex gap-4">
              <input type="text" placeholder="First Name*" className="w-full border p-2 rounded bg-gray-100 text-black" />
              <input type="text" placeholder="Last Name*" className="w-full border p-2 rounded bg-gray-100 text-black" />
            </div>
            <input type="text" placeholder="Street address*" className="w-full border p-2 rounded bg-gray-100 text-black" />
            <input type="text" placeholder="Apartment, suite, unit, etc. (optional)" className="w-full border p-2 rounded bg-gray-100 text-black" />
            <input type="text" placeholder="Town / City*" className="w-full border p-2 rounded bg-gray-100 text-black" />
            <input type="text" placeholder="Phone*" className="w-full border p-2 rounded bg-gray-100 text-black" />
            <input type="email" placeholder="Email address*" className="w-full border p-2 rounded bg-gray-100 text-black" />

            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              Create an account?
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" />
              Ship to a different address?
            </label>

            <textarea placeholder="Order Notes (optional)" rows={4} className="w-full border p-2 rounded bg-gray-100 text-black" />
          </form>
        </div>

        {/* Order Summary */}
        <div className="border rounded p-6 bg-gray-50 text-black">
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>

          {/* Product Item */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-medium">CeraVe Blemish Control Gel 40ml</p>
              <p className="text-sm">× 1 @ Rs. 7,500.00</p>
              <button className="text-blue-600 underline text-xs mt-1">Remove</button>
            </div>
            <p>Rs. 7,500.00</p>
          </div>

          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-start">
              <span>Shipping</span>
              <div className="space-y-1">
                <label className="flex items-center gap-2">
                  <input type="radio" checked={shipping === 'outside'} onChange={() => setShipping('outside')} />
                  Outside Colombo: Rs. 600.00
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" checked={shipping === 'colombo'} onChange={() => setShipping('colombo')} />
                  Around Colombo: Rs. 300.00
                </label>
              </div>
            </div>

            <div className="flex justify-between">
              <span>Service Fee (5%)</span>
              <span>Rs. {serviceFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>TOTAL</span>
              <span>Rs. {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Coupon */}
          <div className="mt-4">
            <label className="block mb-1 text-sm">Have a coupon?</label>
            <div className="flex gap-2">
              <input type="text" placeholder="Coupon code" className="flex-1 border p-2 rounded bg-gray-100 text-black" />
              <button className="bg-black text-white px-4 rounded hover:bg-gray-800">APPLY</button>
            </div>
          </div>

          {/* Payment Options */}
          <div className="mt-6 text-sm">
            <label className="flex items-center gap-2 mb-2">
              <input type="radio" name="payment" defaultChecked />
              Payzy Installments
            </label>
            <label className="flex items-center gap-2 mb-2">
              <input type="radio" name="payment" />
              Pay by Card
            </label>
            <label className="flex items-center gap-2 mb-2">
              <input type="radio" name="payment" />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2 mb-4">
              <input type="radio" name="payment" />
              Direct Bank Transfer
            </label>
          </div>

          {/* Agreement */}
          <label className="flex items-start gap-2 text-sm mb-4">
            <input type="checkbox" />
            <span>I have read and agree to the website terms and conditions</span>
          </label>

          <button className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800">
            PLACE ORDER
          </button>

          <p className="text-xs text-center mt-4 text-gray-500">
            Your Payment is 100% Secure.
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { CartItem } from '@/types/cart'; // Update path if needed

export default function CheckoutPage() {
  const [shipping, setShipping] = useState<'outside' | 'colombo'>('outside');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [billing, setBilling] = useState({
    first_name: '',
    last_name: '',
    street_address: '',
    apartment: '',
    city: '',
    phone: '',
    email: '',
    create_account: false,
    ship_different: false,
    order_notes: '',
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return;
    const updated = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQty } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeItem = (id: string) => {
    const updated = cartItems.filter(item => item.id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = shipping === 'outside' ? 600 : 300;
  const serviceFee = subtotal * 0.05;
  const total = subtotal + shippingCost + serviceFee;

  const handlePlaceOrder = async () => {
    const payload = {
      ...billing,
      shipping_method: shipping,
      shipping_cost: parseFloat(shippingCost.toFixed(2)),
      service_fee: parseFloat(serviceFee.toFixed(2)),
      total_amount: parseFloat(total.toFixed(2)),
      payment_method: paymentMethod,
      status: 'Pending',
      payment_status: 'Unpaid',
      items: cartItems.map(item => ({
        product_id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      const res = await fetch('http://localhost:8000/orders/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to place order');

      const data = await res.json();
      alert('Order placed successfully!');
      localStorage.removeItem('cart');
      setCartItems([]);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 text-black">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Billing Details */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Billing Details</h2>
          <form className="space-y-4" onSubmit={e => e.preventDefault()}>
            <div className="flex gap-4">
              <input type="text" placeholder="First Name*" className="w-full border p-2 rounded bg-gray-100"
                value={billing.first_name}
                onChange={e => setBilling({ ...billing, first_name: e.target.value })}
              />
              <input type="text" placeholder="Last Name*" className="w-full border p-2 rounded bg-gray-100"
                value={billing.last_name}
                onChange={e => setBilling({ ...billing, last_name: e.target.value })}
              />
            </div>
            <input type="text" placeholder="Street address*" className="w-full border p-2 rounded bg-gray-100"
              value={billing.street_address}
              onChange={e => setBilling({ ...billing, street_address: e.target.value })}
            />
            <input type="text" placeholder="Apartment (optional)" className="w-full border p-2 rounded bg-gray-100"
              value={billing.apartment}
              onChange={e => setBilling({ ...billing, apartment: e.target.value })}
            />
            <input type="text" placeholder="City*" className="w-full border p-2 rounded bg-gray-100"
              value={billing.city}
              onChange={e => setBilling({ ...billing, city: e.target.value })}
            />
            <input type="text" placeholder="Phone*" className="w-full border p-2 rounded bg-gray-100"
              value={billing.phone}
              onChange={e => setBilling({ ...billing, phone: e.target.value })}
            />
            <input type="email" placeholder="Email address*" className="w-full border p-2 rounded bg-gray-100"
              value={billing.email}
              onChange={e => setBilling({ ...billing, email: e.target.value })}
            />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox"
                checked={billing.create_account}
                onChange={e => setBilling({ ...billing, create_account: e.target.checked })}
              />
              Create an account?
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox"
                checked={billing.ship_different}
                onChange={e => setBilling({ ...billing, ship_different: e.target.checked })}
              />
              Ship to a different address?
            </label>
            <textarea placeholder="Order Notes (optional)" rows={4} className="w-full border p-2 rounded bg-gray-100"
              value={billing.order_notes}
              onChange={e => setBilling({ ...billing, order_notes: e.target.value })}
            />
          </form>
        </div>

        {/* Order Summary */}
        <div className="border rounded p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Your Order</h2>

          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-4">
              <img src={item.img} alt={item.name} className="w-24 h-24 object-cover mr-4" />
              <div className="flex-1 ml-4">
                <p className="font-medium">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-200 rounded text-sm"
                    disabled={item.quantity <= 1}>-</button>
                  <span className="text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 rounded text-sm">+</button>
                </div>
                <p className="text-sm text-gray-600 mt-1">Rs. {item.price.toFixed(2)} each</p>
                <button className="text-blue-600 underline text-xs mt-1"
                  onClick={() => removeItem(item.id)}>Remove</button>
              </div>
              <p className="ml-4 font-medium">Rs. {(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}

          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between"><span>Subtotal</span><span>Rs. {subtotal.toFixed(2)}</span></div>
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
            <div className="flex justify-between"><span>Service Fee (5%)</span><span>Rs. {serviceFee.toFixed(2)}</span></div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>TOTAL</span><span>Rs. {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-6 text-sm">
            <label className="flex items-center gap-2 mb-2">
              <input type="radio" name="payment" value="payzy" checked={paymentMethod === 'payzy'} onChange={e => setPaymentMethod(e.target.value)} />
              Payzy Installments
            </label>
            <label className="flex items-center gap-2 mb-2">
              <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={e => setPaymentMethod(e.target.value)} />
              Pay by Card
            </label>
            <label className="flex items-center gap-2 mb-2">
              <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={e => setPaymentMethod(e.target.value)} />
              Cash on Delivery
            </label>
            <label className="flex items-center gap-2 mb-4">
              <input type="radio" name="payment" value="bank" checked={paymentMethod === 'bank'} onChange={e => setPaymentMethod(e.target.value)} />
              Direct Bank Transfer
            </label>
          </div>

          <label className="flex items-start gap-2 text-sm mb-4">
            <input type="checkbox" /> <span>I agree to the terms and conditions</span>
          </label>

          <button
            className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800"
            onClick={handlePlaceOrder}>
            PLACE ORDER
          </button>

          <p className="text-xs text-center mt-4 text-gray-500">Your payment is 100% secure.</p>
        </div>
      </div>
    </div>
  );
}

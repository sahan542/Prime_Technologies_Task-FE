'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import {
  updateQuantity,
  removeFromCart,
  clearCart,
  selectCartTotal,
} from '@/store/slices/cartSlice';
import Image from 'next/image';

export default function CartView() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const total = useSelector(selectCartTotal);

  const handleQtyChange = (id: string, quantity: number) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center gap-4">
                <Image src={item.img} alt={item.name} width={80} height={80} />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>Rs. {item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleQtyChange(item.id, item.quantity - 1)}
                      className="border px-2 py-1"
                    >–</button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                      className="border px-2 py-1"
                    >+</button>
                  </div>
                </div>
              </div>
              <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500">Remove</button>
            </div>
          ))}

          <div className="text-right mt-6">
            <p className="text-lg font-bold">Total: Rs. {total.toFixed(2)}</p>
            <button onClick={() => dispatch(clearCart())} className="mt-4 text-red-600 underline">
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

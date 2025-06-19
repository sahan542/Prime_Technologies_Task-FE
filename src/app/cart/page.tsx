'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
} from '@/store/slices/cartSlice';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import SignInModal from '../../components/modals/SignInModal';
import axios from 'axios';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  img: string; 

}


export default function CartPage() {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [isModalOpen, setIsModalOpen] = useState(false);
  // const userId = 1; // Replace with dynamic user id from auth if needed

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartItems();
    }
  }, [isAuthenticated]);

const fetchCartItems = async () => {
  try {
    const response = await axios.get(`http://localhost:8000/cart/1`);
    const items = response.data.items;
    console.log('response console:', response);

    dispatch(clearCart()); // Clear previous state before syncing

    items.forEach((item: any) => {
      // Dispatch the cart item with the required properties
      dispatch(
        addToCart({
          id: item.product_id.toString(), // product_id is required, and you should use this
          name: item.name || 'Product',
          price: item.price || 0,
          quantity: item.quantity,
          img: item.img || '', // include image
          product_id: item.product_id, // Include the missing product_id
          slug: item.slug || '', // Include the missing slug (assuming the backend provides it)
        })
      );
    });
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};


  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleCartAction = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    } else {
      router.push('/checkout');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <button
        onClick={handleClearCart}
        className="bg-red-600 text-white px-6 py-2 rounded mb-6"
      >
        Clear Cart
      </button>

      {cartItems.length === 0 ? (
        <p className="text-black">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item: CartItem) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4 mb-4"
            >
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold text-lg text-black">
                    {item.name}
                  </h3>
                  <p className="text-black">Price: ${item.price}</p>
                  <p className="text-black">Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity - 1)
                    }
                    className="bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    –
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleUpdateQuantity(item.id, item.quantity + 1)
                    }
                    className="bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6">
        <div className="flex justify-between items-center font-semibold">
          <span className="text-black">Total Items:</span>
          <span className="text-black">{cartItems.length}</span>
        </div>
        <div className="flex justify-between items-center font-semibold mt-2">
          <span className="text-black">Total Price:</span>
          <span className="text-black">
            $
            {cartItems
              .reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )
              .toFixed(2)}
          </span>
        </div>
      </div>

      <SignInModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </div>
  );
}

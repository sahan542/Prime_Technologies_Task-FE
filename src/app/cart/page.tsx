'use client';  // Next.js specific for client-side rendering

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addToCart, removeFromCart, clearCart, updateQuantity } from '@/store/slices/cartSlice';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import SignInModal from '../../components/modals/SignInModal'; 

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [isModalOpen, setIsModalOpen] = useState(false); 

  // Function to handle adding an item to the cart
  const handleAddToCart = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  // Function to handle removing an item from the cart
  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  // Function to handle clearing the cart
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Function to update the quantity of an item in the cart
  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return; // Prevent negative quantities
    dispatch(updateQuantity({ id, quantity }));
  };

  // Open the SignIn modal if the user is not authenticated
  const handleCartAction = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);  // Show the modal if not authenticated
    } else {
      router.push('/checkout');  // Navigate to checkout if authenticated
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {/* Button to clear the entire cart */}
      <button
        onClick={handleClearCart}
        className="bg-red-600 text-white px-6 py-2 rounded mb-6"
      >
        Clear Cart
      </button>

      {/* Display message if cart is empty */}
      {cartItems.length === 0 ? (
        <p className='text-black'>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {/* Render each item in the cart */}
          {cartItems.map((item: CartItem) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4 mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-black">{item.name}</h3>
                <p className='text-black'>Price: ${item.price}</p>
                <p className='text-black'>Quantity: {item.quantity}</p>
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
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    className="bg-yellow-600 text-white px-4 py-2 rounded"
                  >
                    –
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
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

      {/* Display cart totals */}
      <div className="mt-6">
        <div className="flex justify-between items-center font-semibold">
          <span className='text-black'>Total Items:</span>
          <span className='text-black'>{cartItems.length}</span>
        </div>
        <div className="flex justify-between items-center font-semibold mt-2">
          <span className='text-black'>Total Price:</span>
          <span className='text-black'>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
        </div>
      </div>

      {/* Show SignInModal if not authenticated */}
      <SignInModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </div>
  );
}

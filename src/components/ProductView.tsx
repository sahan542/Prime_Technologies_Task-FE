'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import productsData from '@/data/productsData';
import { notFound } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, updateQuantity } from '../store/slices/cartSlice';  // Import the addToCart action
import SignInModal from '../components/modals/SignInModal';  // Import the SignInModal component

interface ProductViewProps {
  slug: string;
}

export default function ProductView({ slug }: ProductViewProps) {
  const product = productsData.find((p) => p.slug === slug);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);  // Modal visibility state

  if (!product) return notFound();  // Handle 404 when product is not found

const handleAddToCart = async () => {
  console.log("Add to Cart button clicked!");

  const isAuthenticated = localStorage.getItem('isAuthenticated');  // Check authentication status

  if (!isAuthenticated) {
    setIsModalOpen(true);  // Open the modal if not authenticated
  } else {
    const userId = 1;  // Replace with the actual user ID from your authentication system
    const cartItem = {
      product_id: product.id,  // Use the product's ID
      quantity: qty,  // Pass the current quantity
    };

    // Log the data being sent to backend
    console.log('Sending to backend:', cartItem);

    try {
      // Send the request to the backend
      const response = await fetch(`http://localhost:8000/cart/1/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),  // Send the cartItem payload
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Backend response:', data);  // Log the response from backend

        // Dispatch the action to update Redux state after successful backend call
        dispatch(addToCart({
          id: product.id.toString(),  // Ensure ID is string
          name: product.title,
          price: parseFloat(product.price),
          quantity: qty,  // Ensure the quantity is passed correctly
        }));
      } else {
        throw new Error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }
};


  // Function to handle changing the quantity
  const handleChangeQuantity = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQty(newQuantity);
      // Also update Redux store with the new quantity
      dispatch(updateQuantity({ id: product.id.toString(), quantity: newQuantity }));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);  // Close the modal
  };

  return (
    <div className="p-10 bg-white text-black max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image with Zoom */}
        <div className="relative border rounded-lg overflow-hidden group">
          <Image
            src={product.img}
            alt={product.title}
            width={600}
            height={600}
            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">SALE 20%</span>
          <span className="absolute bottom-2 left-2 bg-blue-700 text-white px-2 py-1 text-xs rounded">Imported from Australia</span>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-sm text-gray-600 mb-1">Categories: {product.category}</p>
          <p className="text-sm mb-3">🔥 {product.soldRecently} items sold in last 3 hours</p>

          <div className="mb-3">
            <span className="line-through text-gray-400 text-lg mr-2">Rs. {product.originalPrice}</span>
            <span className="text-blue-700 text-2xl font-bold">Rs. {product.price}</span>
          </div>

          {/* Quantity + Buttons */}
          <div className="flex items-center gap-4 mb-5">
            <button
              onClick={() => handleChangeQuantity(qty - 1)}
              className="border px-3 py-1"
            >
              –
            </button>
            <span>{qty}</span>
            <button
              onClick={() => handleChangeQuantity(qty + 1)}
              className="border px-3 py-1"
            >
              +
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={handleAddToCart}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              ADD TO CART
            </button>
            <button className="border px-6 py-2 rounded hover:bg-gray-100">
              Add to Wishlist
            </button>
          </div>

          {/* Benefits */}
          <div className="bg-gray-100 border border-gray-300 p-4 rounded">
            <h3 className="font-semibold text-lg mb-2">Benefits of {product.title}:</h3>
            <ul className="list-decimal pl-5 text-sm space-y-1">
              {product.benefits.map((b, i) => (
                <li key={i}><span dangerouslySetInnerHTML={{ __html: b.replace(/—/g, '<strong> —</strong>') }} /></li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Show SignInModal if not authenticated */}
      <SignInModal isOpen={isModalOpen} closeModal={closeModal} />
    </div>
  );
}

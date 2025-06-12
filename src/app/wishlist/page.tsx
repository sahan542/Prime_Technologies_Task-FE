// src/app/wishlist/page.tsx

'use client';  // Ensure this is a client-side component

import { useState, useEffect } from 'react';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);

  // Fetch wishlist data from local storage (or replace with a backend API later)
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlistItems(storedWishlist);
  }, []);

  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlistItems.filter((item: any) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));  // Update local storage
  };

  return (
    <div className="min-h-screen bg-white text-black px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div>
          {wishlistItems.map((item: any) => (
            <div key={item.id} className="border p-4 rounded mb-4">
              <h2>{item.title}</h2>
              <p>Price: Rs. {item.price}</p>
              <button onClick={() => removeFromWishlist(item.id)} className="text-red-600">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

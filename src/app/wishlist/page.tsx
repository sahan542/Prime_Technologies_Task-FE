'use client';

import { useState, useEffect } from 'react';
import { HiShoppingBag } from 'react-icons/hi2';
import { MdDelete } from 'react-icons/md';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWishlistItems = () => {
      setLoading(true);
      try {
        const storedWishlist = localStorage.getItem('wishlist');
        if (storedWishlist) {
          const wishlist = JSON.parse(storedWishlist);
          setWishlistItems(wishlist);
        } else {
          setWishlistItems([]);
        }
      } catch (error: any) {
        setError(error.message);
        console.error('Error fetching wishlist from localStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistItems();
  }, []);

  const removeFromWishlist = (id: string) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const moveToCart = (item: any) => {
  // Remove from wishlist
  const updatedWishlist = wishlistItems.filter((i) => i.id !== item.id);
  setWishlistItems(updatedWishlist);
  localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

  // Add to cart
  const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
  const updatedCart = [...existingCart, item];
  localStorage.setItem('cart', JSON.stringify(updatedCart));
};


  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-white text-black px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-[#7b1f4b]">Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="flex items-center justify-center">Your wishlist is empty.</p>
      ) : (
        <div>
          {wishlistItems.map((item: any) => (
            <div
              key={item.id}
              className="border p-4 rounded mb-4 flex justify-between items-center"
            >
              {/* Product Info */}
              <div className="flex items-center">
                <img src={item.img} alt={item.name} className="w-24 h-24 object-cover mr-4" />
                <div>
                  <h2 className="font-semibold text-xl">{item.name}</h2>
                  <p className="text-sm text-gray-600">Price: Rs. {item.price}</p>
                  <p className="text-sm text-gray-600">In Stock</p>
                </div>
              </div>

              {/* Desktop: Buttons */}
              <div className="hidden sm:flex flex-col gap-2 items-end">
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-[#7b1f4b] border p-2 rounded"
                >
                  Remove
                </button>
                <button className="bg-[#7b1f4b] text-white px-4 py-2 rounded" onClick={() => moveToCart(item)}>
                  Add to Cart
                </button>
              </div>

              {/* Mobile: Icons */}
              <div className="flex sm:hidden flex-col gap-2 items-end">
                <div
                  onClick={() => console.log('Add to cart logic here')}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg cursor-pointer"
                >
                  <HiShoppingBag className="text-2xl text-[#7b1f4b]" onClick={() => moveToCart(item)}/>
                </div>
                <div
                  onClick={() => removeFromWishlist(item.id)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg cursor-pointer"
                >
                  <MdDelete className="text-2xl text-[#7b1f4b]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4">
        <button className="bg-black text-white px-6 py-2 rounded">Add All to Cart</button>
      </div>
    </div>
  );
}

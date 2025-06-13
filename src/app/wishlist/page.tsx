'use client';  // Ensure this is a client-side component

import { useState, useEffect } from 'react';

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);  // State to store wishlist items
  const [loading, setLoading] = useState<boolean>(true);  // Loading state to show a loading indicator

  // Fetch wishlist data from the backend API
  useEffect(() => {
    const fetchWishlistItems = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/wishlist/?user_id=1');  // API endpoint to get wishlist items
        const data = await response.json();  // Parse JSON response
        
        if (response.ok) {
          setWishlistItems(data);  // Set the fetched wishlist items into state
        } else {
          console.error('Failed to fetch wishlist items');
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false);  // Set loading to false once the request is complete
      }
    };

    fetchWishlistItems();  // Call the function to fetch wishlist items on component mount
  }, []);  // Empty dependency array ensures this runs only once when the component is mounted

  const removeFromWishlist = async (id: string) => {
    // Call API to remove item from the wishlist (Optional: backend logic to remove item from the database)
    try {
      const response = await fetch(`http://localhost:8000/api/wishlist/remove/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove item from state after successful removal
        setWishlistItems(wishlistItems.filter((item) => item.id !== id));
      } else {
        console.error('Failed to remove item from wishlist');
      }
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  // Show loading state or actual content based on the loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white text-black px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div>
          {wishlistItems.map((item: any) => (
            <div key={item.id} className="border p-4 rounded mb-4">
              <h2 className="font-semibold text-xl">{item.title}</h2>
              <p className="text-sm text-gray-600">Price: Rs. {item.price}</p>
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="text-red-600 mt-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

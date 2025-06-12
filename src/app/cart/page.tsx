'use client';  // Mark as client component

import { useDispatch, useSelector } from 'react-redux'; 
import { useRouter } from 'next/navigation';
import { addToCart, removeFromCart, clearCart } from '@/store/cartSlice';
import { RootState } from '@/store/store'; 
import { useAuth } from '@/context/AuthContext'; 

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

  // Redirect to signin page if not authenticated
  if (!isAuthenticated) {
    router.push('/signin');
    return <div>Redirecting...</div>;
  }

  // Dispatch add item to cart action
  const handleAddToCart = (item: CartItem) => {
    dispatch(addToCart(item));
  };

  // Dispatch remove item from cart action
  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  // Dispatch clear cart action
  const handleClearCart = () => {
    dispatch(clearCart());
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
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {/* Render each item in the cart */}
          {cartItems.map((item: CartItem) => (
            <div key={item.id} className="flex justify-between items-center border-b pb-4 mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add One More
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Display cart totals */}
      <div className="mt-6">
        <div className="flex justify-between items-center font-semibold">
          <span>Total Items:</span>
          <span>{cartItems.length}</span>
        </div>
        <div className="flex justify-between items-center font-semibold mt-2">
          <span>Total Price:</span>
          <span>${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

// src/components/CartPanel.tsx
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { removeFromCart } from '../store/slices/cartSlice';

const CartPanel = ({ isOpen, toggleCart }: { isOpen: boolean, toggleCart: () => void }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items); // Get cart items from state
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 w-80`}>
      <button onClick={toggleCart} className="absolute top-4 left-4 bg-gray-300 p-2 rounded-full">X</button>
      <div className="p-6">
        <h2 className="text-2xl mb-4">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4">
                <p>{item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: Rs. {item.price.toFixed(2)}</p>
                <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-500">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CartPanel;

// src/components/Cart/CartSummary.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const CartSummary = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  return (
    <div>
      <h2>Cart Summary</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.quantity} x ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartSummary;

// src/store/hooks/useCart.ts

import { useAppSelector, useAppDispatch } from '@/store/hooks';  // Import the hooks from your hooks.ts file
import { RootState } from '@/store/store';
import { addToCart, removeFromCart, updateQuantity } from '@/store/slices/cartSlice';  // Import the actions

export const useCart = () => {
  const cart = useAppSelector((state: RootState) => state.cart); // Access the cart state
  const dispatch = useAppDispatch();

  const addItemToCart = (item: any) => {
    dispatch(addToCart(item));  // Dispatch addToCart action
  };

  const removeItemFromCart = (itemId: string) => {
    dispatch(removeFromCart(itemId));  // Dispatch removeFromCart action
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));  // Dispatch updateQuantity action
  };

  return { cart, addItemToCart, removeItemFromCart, updateItemQuantity };
};

// src/store/hooks/useCart.ts

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { addToCart, removeFromCart, updateQuantity, clearCart, updateShippingOption } from "@/store/reducers/cartSlice";

export const useCart = () => {
  // Accessing the state from Redux store
  const cart = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const addItem = (item) => {
    dispatch(addToCart(item));
  };

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const incrementQuantity = (productId) => {
    const item = cart.items.find((item) => item.product.id === productId);
    if (item) {
      dispatch(updateQuantity({ productId, quantity: item.quantity + 1 }));
    }
  };

  const decrementQuantity = (productId) => {
    const item = cart.items.find((item) => item.product.id === productId);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ productId, quantity: item.quantity - 1 }));
    }
  };

  const setShippingOption = (option) => {
    dispatch(updateShippingOption(option));
  };

  const clearCartItems = () => {
    dispatch(clearCart());
  };

  return {
    items: cart.items,
    count: cart.items.length,
    total: cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    isEmpty: cart.items.length === 0,
    isLoading: false,  // Assume no loading state for simplicity, modify if needed
    addItem,
    removeItem,
    incrementQuantity,
    decrementQuantity,
    setShippingOption,
    clearCartItems,
  };
};

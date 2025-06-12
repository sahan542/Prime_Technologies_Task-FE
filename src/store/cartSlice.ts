// src/store/cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // If the item already exists, increment its quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // If the item doesn't exist, add it to the cart
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      // Remove item from the cart by its id
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart(state) {
      // Clear all items from the cart
      state.items = [];
    },
  },
});

// Export the actions so you can use them in your components
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;

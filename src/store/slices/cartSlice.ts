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
      console.log("Adding to cart:", action.payload);

      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // If item exists, increment quantity by the new quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // Otherwise, add the new item to the cart
        state.items.push(action.payload);
      }

      console.log("Updated cart:", state.items); 
    },
    removeFromCart(state, action: PayloadAction<string>) {
      // Filter out the item by its ID from the cart
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart(state) {
      // Clear all items in the cart
      state.items = [];
    },
    updateQuantity(state, action: PayloadAction<{ id: string, quantity: number }>) {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        // Update the quantity of the item in the cart
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;

import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CartItem } from '@/types/cart';
import axios from 'axios';
import type { RootState } from '../store';

interface CartState {
  items: CartItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// Initial state with items loaded from localStorage if available
const initialState: CartState = {
  items: JSON.parse(localStorage.getItem('cartItems') || '[]'), // Load cart items from localStorage
  status: 'idle',
};

// Async thunk to sync a single item with backend
export const syncCartItem = createAsyncThunk(
  'cart/syncCartItem',
  async (
    { userId, item }: { userId: number; item: { product_id: number; quantity: number } },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`http://localhost:8000/cart/${userId}/add`, item);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
      // Save updated cart to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    
    // Update item quantity
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(i => i.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
      // Save updated cart to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    
    // Update item information
    updateItem: (state, action: PayloadAction<{ id: string; data: Partial<CartItem> }>) => {
      const { id, data } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) Object.assign(item, data);
      // Save updated cart to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    
    // Remove item from cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      // Save updated cart to localStorage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    
    // Clear the cart
    clearCart: (state) => {
      state.items = [];
      // Clear the cart from localStorage
      localStorage.removeItem('cartItems');
    },
    
    // Load cart items from localStorage at app startup
    setCartFromStorage: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCartItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(syncCartItem.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(syncCartItem.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  addToCart,
  updateQuantity,
  updateItem,
  removeFromCart,
  clearCart,
  setCartFromStorage,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.quantity, 0);

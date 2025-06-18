import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';  // ✅ Import RootState from the store file
import axios from 'axios';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  img: string; // Image URL or any other property
  slug: string; // Slug to uniquely identify the product
}

interface WishlistState {
  items: WishlistItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// Initial state
const initialState: WishlistState = {
  items: JSON.parse(localStorage.getItem('wishlist') || '[]'), // Load initial state from localStorage
  status: 'idle',
};

// Async thunk to sync wishlist item to backend
export const syncWishlistItem = createAsyncThunk(
  'wishlist/syncWishlistItem',
  async (
    { userId, item }: { userId: number; item: WishlistItem },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`http://localhost:8000/wishlist/add`, item); // Update URL as needed
      return response.data; // Assuming backend returns the updated wishlist item
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }
  }
);

// Async thunk to sync the entire wishlist to backend
// Async thunk to sync the entire wishlist to the backend
export const syncWishlist = createAsyncThunk(
  'wishlist/syncWishlist',
  async (
    { userId, wishlist }: { userId: number; wishlist: WishlistItem[] },
    thunkAPI
  ) => {
    try {
      // Loop through each item in the wishlist and sync it individually
      for (const item of wishlist) {
        const response = await axios.post(`http://localhost:8000/api/wishlist/`, {
          user_id: userId,    // User ID from the logged-in user
          product_id: item.id // Product ID from the wishlist item
        });
        // Optional: If you want to store the response or handle it
        if (response.status !== 200) {
          throw new Error('Failed to sync wishlist item');
        }
      }
      return { message: 'Wishlist synced successfully' }; // You can return any success message/data
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error?.response?.data || error.message);
    }
  }
);


const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<WishlistItem>) {
      // Check if the item already exists, otherwise add it
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      
      if (!existingItem) {
        state.items.push(action.payload); // Push the new product into the array
        // Persist updated wishlist to localStorage
        localStorage.setItem('wishlist', JSON.stringify(state.items));
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
      // Persist updated wishlist to localStorage
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    clearWishlist(state) {
      state.items = [];
      // Clear wishlist from localStorage
      localStorage.removeItem('wishlist');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncWishlistItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(syncWishlistItem.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(syncWishlistItem.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(syncWishlist.fulfilled, (state) => {
        // Optionally handle successful full wishlist sync
        state.status = 'succeeded';
      })
      .addCase(syncWishlist.rejected, (state) => {
        // Optionally handle failure of full wishlist sync
        state.status = 'failed';
      });
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;

// Selectors
export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistCount = (state: RootState) => state.wishlist.items.length;

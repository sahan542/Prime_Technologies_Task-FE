// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice'; // Make sure this file exists or remove if not used
import orderReducer from './orderSlice'; // Make sure this file exists or remove if not used

// Configure the Redux store with multiple slices (cart, wishlist, order)
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer, // Remove if not using wishlist
    order: orderReducer, // Remove if not using orders
  },
});

// RootState is the type of the entire Redux store state
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch is the type of the dispatch function from the store
export type AppDispatch = typeof store.dispatch;

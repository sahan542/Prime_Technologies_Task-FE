// // src/store/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './slices/cartSlice';
// import productsReducer from './slices/productsSlice';
// import autoSaveUserData from './autoSaveMiddleware';

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     products: productsReducer, // ✅ Added product slice
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(autoSaveUserData),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import wishlistReducer from './slices/wishlistSlice'; // ✅ Import wishlist slice
import userReducer from './slices/userSlice'; // ✅ Import user slice
import autoSaveUserData from './autoSaveMiddleware';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    wishlist: wishlistReducer,  // ✅ Add wishlist slice
    user: userReducer,          // ✅ Add user slice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(autoSaveUserData),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

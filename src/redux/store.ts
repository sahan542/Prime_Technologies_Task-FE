import authReducer from "@/redux/reducers/authSlice";
import cartReducer from "@/redux/reducers/cartSlice";
import wishlistReducer from "@/redux/reducers/wishlistSlice";
import productsReducer from "@/redux/reducers/productsSlice"; 
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import { createExpireStorage } from "./expireStorage.";

const persistConfig = {
  key: "moTeAuth",
  storage,
};
const cartPersistConfig = {
  key: "moTeCart",
  storage: createExpireStorage(2 * 24 * 60 * 60 * 1000), 
};
const wishlistPersistConfig = {
  key: "moTeWishlist",
  storage: createExpireStorage(7 * 24 * 60 * 60 * 1000),
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const persistedWishlistReducer = persistReducer(
  wishlistPersistConfig,
  wishlistReducer
);

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,
    products: productsReducer
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

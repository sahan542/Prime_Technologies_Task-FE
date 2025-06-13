// src/store/autoSaveMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';

const autoSaveUserData: Middleware = store => next => action => {
  const result = next(action);

  // Save cart state to localStorage whenever it's updated
  const cart = store.getState().cart.items;
  localStorage.setItem('cart', JSON.stringify(cart));

  return result;
};

export default autoSaveUserData;

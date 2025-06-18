import { Middleware } from '@reduxjs/toolkit';

const autoSaveUserData: Middleware = store => next => action => {
  const result = next(action);

  // Save cart state to localStorage whenever it's updated
  const cart = store.getState().cart.items;
  localStorage.setItem('cart', JSON.stringify(cart));

  // Save wishlist state to localStorage whenever it's updated
  const wishlist = store.getState().wishlist.items;
  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  // Save user data (token and user info) to localStorage whenever it's updated
  const user = store.getState().user;
  if (user.token) {
    localStorage.setItem('userToken', user.token);
    localStorage.setItem('userInfo', JSON.stringify(user.userInfo)); // Optional: Save user profile
  } else {
    // Remove user data from localStorage if logged out
    localStorage.removeItem('userToken');
    localStorage.removeItem('userInfo');
  }

  return result;
};

export default autoSaveUserData;


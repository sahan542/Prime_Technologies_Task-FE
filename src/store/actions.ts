// src/store/actions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ searchQuery, selectedCategories, selectedBrands, priceRange }: any) => {
    const response = await fetch(`/api/products?search=${searchQuery}&categories=${selectedCategories.join(',')}&brands=${selectedBrands.join(',')}&priceMin=${priceRange[0]}&priceMax=${priceRange[1]}`);
    return response.json();
  }
);

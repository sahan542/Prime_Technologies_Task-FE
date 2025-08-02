import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  original_price: number;
  category: string;
  brand: string;
  img: string;
  sold_recently: number;
  benefits: string[];
  created_at: string;
  updated_at: string;
}

interface ProductState {
  items: Product[];
  total: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  total: 0,
  status: 'idle',
  error: null,
};

interface ProductFilters {
  category?: string[];
  brand?: string[];
  min_price?: number;
  max_price?: number;
}

const BASE_URL = 'http://localhost:8000/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (filters: {
    category?: string[];
    brand?: string[];
    min_price?: number;
    max_price?: number;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const params = new URLSearchParams();

    if (filters.category?.length) {
      filters.category.forEach((c) => params.append('category', c));
    }
    if (filters.brand?.length) {
      filters.brand.forEach((b) => params.append('brand', b));
    }
    if (filters.min_price !== undefined) {
      params.append('min_price', filters.min_price.toString());
    }
    if (filters.max_price !== undefined) {
      params.append('max_price', filters.max_price.toString());
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    if (filters.page !== undefined) {
      params.append('page', filters.page.toString());
    }
    if (filters.limit !== undefined) {
      params.append('limit', filters.limit.toString());
    }

    const res = await axios.get(`http://localhost:8000/api/products?${params.toString()}`);
    return res.data;
  }
);




const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export default productsSlice.reducer;

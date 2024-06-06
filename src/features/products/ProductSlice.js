import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (limit) => {
  const response = await axios.get(`https://fakestoreapi.com/products?limit=${limit}`);
  const localProducts = JSON.parse(localStorage.getItem('localProducts')) || [];
  return [...response.data, ...localProducts];
});

export const addProduct = createAsyncThunk('products/addProduct', async (product, { dispatch }) => {
  const localProducts = JSON.parse(localStorage.getItem('localProducts')) || [];
  const newProduct = { ...product, id: Date.now() };
  localProducts.push(newProduct);
  localStorage.setItem('localProducts', JSON.stringify(localProducts));
  return newProduct;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
  const response = await axios.put(`https://fakestoreapi.com/products/${product.id}`, product);
  return response.data;
});

export const updateLocalProduct = createAsyncThunk('products/updateLocalProduct', async (product) => {
  const localProducts = JSON.parse(localStorage.getItem('localProducts')) || [];
  const index = localProducts.findIndex(p => p.id === product.id);
  if (index !== -1) {
    localProducts[index] = product;
    localStorage.setItem('localProducts', JSON.stringify(localProducts));
  }
  return product;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
  await axios.delete(`https://fakestoreapi.com/products/${id}`);
  return id;
});

export const deleteLocalProduct = createAsyncThunk('products/deleteLocalProduct', async (id) => {
  let localProducts = JSON.parse(localStorage.getItem('localProducts')) || [];
  localProducts = localProducts.filter(product => product.id !== id);
  localStorage.setItem('localProducts', JSON.stringify(localProducts));
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateLocalProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(product => product.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(product => product.id !== action.payload);
      })
      .addCase(deleteLocalProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(product => product.id !== action.payload);
      });
  }
});

export default productsSlice.reducer;

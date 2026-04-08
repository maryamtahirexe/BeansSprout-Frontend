import { createSlice } from '@reduxjs/toolkit';

const saved = localStorage.getItem('beanssprout_cart');
const initialState = { items: saved ? JSON.parse(saved) : [] };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(i => i._id === action.payload._id);
      if (existing) { existing.quantity += 1; }
      else           { state.items.push({ ...action.payload, quantity: 1 }); }
      localStorage.setItem('beanssprout_cart', JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i._id !== action.payload);
      localStorage.setItem('beanssprout_cart', JSON.stringify(state.items));
    },
    increment: (state, action) => {
      const item = state.items.find(i => i._id === action.payload);
      if (item) item.quantity += 1;
      localStorage.setItem('beanssprout_cart', JSON.stringify(state.items));
    },
    decrement: (state, action) => {
      const item = state.items.find(i => i._id === action.payload);
      if (item && item.quantity > 1) { item.quantity -= 1; }
      else { state.items = state.items.filter(i => i._id !== action.payload); }
      localStorage.setItem('beanssprout_cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem('beanssprout_cart');
    },
  },
});

export const { addToCart, removeFromCart, increment, decrement, clearCart } = cartSlice.actions;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export default cartSlice.reducer;
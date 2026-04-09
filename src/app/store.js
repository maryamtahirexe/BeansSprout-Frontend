import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import menuReducer from '../features/menu/menuSlice';
import ordersReducer from '../features/orders/ordersSlice';
import { injectStore } from '../services/api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    menu: menuReducer,
    orders: ordersReducer,
  },
});

// ✅ Give api.js a reference to the store AFTER it is created.
// This breaks the circular dependency — api never imports store directly.
injectStore(store);
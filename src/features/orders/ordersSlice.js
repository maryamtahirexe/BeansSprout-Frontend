import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const placeOrder = createAsyncThunk(
  'orders/place',
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/api/orders', orderData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to place order' });
    }
  }
);

export const fetchMyOrders = createAsyncThunk(
  'orders/fetchMine',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/api/orders/my');
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOne',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/api/orders/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

// Admin
export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/api/admin/orders');
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await api.patch(`/api/admin/orders/${id}/status`, { status });
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    myOrders: [],
    allOrders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => { state.currentOrder = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.myOrders.unshift(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(fetchMyOrders.pending, (state) => { state.loading = true; })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state) => { state.loading = false; })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.allOrders = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updated = action.payload;
        const idx = state.allOrders.findIndex((o) => o._id === updated._id);
        if (idx !== -1) state.allOrders[idx] = updated;
      });
  },
});

export const { clearCurrentOrder } = ordersSlice.actions;
export const selectMyOrders = (state) => state.orders.myOrders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectAllOrders = (state) => state.orders.allOrders;
export const selectOrdersLoading = (state) => state.orders.loading;
export default ordersSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchMenu = createAsyncThunk(
  'menu/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get('/api/menu');
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: 'Failed to fetch menu' });
    }
  }
);

export const createMenuItem = createAsyncThunk(
  'menu/create',
  async (itemData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/api/menu', itemData);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const updateMenuItem = createAsyncThunk(
  'menu/update',
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/api/menu/${id}`, updates);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

export const deleteMenuItem = createAsyncThunk(
  'menu/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/menu/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data);
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    loading: false,
    error: null,
    activeCategory: 'all',
    searchQuery: '',
  },
  reducers: {
    setActiveCategory: (state, action) => { state.activeCategory = action.payload; },
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(createMenuItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateMenuItem.fulfilled, (state, action) => {
        const idx = state.items.findIndex((i) => i._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteMenuItem.fulfilled, (state, action) => {
        state.items = state.items.filter((i) => i._id !== action.payload);
      });
  },
});

export const { setActiveCategory, setSearchQuery } = menuSlice.actions;

export const selectAllMenuItems = (state) => state.menu.items;
export const selectMenuLoading = (state) => state.menu.loading;
export const selectActiveCategory = (state) => state.menu.activeCategory;
export const selectSearchQuery = (state) => state.menu.searchQuery;

export const selectFilteredItems = (state) => {
  const { items, activeCategory, searchQuery } = state.menu;
  return items.filter((item) => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });
};

export default menuSlice.reducer;

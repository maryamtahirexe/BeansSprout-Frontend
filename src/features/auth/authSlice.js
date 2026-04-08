import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/login', async (creds, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/api/auth/login', creds, { withCredentials: true });
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

export const signupUser = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post('/api/auth/signup', userData, { withCredentials: true });
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {
    logout: (state) => { state.user = null; state.token = null; },
    setCredentials: (state, action) => {
      state.user  = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending,   (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user    = action.payload.user;
        state.token   = action.payload.token;
      })
      .addCase(loginUser.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload?.message;
      })
      .addCase(signupUser.pending,   (state) => { state.loading = true; })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user    = action.payload.user;
        state.token   = action.payload.token;
      })
      .addCase(signupUser.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload?.message;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
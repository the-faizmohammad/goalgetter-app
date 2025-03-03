import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/current_user');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Failed to fetch user');
  }
});

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post('/login', credentials);
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Login failed');
  }
});

export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('/register', { user: userData });
    return response.data.message;
  } catch (error) {
    return rejectWithValue(error.response?.data?.error || 'Signup failed');
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  localStorage.removeItem('token');
  dispatch(authSlice.actions.resetAuth());
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, error: null, loading: false },
  reducers: {
    resetAuth: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signup.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default authSlice.reducer;
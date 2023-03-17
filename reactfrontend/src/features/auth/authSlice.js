import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; // A slice is a portion of the Redux store that is dedicated to managing a specific part of the application state, this includes reducers and actions relevant to that state.
import authService from './authService';

// Get user from localStorage(local storage can only have strings)
const user = JSON.parse(localStorage.getItem('user'));


// Create our initial state
const initialState = {
  user: user ? user : null, // If there's a user
  isError: false, // If we get an error from the server
  isSuccess: false,
  isLoading: false,
  message: ''
};

// Reducers are functions that define initial state and update the state but do not modify the current state directly, it creates a new state object with necessary changes

// Declare the promised register data. createAsyncThunk spimplifies the process of creating an async action creators and automatically handles the dispatching of actions for different stages of async operations, "pending", "fulfilled", and "rejected"
export const register = createAsyncThunk(
  'auth/register',
  async(user, thunkAPI) => {
    // Await the promised registration request and try to return the value
    try {
      return await authService.register(user)
    } catch (error) { // Many places that the error could come from in the back end, that's why there are so many conditions.
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    };
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async(user, thunkAPI) => {
    // Await the promised registration request and try to return the value
    try {
      return await authService.login(user)
    } catch (error) { // Many places that the error could come from in the back end, that's why there are so many conditions.
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    };
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => { //no payload or dispatch, since it will simply delete the user localStorage data
    authService.logout();
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => { // This reducer resets the state once we're done using it.
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },

  // Authentication reducers
  extraReducers: (builder) => {
    builder
      // Registration
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
  },
})

export const { reset } = authSlice.actions // export reset reducer from above
export default authSlice.reducer
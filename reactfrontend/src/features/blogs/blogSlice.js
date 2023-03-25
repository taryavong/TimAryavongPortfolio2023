import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"; 
import blogService from "./blogService";

const initialState = {
  blogs:[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new blog
export const createBlog = createAsyncThunk(
  'blogs/create',
  async (blogData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await blogService.createBlog(blogData, token);
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user blogs
export const getBlogs = createAsyncThunk(
  'blogs/getAll',
  async (_, thunkAPI) => {
  try { // this code is commented out because it caused an issue where the dashboard would keep checking for a token which was always null and it would loop infinitely
    // const token = thunkAPI.getState().auth.user.token;
    // console.log("token get"+ token)

    // return await blogService.getBlogs(token);
    console.log("getBlogs called");
    const user = thunkAPI.getState().auth.user;
    
    // instead of infinitly awaiting a promise that would attempt to getBlogs from a null token, check that there's no user and exit getBlogs if null
    if (!user) {
      console.log("User not available");
      return;
    };
    
    const token = user.token;
    const response = await blogService.getBlogs(token);
    console.log("getBlogs response:", response);
    return response;
  } catch (error) {
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

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.blogs.push(action.payload)
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.blogs = action.payload
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
});

export const { reset } = blogSlice.actions;
export default blogSlice.reducer;
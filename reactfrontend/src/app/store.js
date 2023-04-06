import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import blogReducer from '../features/blogs/blogSlice'
import openaiReducer from "../features/openAi/openAiSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs:blogReducer,
    openai: openaiReducer
  },
});

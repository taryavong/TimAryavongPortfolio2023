import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import openaiService from "./openAiService";

const initialState = {
  generatedText: "generatedText: default",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "message: default",
};

// Generate text using OpenAI API
export const generateText = createAsyncThunk(
  "openai/generateText",
  async (promptParameters, thunkAPI) => {
    try {
      return await openaiService.generateText(promptParameters);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const openaiSlice = createSlice({
  name: "openai",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateText.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(generateText.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.generatedText = action.payload;
      })
      .addCase(generateText.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = openaiSlice.actions;
export default openaiSlice.reducer;

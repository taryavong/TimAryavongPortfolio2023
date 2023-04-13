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
  async (prompt, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const promptParameters = {
        text: prompt,
      };
      const generatedText = await openaiService.generateText(promptParameters, token);
      console.log('Generated text:', generatedText); // Add this line

      return generatedText;

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
        console.log("generateText pending"); // Add this line
        state.isLoading = true;
      })
      .addCase(generateText.fulfilled, (state, action) => {
        console.log("generateText fulfilled"); // Add this line
        console.log("Payload (fulfilled):", action.payload); // Add this line
        state.isLoading = false;
        state.isSuccess = true;
        state.generatedText = action.payload;
      })
      .addCase(generateText.rejected, (state, action) => {
        console.log("generateText rejected"); // Add this line
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = openaiSlice.actions;
export default openaiSlice.reducer;

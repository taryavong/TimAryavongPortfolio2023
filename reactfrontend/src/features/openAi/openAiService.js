import axios from "axios";

const API_URL = "/api/openai/";

const generateText = async (promptParameters) => {
  try {
    const response = await axios.post(API_URL, promptParameters);
    return response.data.generatedText;
  } catch (error) {
    console.error("Error generating text:", error); // Add this line
    throw error;
  }
};


const openaiService = {
  generateText,
};

export default openaiService;

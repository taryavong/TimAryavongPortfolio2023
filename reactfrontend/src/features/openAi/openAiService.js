import axios from "axios";

const API_URL = "/api/openai/";

const generateText = async (promptParameters, token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    };
    console.log("promptParameters:", promptParameters); // Add this line

    const response = await axios.post(API_URL, promptParameters, config);
    console.log(response);
    console.log("Response data:", response.data); // Add this line

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

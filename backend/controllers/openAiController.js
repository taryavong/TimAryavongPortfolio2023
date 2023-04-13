const asyncHandler = require("express-async-handler");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

// @desc    Generate text based on user prompts
// @route   POST /api/openai/generate
// @access  Private
const generateText = asyncHandler(async (req, res) => {
  console.log("empty?", req.body.text);
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  try {
    const prompt = req.body.text;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
      // n: 1,
      // stop: null,
      // temperature: 1.0,
    });

    const generatedText = response.data.choices[0].text;
    console.log("Generated text (server):", generatedText);

    res.status(200).json({ generatedText });
  } catch (error) {
    res.status(500);
    throw new Error("Error generating text with OpenAI API");
  }
});

module.exports = {
  generateText,
};

const asyncHandler = require("express-async-handler");
const openai = require("openai");

// Configure OpenAI API key
openai.apiKey = process.env.OPENAI_API_KEY;

// @desc    Generate text based on user prompts
// @route   POST /api/openai/generate
// @access  Private
const generateText = asyncHandler(async (req, res) => {
  console.log(req.body.text);
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  try {
    const prompt = req.body.text;
    const response = await openai.Completion.create({
      engine: "davinci-codex",
      prompt: prompt,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 1.0,
    });

    const generatedText = response.choices[0].text.trim();

    res.status(200).json({ generatedText });
  } catch (error) {
    res.status(500);
    throw new Error("Error generating text with OpenAI API");
  }
});

module.exports = {
  generateText,
};

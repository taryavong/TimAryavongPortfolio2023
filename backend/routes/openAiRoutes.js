const express = require('express'); // Import express
const router = express.Router(); // Import the express router
const { generateText } = require('../controllers/openAiController'); // Import the controller function
const { protect } = require('../middleware/authMiddleware'); // Import the middleware for protecting routes

// Define the route for generating text using OpenAI API
router.post('/', protect, generateText);

module.exports = router; // Export the routes

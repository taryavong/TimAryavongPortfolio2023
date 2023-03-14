const express = require('express'); //Import express
const router = express.Router(); // import the express controller
const { // import the controls
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); 

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);


module.exports = router; // export the routes
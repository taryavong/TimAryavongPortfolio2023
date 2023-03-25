//this middleware is use to proctect routes
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//notice the 'next' argument, this middleware must be passed control before it will function
const protect = asyncHandler(async (req, res, next ) =>{
  let token;

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header, split at space and take the second string in the split
      token = req.headers.authorization.split(' ')[1];

      // Verify token against the one in our ENV
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token, see the userController for where the id was set
      // without the hashed password
      req.user = await User.findById(decoded.id).select('-password');

      // next() is used in JS for middleware functions, they are invoked before the final request handler is called
      // they perform logging, authentication, and error handling, to pass control to the next middleware function.
      // if next is not called, the request will be left hanging and the response will not be sent.
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error('Not Authorized');
    };
  };
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  };
});

module.exports = { 
  protect,
};
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const User = require('../models/userModel');

// @desc    Authenticate
// @rout    POST /api/users
// @access  Public
const registerUser = asyncHandler( async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields')
  };

  //check if the user exists via. their email
  const userExists = await User.findOne({email});

  if(userExists) {
    res.status(400);
    throw new Error('User already exists');
  };

  // Hash password
  const salt = await bcrypt.genSalt(10); // salt is a randomly generated key used in encryption of data
  const hashedPassword = await bcrypt.hash(password, salt); // encrypt the password

  // declare user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if(user) { //if user, set the user in the db, and respond 201, else throw error
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  };
});


// @desc    Login new user
// @rout    POST /api/users
// @access  Public
const loginUser = asyncHandler( async (req, res) => {
  const {email, password} = req.body;

  // check db for email
  const user = await User.findOne({email});

  // if the email exists in the db check the hashed password against the login password
  if(user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    };
 });

// @desc    Get user data
// @rout    GET /api/users/me
// @access  Private
const getMe = asyncHandler( async (req, res) => {
  const{ _id, name, email } = await User.findById(req.user.id);

  res.status(200).json({
    id: _id,
    name: name,
    email: email,
  })
});

// Generate JWT
const generateToken = ( id ) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET,{
    expiresIn: '30d',
  });
  console.log('Generated token:', token);
  return token;
  // return jwt.sign({ id }, process.env.JWT_SECRET, {
  //   expiresIn: '30d',
  // });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
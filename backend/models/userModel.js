const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add an name'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
},
{
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema)
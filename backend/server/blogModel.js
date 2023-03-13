const mongoose = require('mongoose');
//Mongoose is an object oriented package that allows devs to work with MongoDB

//Define the schema for the data in the blog DB
const blogSchema = mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Write a blog article.'],
    },
  },
  {
    timestamps: true,
  }
);

//export a blogSchema model and make sure it goes to the Blogs collection
module.exports = mongoose.model('Blog', blogSchema);
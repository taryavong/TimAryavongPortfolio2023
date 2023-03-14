//added asyncHandler - better performance, prevents app from freezing/becoming unresponsive, allows parallel operations
const asyncHandler = require("express-async-handler");

//add blog controller
const Blog = require('../models/blogModel');

// @desc    Get routes
// @rout    GET /api/goals
// @access  Private
const getBlogs = asyncHandler(async (req, res) => {
  const blog = await Blog.find({ user: req.user.id});

  res.status(200).json(blog)
});

// @desc    Set routes
// @rout    POST /api/goals
// @access  Private
const setBlog = asyncHandler(async(req, res) => {
  console.log(req.body.text) 
  if(!req.body.text){//require a blog object
    res.status(400)
    throw new Error('Please add a text field');
  };

  const blog = await Blog.create({//declare the text from inside the blog object
    text: req.body.text,
    user: req.user.id,
  })
  res.status(200).json(blog)
});

// @desc    Update routes
// @rout    PUT /api/goals:id
// @access  Private
const putBlog = asyncHandler(async(req, res) => {
  const blog = await Blog.findById(req.params.id);

  if(!blog) { //if there's no blog with this ID
    res.status(400);
    throw new Error('Blog not found.');
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, //get the blog and update it
    {
      new: true,
    });

  res.status(200).json(updatedBlog);
});

// @desc    Delete routes
// @rout    DELETE /api/goals/:id
// @access  Private
const deleteBlog =  asyncHandler(async(req, res) => {

  const blog = await Blog.findById(req.params.id);

  if(!blog) {
    res.status(400);
    throw new Error('Blog not found.');
  }

  // no need to assign to a variable like update since, the  json object will be deleted we won't see any new data
  //const deletedBlog = await Blog.findByIdAndRemove(req.params.id);
  await Blog.findByIdAndRemove(req.params.id);

  res.status(200).json(deletedBlog);
});

module.exports = { //export these controls
  getBlogs,
  setBlog,
  putBlog,
  deleteBlog
};
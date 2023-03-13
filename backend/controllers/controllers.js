//added asyncHandler - better performance, prevents app from freezing/becoming unresponsive, allows parallel operations
const asyncHandler = require("express-async-handler");

//add blog controller
const Blog = require('../server/blogModel');

// @desc    Get routes
// @rout    GET /api/goals
// @access  Private
const getRoutes = asyncHandler(async (req, res) => {
  const blog = await Blog.find();

  res.status(200).json(blog)
});

// @desc    Set routes
// @rout    POST /api/goals
// @access  Private
const setRoutes = asyncHandler(async(req, res) => {
  console.log(req.body.text) 
  if(!req.body.text){//require a blog object
    res.status(400)
    throw new Error('Please add a text field');
  };

  const blog = await Blog.create({//declare the text from inside the blog object
    text: req.body.text,
  })
  res.status(200).json(blog)
});

// @desc    Update routes
// @rout    PUT /api/goals:id
// @access  Private
const putRoutes = asyncHandler(async(req, res) => {
  const blog = await Blog.findById(req.params.id);

  if(!blog) { //if there's no blog with this ID
    res.status(400);
    throw new Error('Blog not found.');
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body,
    {
      new: true,
    });

  res.status(200).json(updatedBlog);
});

// @desc    Delete routes
// @rout    DELETE /api/goals/:id
// @access  Private
const deleteRoutes =  asyncHandler(async(req, res) => {
  res.status(200).json({message: `Delete route ${req.params.id}`});
});

module.exports = { //export these controls
  getRoutes,
  setRoutes,
  putRoutes,
  deleteRoutes
}
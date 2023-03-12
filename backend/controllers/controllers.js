//added asyncHandler - better performance, prevents app from freezing/becoming unresponsive, allows parallel operations

const asyncHandler = require("express-async-handler");
// @desc    Get routes
// @rout    GET /api/goals
// @access  Private
const getRoutes = asyncHandler(async (req, res) => {
  res.status(200).json({message: `get route`})
});

// @desc    Set routes
// @rout    POST /api/goals
// @access  Private
const postRoutes = asyncHandler(async(req, res) => {
  console.log(req.body.text)
  if(!req.body.text){//implemented one error handler, will implement more afterwards
    res.status(400)
    throw new Error('Please add a text field');
  };
  res.status(200).json({message: 'Set route'})
});

// @desc    Update routes
// @rout    PUT /api/goals:id
// @access  Private
const putRoutes = asyncHandler(async(req, res) => {
  res.status(200).json({message: `Update route ${req.params.id}`})
});

// @desc    Delete routes
// @rout    DELETE /api/goals/:id
// @access  Private
const deleteRoutes =  asyncHandler(async(req, res) => {
  res.status(200).json({message: `Delete route ${req.params.id}`})
});

module.exports = { //export these controls
  getRoutes,
  postRoutes,
  putRoutes,
  deleteRoutes
}
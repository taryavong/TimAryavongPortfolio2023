const express = require('express'); //import express. Note to self common.js syntax, compared to import express from 'express' ES2015 syntax for front end
const router = express.Router(); //import express router
const { // import the controls
  getBlogs,
  setBlog,
  putBlog,
  deleteBlog
} = require('../controllers/blogController');
const {protect} = require('../middleware/authMiddleware');

// The below lines of comments are to show the long form of code: CREDITS https://youtu.be/-0exw-9YJBo?t=1510 great tutorial
// router.post('/', setRoutes);
// router.put('/:id', putRoutes);
// router.delete('/:id', deleteRoutes);

// all routes now protected by middleware
router.route('/').get(protect, getBlogs).post(protect, setBlog);
router.route('/:id').delete(protect, deleteBlog).put(protect, putBlog);



module.exports = router; // export the routes
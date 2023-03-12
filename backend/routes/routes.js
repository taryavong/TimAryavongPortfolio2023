const express = require('express'); //import express. Note to self common.js syntax, compared to import express from 'express' ES2015 syntax for front end
const router = express.Router();
const { // import the controls
  getRoutes,
  postRoutes,
  putRoutes,
  deleteRoutes
} = require('../controllers/controllers');
// The below lines of comments are to show the long form of code: CREDITS https://youtu.be/-0exw-9YJBo?t=1510 great tutorial
// router.post('/', postRoutes);
// router.put('/:id', putRoutes);
// router.delete('/:id', deleteRoutes);

router.route('/').get(getRoutes).post(postRoutes);
router.route('/:id').delete(deleteRoutes).put(putRoutes);



module.exports = router; // export the routes
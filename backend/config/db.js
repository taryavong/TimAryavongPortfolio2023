const mongoose = require('mongoose');
//mongoose methods are asynchronous

const connectDB = async () => {
  try { //error handling the server connection
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error){
    console.log(error);
    process.exit(1);
  }
  
}

module.exports = connectDB; //export the server connection

// previously had these commented notes in an app.js file, this will also connect to the database
// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv').config();

// const app = express();
// const uri=process.env.MONGO_URI;

// //Place URI in .env file to be git ignored and retrieve username and password from there.
// // Connect to MongoDB
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('Could not connect to MongoDB', err));

// // Start server
// app.listen(3000, () => console.log('Server started'));
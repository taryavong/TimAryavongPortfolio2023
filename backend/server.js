const express = require('express'); //get express router
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const dotenv = require('dotenv').config(); //require this for URI in connectDB() 
const port = process.env.PORT || 5000;

connectDB();

const app = express();

//middleware for json and url encoded objects
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

// see tests.http for http requests
const express = require('express'); //get express router
const {errorHandler} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db')
const dotenv = require('dotenv').config(); //require this for URI in connectDB() 
const port = process.env.PORT || 5000;
const path = require('path');

connectDB();

const app = express();

//middleware for json and url encoded objects
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build'))); // react builds static assets here, dirname is current directory

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build','index.html')))// point any route aside from api routes to index.html
} else {
  app.get('/', (req,res) => res.send('Please set to production'))
}


app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

// see tests.http for http requests
const express = require('express'); //get express router
const {errorHandler} = require('../middleware/errorMiddleware');
const port = process.env.PORT || 5000;

const app = express();

//middleware for json and url encoded objects
app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', require('../routes/routes'))

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

// see tests.http for http requests
const errorHandler = (err, req, res, next) => { // if the handler gets a bad status code do the things
  const statusCode = res.statusCode ? res.statusCode : 500 // fancy ternary operator, if not code 500 

  res.status(statusCode);
  res.json({
    message: err.message,
    /*stack refers to the list of function calls that shows the
    sequence of functions that were called before an error
    if in production environment don't show the stack*/
    stack: process.env.NODE_ENV ==='production' ? null : err.stack, 
  })
}
/*this error handler will override the default handler
  having more control over the errors makes it easier as a dev
  to know what's wrong when something goes bad*/
module.exports = { 
  errorHandler,
}
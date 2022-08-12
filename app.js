var createError = require('http-errors');
var express = require('express');
var path = require('path');
const port = 3001;
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {sequelize} = require('./models');
var indexRouter = require('./routes/index');
const { resolveSoa } = require('dns');
// var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// middleware for serving static files 
app.use('/static', express.static('public'));

/* Get generated error route - create and throw 500 server error */ 
app.get('/routes', (req, res, next) => {
    res.render('user');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});


//test connection to the data base and sync the model 
app.use('/', indexRouter);
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
    await sequelize.sync();
  } catch(error) {
    console.error('Error connecting to the database: ', error);
    }
})();

// app.use('/userRoutes'); do for user





/* Error Handlers*///404 handler
app.use ((req, res, next) => {
  console.log ('404 error handler called');
  res.status(404).render('page-not-found');
});

//Global error handler 
app.use((err, req, res, next) => {
  if (err){
    console.log('Global error handler called', err);
  }
  if (err.status === 404){
    res.status(404).render('page-not-found',{err});
  } else {
    err.message = err.message || `Oops! It looks like something went wrong on the server.`;
    res.status(err.status|| 500).render('error',{err});
  }
});

module.exports = app;

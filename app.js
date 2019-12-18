// var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  
  const err = new Error('err');
  err.status = 404;
  res.render('books/page_not_found', {title: "Page Not Found"}); 
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500); 
    console.log('all the others')
  res.render("error"); 
});


module.exports = app;
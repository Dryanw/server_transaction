var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var amqp = require('amqplib/callback_api');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/winner',  cors(), function(req, res){
    let params = new URLSearchParams(url.parse(req.url).query);
    let address = params.get('address');
    console.log(`GET /winner: address=${address}`);
    amqp.connect('amqp://localhost', function(err0, connection) {
        if (err0) {console.log(err0);}
        connection.createChannel(function(err1, channel){
            if (err1) {console.log(err1);}
            channel.publish('winner', '', Buffer.from(address));
            console.log(`Sent ${address} through rmq`);
        });
    });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

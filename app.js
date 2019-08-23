var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var leaguesRouter = require('./routes/leagues');
var gameRouter = require('./routes/game');
var liveRouter = require('./routes/live');
var picksRouter = require('./routes/picks');
var bootstrapRouter = require('./routes/bootstrap');
var transactionsRouter = require('./routes/transactions')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/leagues', leaguesRouter);
app.use('/game', gameRouter);
app.use('/live', liveRouter);
app.use('/picks', picksRouter);
app.use('/bootstrap', bootstrapRouter);
app.use('/transactions', transactionsRouter);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

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

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
// 给 multipart 设置 options
//var multipartMiddle = multipart({uploadDir : __dirname + '/public/photos'});
var multipartMiddle = multipart();

var index = require('./routes/index');
var users = require('./routes/users');
var photos = require('./routes/photos.js');
var aibaoCash = require('./routes/abcash.js');
var photoRouter = require('./routes/photos/photos.js');

var app = express();

global.common = {
  system : require('os'),
	logger : require('tracer').colorConsole({
		format: '<{{title}}> {{file}}:{{line}} ({{method}}) {{message}}'
	})
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.disable('view cache');


// upload dir
app.set('photos', __dirname + '/public/photos');
// common data
app.set('title', 'Application');

app.use('/', index);
app.use('/users', users);
app.use('/pics', photoRouter.list);
app.use('/picsdn', photoRouter.download);
app.use('/picdn/:id/download', photoRouter.picDownload(app.get('photos')));
app.use('/abcash', aibaoCash);
app.get('/upload', photoRouter.form);
app.post('/upload', multipartMiddle, photoRouter.submit(app.get('photos')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

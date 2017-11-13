var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Import Controllers
let student = require('./routes/students');
let subjects = require('./routes/subjects');
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin",  "*");
    res.header('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Headers', "Content-Type, Authorization, Content-Length, X-Requested-With,X-Custom-Header,Origin");
    res.header('Access-Control-Allow-Credentials',"true");
    if ('OPTIONS' === req.method) {
        //respond with 200
        res.send(200);
    }
    else {
        //move on
        next();
    }
});

app.use('/', index);
app.route('/students')
    .get(student.getAllStudents)
    .post(student.addStudent)
    .put(student.updateStudent)
app.route('/students/:name')
    .get(student.findStudent)
    .delete(student.deleteStudent);

app.route('/subjects')
    .get(subjects.getAllSubjects)
    .post(subjects.addSubjects)
    .put(subjects.updateSubject);
app.route('/subjects/name/:name')
    .get(subjects.findSubjectsByName);
app.route('/subjects/studies/:name')
    .get(subjects.findSubjectsByStudies);
app.route('/subjects/quatrimestre/:name')
    .get(subjects.findSubjectsByQuatrimestre);

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

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
//一个express实例
var app = express();
//获取默认代理-false,待深入了解
var trustProxy = app.get('trust proxy');
console.log(`trustProxy=${trustProxy}`);

//DEBUG=express:* node ./bin/www
//DEBUG=express:router node ./bin/www
//DEBUG=express:application node ./bin/www

//==========》 view engine setup设置模版目录及引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//==========》以下为设置中间件
//express所有中间件列表：https://github.com/senchalabs/connect#middleware
// uncomment after placing your favicon in /public，fav中间件指定路径和图标
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//使用morgan中间件记录日志，设置级别为dev
app.use(logger('dev'));
//使用bodyParser中间件处理请求体
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: false }));
//使用cookieParser中间件处理cookie
app.use(cookieParser());
//使用内置中间件static处理静态资源
app.use(express.static(path.join(__dirname, 'public')));

//挂载路由中间件index和users到路径/和/users
app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
//挂载所有路径到该路由中间件
//如果没有匹配到前面的所有路由，则会匹配到本路由，直接认为404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);//如果传了err对象则认为遇到错误，只跳入错误处理中间件。
});

// error handler错误处理中间件，渲染error.jade
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

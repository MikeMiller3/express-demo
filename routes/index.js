var express = require('express');
//创建express Rwouter类,模块化，可挂载路径
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* route practice*/
//为某个路径上的所有请求加载中间件
router.all('/*', function(req, res, next) {
	console.log('router all');
	next();
})
//
router.use(function(req, res, next) {
	console.log('router.use def');
	next();
})
//
router.get('/login', function(req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  
  res.end(JSON.stringify(req.body));
})
//get
router.get('/layout', function(req, res) {
  res.render('layout', {title: 'layouttttt'});
})
//post==>curl http://localhost:3000/post -d post
router.post('/post', function(req, res) {
  res.render('layout', {title: 'post'});
})
//匹配的字符串支持正则表达式的?*+()
router.get('/a(1)?b*c+d', function(req, res){
	res.send('/a(1)?b*c+d');
})
//支持完整的正则表达式
router.get(/.*fly$/, function(req, res) {
    console.log('打印参数 result2 ', req.query);
    res.end('/.*fly$/');
})
//多个回调
router.get('/multi-cb', function(req, res, next){
  console.log('cb1');
  next();
}, function(req, res){
	console.log('cb2');
	res.send('ok');
})
//回调函数数组
function cb1(req, res, next){
	console.log('cb1');
	next();
}
function cb2(req, res, next){
	console.log('cb2');
	next();
}
function cb3(req, res){
	console.log('cb3');
	res.send('okk');
}
router.get('/multi-arr', [cb1, cb2, cb3]);
//mix
router.get('/multi-mix', [cb1, cb2], function(req, res){
	console.log('mix')
	res.send('mix');
})
//路由可挂载多个路径
router.get('/router1', function(req, res, next){
	console.log('This is the router1');
	if (true) {
		next();//将控制权交给下个匹配的路由
	}

})
router.get('/router1', function(req, res){
	console.log('This is the router2');
	res.send('ok');
})
module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* route practice*/
router.get('/login', function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  
  res.end(JSON.stringify(req.body));
})
router.get('/layout', function(req, res, next) {
  res.render('layout', {title: 'layouttttt'});
})
router.post('/post', function(req, res, next) {
  res.render('layout', {title: 'post'});
})
//curl http://localhost:3000/post -d post

module.exports = router;

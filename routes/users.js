var express = require('express');
var router = express.Router();
var mysql = require('mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/get/:id', function(req, res, next) {
	//连接mysql
	var connection = mysql.createConnection({
	  host: 'localhost',
	  user: 'root',
	  password: 'root',
	  database: 'test',
	  port: '3306'
	});

	connection.connect();

	connection.query('SELECT * from user where id=?',[req.params.id], function(err, rows, fields) {
	  if (err) throw err;
	  console.log('The solution is: ', rows);
	  connection.end();
  	  res.send(`your id:${req.params.id},your name:${rows[0].name}`);
	});
});

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
// 127.0.0.1 (/)
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

module.exports = router;


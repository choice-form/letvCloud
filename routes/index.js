var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET letvCloud page
router.get('/letv', function (req, res, next) {
  res.render('letv', { title: 'letvCloud' });
})

module.exports = router;

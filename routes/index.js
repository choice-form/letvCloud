var express = require('express');
var url = require('url');
var letv = require('../letvCloud/letv');
var router = express.Router();

// 初始化
letv.init("fcba45089f", "768cabd0d7806dcd4da13586029be607");

console.log(letv);
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET letvCloud page
router.get('/letv', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.render("letv", { title: 'letvCloud' });
})

// POST letvCloud 
router.post('/letv', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  var fnObj = req.body;
  letv.jude(fnObj, function (rs) {
    var result = JSON.parse(rs);
    if (result.code === 0) {
      console.log("从letvCloud获取信息成功");
      res.end(rs);
    } else {
      console.log(result.message);
    }
  })
})
module.exports = router;

var express = require('express');
var url = require('url');
var letv = require('../letvCloud/letv');
var config = require("../config.js");
var router = express.Router();

console.log(letv);
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET letvCloud page
router.get('/letv', function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*")
  res.render("letv", { title: 'letvCloud' });
})

// POST letvCloud 
router.post('/letv', function (req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*")
  var fnObj = req.body;
  letv.fun(fnObj, function (rs) {
    if(typeof rs === "string"){
      console.log("视频链接生成成功");
      res.end(rs);
      return;
    }
    var result = JSON.parse(rs);
    if (result.code === 0) {
      console.log("从letvCloud获取信息成功");
      res.end(rs);
    } else {
      console.log(result.message);
      res.end(rs);
    }
  })
})
module.exports = router;

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var notice = require('../models/notice');
var resource = require('../models/resource');

var Notice = notice.Notice;
var Resource = resource.Resource;

// mongoose连接
mongoose.connect('mongodb://127.0.0.1:27017/course_learning');
var con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open',()=>{
    //成功连接
    console.log('成功');
})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('all');
});

router.get('/notice/list', function(req, res, next) {
  Notice.find((err, doc) => {
    console.log(err, doc);
    res.json({
      code: 0,
      data: doc
    });
  })
});

router.get('/resource/list', function(req, res, next) {
  Resource.find((err, doc) => {
    console.log(err, doc);
    res.json({
      code: 0,
      data: doc
    });
  })
});

module.exports = router;
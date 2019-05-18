var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var model = require('../models/notice');

var Notice = model.Notice;

// mongoose连接
mongoose.connect('mongodb://127.0.0.1:27017/course_learning');
const con = mongoose.connection;
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
      msg: 'create success',
      data: doc
    });
  })
});

module.exports = router;
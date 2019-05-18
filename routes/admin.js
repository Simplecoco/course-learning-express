var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var notice = require('../models/notice');
var resource = require('../models/resource');

var Notice = notice.Notice;
var Resource = resource.Resource;

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
  res.send('admin');
});

/* POST users listing. */
router.post('/createNotice', function(req, res, next) {
  var notice = new Notice({
    uri: req.body.uri,
    name: req.body.name,
    content: req.body.content,
    files: req.body.files
  })
  console.log(notice);
  notice.save(function(err, doc) {
    console.log(err, 'err');
    console.log(doc, 'doc');
    res.json({
      code: 0,
      msg: 'create success'
    });
  })
});

router.post('/resource/submit', function(req, res, next) {
  var resource = new Resource({
    uri: req.body.uri,
    name: req.body.name,
    desc: req.body.desc,
    files: req.body.files
  })
  console.log(resource);
  resource.save(function(err, doc) {
    console.log(err, 'err');
    console.log(doc, 'doc');
    res.json({
      code: 0,
      msg: 'create success'
    });
  })
});

module.exports = router;
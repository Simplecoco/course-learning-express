var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer  = require('multer');


var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        console.log(file, 'file');
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        var reg = /(jpg|jpeg|png)/g
        if (reg.test(file.mimetype)) {
          cb(null, 'public/images');
        } else {
          cb(null, 'public/resource');
        }
      },
      filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + "-" + file.originalname);  
      }
    });
    
var upload = multer({ storage: storage });


/* POST users listing. */
router.post('/', upload.single('file'), function(req, res, next) {
    var file = req.file;
    console.log(req.headers);
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    // 接收文件成功后返回数据给前端
    res.json({res_code: '0', name: file.filename, mimetype:file.mimetype, path: '//' + req.headers.host + '/' + file.path});
});

module.exports = router;
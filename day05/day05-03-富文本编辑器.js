//各种模板引用
const express = require('express');
const ejs = require('ejs');
const mysql = require('mysql');
const bodyParser = require('body-parser');
// 文件上传模块
const multer  = require('multer');
// const upload = multer({ dest: 'uploads/' });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${new Date().getFullYear()}/${(new Date().getMonth()+1).toString().padStart(2, '0')}`)
    },
    filename: function (req, file, cb) {
      cb(null, new Date().valueOf() + '_' + Math.random().toString().substring(2, 8) + '.'+ file.originalname.split('.').pop())
    }
  });
   
  var upload = multer({ storage: storage });

// 创建服务
const server = express();
//接收POST数据
server.use(bodyParser.urlencoded({
    extended: true
}));
//数据库连接
let mydb = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'h51807'
});
mydb.connect();

//设置模板引擎
server.engine('html', ejs.renderFile);
server.set('views', './html');
server.set('view engine', 'html');

//显示上传页面
server.get('/editor', (req, res) => {
    res.render('editor');
});

//上传图片的接口
server.post('/upload', upload.array('image', 100), (req, res) => {
    console.log(req.files);
    let data = [];
    for (const f of req.files) {
        // let imgsrc = f.destination + '/' + f.filename;
        data.push(f.destination + '/' + f.filename);
    }

    res.json({
        "errno": 0,
        "data": data
    });

});

//上传的图片需要静态资源托管
server.use('/uploads', express.static('uploads'));

server.use(express.static('html'));

// 监听端口
server.listen(81);
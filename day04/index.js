//各种模板引用
const express = require('express');
const ejs = require('ejs');
const async = require('async');
const mysql = require('mysql');
const bodyParser = require('body-parser');

//处理cookie信息的
const cookieParser = require('cookie-parser');
//处理session
const session = require('express-session');

//用于生产验证码图片
const svgCaptcha = require('svg-captcha');

// 创建服务
const server = express();
//接收POST数据
server.use(bodyParser.urlencoded({
    extended: true
}));
//设置模板引擎
server.engine('html', ejs.renderFile);
server.set('views', './html');
server.set('view engine', 'html');
//数据库连接
let mydb = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'h51807'
});
mydb.connect();
//启用cookie处理的中间件
let signed = 'www.jyqh.170815h';
server.use(cookieParser(signed));
//启用SESSION
server.use(session({
    secret: signed,
    name: 'sessionID',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7 * 24 * 3600 * 1000
    }
}));

server.get('/coder', function (req, res) {
    var captcha = svgCaptcha.create({
        background: '#cc9966',
        noise: 3,
        size: 4,
        color: '#f01',
        ignoreChars: '0o1i',
        height: 35,
        width: 100
    });
    //把验证码保存到session里面
    req.session.coder = captcha.text;

    res.type('svg');
    res.status(200).send(captcha.data);
});

//显示登录页面
server.get('/login', (req, res) => {
    res.render('login');
});
//登录验证
server.post('/login', (req, res) => {
    let d = req.body;
    // 验证验证码是否正确  验证码不区分大小写
    if (d.coder.toLowerCase() != req.session.coder.toLowerCase()) {
        res.json({
            result: 'coder_err'
        });
        return;
    }
    let sql = 'SELECT uid, username, passwd FROM user WHERE username = ?';
    mydb.query(sql, d.username, (err, result) => {
        if (err) {
            res.json({
                result: 'db_err'
            });
            return;
        }
        //判断账号是否存在
        if (!result.length) {
            res.json({
                result: 'u_not_exist'
            });
            return;
        }

        //判断密码是否正确
        if (result[0].passwd != d.passwd) {
            res.json({
                result: 'p_err'
            });
            return;
        }
        //登录成功 保存登录成功的状态
        req.session.uid = result[0].uid;
        req.session.username = result[0].username;

        res.json({
            result: 'ok'
        });
    });
});
// //js静态资源托管
// server.use('/js', express.static('html/js'));
// server.use('/css', express.static('html/css'));
//静态资源托管
server.use(express.static('html'));

// server.use(Path2D, 静态资源路径);

//登录验证  中间件
server.use(function (req, res, next) {
    // 登录验证
    if (!req.session.username) {
        res.redirect('/login');
        return;
    }
    next();
});

//管理中心
server.get('/index', (req, res) => {
    res.send('你好，' + req.session.username + '，欢迎你');
});

server.get('/add', (req, res) => {
    res.send('你好，' + req.session.username + '，欢迎你添加学生信息');
});

server.get('/stulist', (req, res) => {
    res.send('你好，' + req.session.username + '，欢迎你管理学生信息');
});

// 监听端口
server.listen(81);
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
// 创建服务
const server = express();
//接收POST数据
server.use(bodyParser.urlencoded({extended: true}));
//设置模板引擎
server.engine('html', ejs.renderFile);
server.set('views', './html');
server.set('view engine', 'html');

//启用cookie处理的中间件
let signed = 'www.jyqh.170815h';
server.use(cookieParser(signed));
//启用SESSION
server.use(session({
    secret: signed,
    name:'sessionID',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge:7*24*3600*1000}
}));
/*
    各参数意义：
    secret：用来对session数据进行加密的字符串.这个属性值为必须指定的属性。
    name：表示cookie的name，默认cookie的name是：connect.sid。
    maxAge：cookie过期时间，毫秒。
    resave：是指每次请求都重新设置session cookie，假设你的cookie是6000毫秒过期，每次请求都会再设置6000毫秒。
    saveUninitialized： 是指无论有没有session cookie，每次请求都设置个session cookie ，默认给个标示为 connect.sid。
*/
//创建session信息
server.get('/set', (req, res)=>{
    req.session.username = '常桉焌';
    req.session.age = '16';
    req.session.height = '175';
    req.session.cn = 'H518071';
    res.send('session设置完成');
});
// 获取session信息
server.get('/get', (req, res)=>{
    console.log(req.session);
    res.send('我知道你是' + req.session.username + '，你是'+req.session.cn+'班的');
});

//静态资源托管
server.use(express.static('html'));
// 监听端口
server.listen(81);





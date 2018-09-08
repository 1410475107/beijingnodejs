//各种模板引用
const express = require('express');
const ejs = require('ejs');
const async = require('async');
const mysql = require('mysql');
const bodyParser = require('body-parser');
//处理cookie信息的
const cookieParser = require('cookie-parser');

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

//设置cookie
server.get('/set', (req ,res)=>{
    res.cookie('username', '常桉焌', {maxAge:7*24*3600*1000});
    res.cookie('age', '18', {signed:true,maxAge:7*24*3600*1000});
    res.cookie('height', '175');
    res.send('cookie设置成功');
});
//cookie信息的获取
server.get('/get', (req ,res)=>{
    console.log(req.cookies);
    res.send(`我是${req.cookies.username}，我的年龄是${req.signedCookies.age}，我的身高是${req.cookies.height}`);
});
//删除cookie
server.get('/del', (req ,res)=>{
    res.clearCookie('height');
    res.send('删除cookie信息');
});

//静态资源托管
server.use(express.static('html'));
// 监听端口
server.listen(81);





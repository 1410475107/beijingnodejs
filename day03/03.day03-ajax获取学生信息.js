//各种基本的模块
const express = require('express');
const mysql = require('mysql');
const ejs = require('ejs');
const async = require('async');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

// 模板引擎
app.engine('html', ejs.renderFile);
app.set('views', './html');
app.set('view engine', 'html');

//数据库
let mydb = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    port:3306,
    database:'h51807'
});
mydb.connect();


//显示一个查询页面
app.get('/stu', (req ,res)=>{
    res.render('stu');
});

//查询学生信息
app.get('/search', (req, res)=>{
    let stuname = req.query.stuname;
    let sql = 'SELECT sid, stuname, stunum FROM students WHERE stuname LIKE "%'+stuname+'%"';
    mydb.query(sql, (err, results)=>{
        res.send(results);
    });
});


app.use('/css', express.static('css'));
app.use(express.static('html'));

app.listen(81);

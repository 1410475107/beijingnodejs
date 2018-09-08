//step  1
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require('fs');
//step  2
const app = express();
//启用中间件，接收post过来的数据
app.use(bodyParser.urlencoded({extended: true}));
//连接到数据库
let mydb = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'root',
    port:3306,
    database:'h51807'
});
mydb.connect();

//GET
app.get('/add', (req, res)=>{
    res.send('添加用户信息');
});

//POST
app.post('/addstu', (req, res)=>{
    //接收数据并把数据保存到数据库
    let d = req.body;
    let sql = 'INSERT INTO students(stuname, stunum, tel, hobby, classname) VALUES (?,?,?,?,?)';
    let data = [d.stuname, d.stunum, d.tel, d.hobby, d.classname];
    mydb.query(sql, data, (err, result)=>{
        if(err){
            console.log(err);
            res.send('数据库操作出错');
            return ;
        }
        res.send('学生信息添加成功！');
    });
});

//模板引擎基本原理
app.get('/tpl', (req, res)=>{
    let stu = {stuname:'刘燕', stunum:'H518071006'};
    stu = {stuname:'付志文', stunum:'H518071009'};
    stu = {stuname:'徐希', stunum:'H518071008'};
    stu = {stuname:'赵寒飞', stunum:'H518071007'};
    //获取模板文件内容
    fs.readFile('./views/stulist.html', (err, data)=>{
        res.send(data.toString().replace('#stuname#', stu.stuname).replace('#stunum#', stu.stunum));
    });
});
// 获取学生信息
app.get('/stulist', (req ,res)=>{
    let sql = 'SELECT sid, stuname, stunum, tel, hobby, classname FROM students WHERE 1';
    mydb.query(sql, (err, results)=>{
        if(err){
            console.log(err);
            res.send('数据库操作错误');
            return ;
        }
        console.log(results);
        res.send(results);
    });
});

//step  4
app.use(express.static('views'));
//step  3
app.listen(81);
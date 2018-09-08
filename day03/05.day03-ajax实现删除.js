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

//学生列表信息
app.get('/stulist', (req, res)=>{
    //从数据库里面把数据查询出来
    let sql = `SELECT * FROM students WHERE status = 1`;
    //接收查询的关键词
    let stuname = req.query.stuname;
    if(stuname){
        // sql += ` AND stuname = "${stuname}"`;
        sql += ` AND stuname LIKE "%${stuname}%"`;
    }
    mydb.query(sql, (err, results)=>{
        if(err){
            console.log(err);
            res.send('DB_ERR');
            return ;
        }
        let data = {stulist:results};
        data.title = '学生信息列表';
        data.stuname = stuname;
        res.render('stulist', data);
    });
});

//删除学生信息
app.get('/delstu', (req ,res)=>{
    let sid = parseInt(req.query.sid);
    // if(!sid){
    //     res.send('请确定你要删除的学生');
    //     return ;
    // }
    // let sql = 'DELETE FROM students WHERE sid = ?';
    let sql = 'UPDATE students SET status = 0 WHERE sid = ?';
    mydb.query(sql, sid, (err, result)=>{
        if(err){
            console.log(err);
            //返回json格式的数据
            res.json({r:'db_err'});
            return ;
        }
        res.json({r:'success'});
    });
});

app.use(express.static('html'));

app.listen(81);

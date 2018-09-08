const express = require('express');
const mysql = require('mysql');
const app = express();
//接收POST过来的所有数据
const  bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//模板引擎相关设置
const ejs = require('ejs');
//自定义一个模板引擎  html
app.engine('html', ejs.renderFile);
//  指定模板所在的路径
app.set('views', './html');
//注册模板引擎到Express
app.set('view engine', 'html');

//连接到数据库
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
    if(!sid){
        res.send('请确定你要删除的学生');
        return ;
    }
    // let sql = 'DELETE FROM students WHERE sid = ?';
    let sql = 'UPDATE students SET status = 0 WHERE sid = ?';
    mydb.query(sql, sid, (err, result)=>{
        if(err){
            console.log(err);
            res.send('DB_ERR');
            return ;
        }
        res.send('删除成功!');
    });
});

//修改页面
app.get('/updatestu', (req, res)=>{
    let sid = parseInt(req.query.sid);
    if(!sid){
        res.send('请确定你要修改的学生');
        return ;
    }
    //获取该学生的原始信息
    let sql = 'SELECT * FROM students WHERE sid = ?';
    mydb.query(sql, sid, (err, result)=>{
        if(err){
            console.log(err);
            res.send('DB_ERR');
            return ;
        }
        res.render('updatestu', {stu:result[0]});
    });
});

//保存修改的数据信息到数据库
app.post('/updatestu', (req, res)=>{
    //接收POST过来的所有数据
    let d = req.body;
    //把数据更新到数据库
    let sql = 'UPDATE students SET stuname = ?, stunum = ?, tel = ?, classname = ?, hobby = ? WHERE sid = ?';
    mydb.query(sql, [d.stuname,d.stunum,d.tel,d.classname,d.hobby, d.sid], (err, result)=>{
        if(err){
            console.log(err);
            res.send('DB_ERR');
            return ;
        }
        res.send('SUCCESS');
    });

});


app.use(express.static('html'));
app.listen(88);
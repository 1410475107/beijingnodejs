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

//注册页面的路由
app.get('/reg', (req, res)=>{
    res.render('reg');
});
//注册数据保存路由
app.post('/regsubmit', (req, res)=>{
    //  接收数据并保存到数据库
    let u = req.body;
    //判断两次输入的密码是否一致
    if(u.passwd != u.passwd1){
        res.send('passwd_error');
        return ;
    }

    function checkUser(cb) {
        //在保存到数据库之前我们应该干什么  检查账号是否存在
        let sql = 'SELECT uid FROM user WHERE username = ?';
        mydb.query(sql, u.username, (err, result)=>{
            if(err){
                console.log(err);
                res.send('数据库操作错误');
                return ;
            }
            //判断账号是否存在
            // if(result.length){
            //     res.send('你注册的账号已经存在');
            //     return ;
            // }
            cb(null, result.length);
        });
    }

    function regUser(existed, cb) {
        if(existed){
            cb(null, 'username_existed');
        }else{
            //保存账号到数据库
            let addsql = 'INSERT INTO user(username, passwd, regtimes) VALUES(?,?,?)';
            mydb.query(addsql, [u.username, u.passwd, new Date().toLocaleString()], (err, result)=>{
                if(err){
                    console.log(err);
                    cb(null, 'db_err');
                    return ;
                }
                // res.send('注册成功');
                cb(null, 'success');
            });
        }
    }
    async.waterfall([checkUser, regUser],(err, result)=>{
        res.send(result);
    });
});

//登录页面的路由
app.get('/login', (req, res)=>{
    res.render('login');
});

//登录数据验证
app.post('/login', (req, res)=>{
    let u  = req.body;
    //验证账号是否存在
    let sql = 'SELECT uid, username,  passwd FROM user WHERE username = ?';
    mydb.query(sql, u.username, (err, result)=>{
        if(!result.length){
            res.send('username_not_exist');
            return ;
        }
        // 验证密码是否正确
        if(u.passwd != result[0].passwd){
            res.send('passwd_error');
            return ;
        }
        res.send('success');
    });
});

app.get('/ajax', (req, res)=>{
    res.send('123');
});

app.use('/css', express.static('css'));
app.use(express.static('html'));

app.listen(81);

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const server = express();
//使用中间件接收post过来的数据
server.use(bodyParser.urlencoded({
    extended: true
}));

 //连接到数据库
 let connect = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'h51807',
    port: 3306
});
connect.connect();

server.post('/addstu', (req, res) => {
    // let sql = `INSERT INTO students(stuname, stunum, classname, tel, hobby) VALUES ("${p.stuname}","${p.stunum}","${p.classname}","${p.tel}","${p.hobby}")`;
    let sql = `INSERT INTO students(stuname, stunum, classname, tel, hobby) VALUES (?,?,?,?,?)`;
    let p = req.body;
    let data = [p.stuname, p.stunum, p.classname, p.tel, p.hobby];
    connect.query(sql, data, (err, result) => {
        console.log(err);
        console.log(result);
        res.send('数据添加完成');
    });

});
//静态资源托管
server.use('/img', express.static('img'));
server.use(express.static('views'));
//端口监听
server.listen(81);
const express = require('express');
const bodyParser = require('body-parser');
const server = express();
//使用自定义中间件接收post数据：所有的post请求都会进入该中间件
server.use(bodyParser.urlencoded({extended: true}));
// POST请求
server.post('/login', (req, res) => {
        res.send(req.body);
    }
);

server.post('/addnews', (req, res) => {
    res.send(req.body);
});

//实现静态资源托管
server.use(express.static('views'));

server.listen(81);
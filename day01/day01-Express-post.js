const express = require('express');
const queryString = require('querystring');
const server = express();
const myPost = require('./my_module/my-post');

//使用自定义中间件接收post数据：所有的post请求都会进入该中间件
server.use(myPost.postData);
// POST请求
server.post('/login', (req, res) => {
        res.send(req.pd);
    }
);

server.post('/addnews', (req, res) => {
    res.send(req.pd);
});

//实现静态资源托管
server.use('', express.static('views'));

server.listen(81);
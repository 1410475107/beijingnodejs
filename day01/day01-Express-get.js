//引入第三方模块 express
const express = require('express');

// 创建一个服务
const server = express();

//定义路由
server.get('/', (req, res)=>{
    res.send('首页');
});

server.get('/my', (req, res) => {
    //接受get过来的值
    console.log(req.query.b);
    res.setHeader('content-type', 'text/html;charset="UTF-8"');
    res.write('list');
    res.end();
});

server.get('/list', (req, res) => {
    res.send('相应内容--send');

});

server.get('/arr', (req, res)=>{
    res.send([1,2,3]);
});

// 监听端口
server.listen(81);
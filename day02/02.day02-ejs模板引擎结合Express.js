//step  1
const express = require('express');
//EJS模板引擎
const ejs = require('ejs');
//step  2
const app = express();
//模板引擎设置
app.set('views', './tpl');
//开发一个新的模板引擎 html
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.get('/newslist', (req, res)=>{
    let newslist = [{id:1, title:'新闻信息1'},{id:2, title:'新闻信息2'},{id:3, title:'新闻信息3'}];
    res.render('newslist', {title:'新闻信息列表', newslist:newslist});
});

//step  4
app.use(express.static('views'));
//step  3
app.listen(81);
global.express = require('express');
const ejs = require('ejs');
const app = express();
//设置模板引擎
app.engine('html', ejs.renderFile);
app.set('views', './html');
app.set('view engine', 'html');
//使用Router创建子路由
app.use('/news', (require('./modules/news'))());
app.use('/products', (require('./modules/products'))());

//后台管理系统
app.use('/admin', (require('./modules/admin'))());
app.use('/admin/login', (require('./modules/adminlogin'))());
// app.use('/admin/news', (require('./modules/admin/news'))());
// app.use('/admin/products', (require('./modules/admin/products'))());

// 前端网站
app.get('/my', (req ,res)=>{
    res.render('my');
});

// 监听端口
app.listen(81);
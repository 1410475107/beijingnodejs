//step  1
const express = require('express');
//EJS模板引擎
const ejs = require('ejs');
//step  2
const app = express();

app.get('/stuinfo', (req, res) => {
    //使用ejs模板引擎
    let stuinfo = {
        stuname: '赵寒飞',
        stunum: 'H518071007',
        classname: 'H518071',
        tel: '13566666666',
        hobby: '听歌曲',
        info: '我来自何方，<b>又将去何处</b>'
    };

    let stulist = [
        {
            stuname: '赵寒飞',
            stunum: 'H518071007',
            tel: '13566666666'
        }, 
        {
            stuname: '韩栋',
            stunum: 'H518071010',
            tel: '13566666666'
        }, 
        {
            stuname: '张明星',
            stunum: 'H518071011',
            tel: '13566666666'
        }
    ];
    ejs.renderFile('./views/stuinfo.html', {stuinfo:stuinfo, stulist:stulist}, (err, str) => {
        res.send(str);
    });
});


//step  4
app.use(express.static('views'));
//step  3
app.listen(81);
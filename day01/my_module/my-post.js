const queryString = require('querystring');
module.exports = {
    postData:(req, res, next)=>{
        req.pd = '';
        req.on('data', (str)=>{
            req.pd += str;
        });
        req.on('end', ()=>{
            req.pd = queryString.parse(req.pd);
            // res.send('POST');
            //接着往下执行
            next();
        })
    }
}
    

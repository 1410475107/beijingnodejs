const fs =require('fs');
const async = require('async');
let str = ''
/*
fs.readFile('./a.txt', (err, data)=>{
    str += data;//a
    fs.readFile('./b.txt', (err,  data)=>{
        str += data;//b
        fs.readFile('./c.txt', (err, data)=>{
            str += data;//c
            console.log(str);
        });
    });
});
*/
async.series({
    a:function(callback){
        fs.readFile('./a.txt', (err, str)=>{
            //必须调用callback，才会继续执行下面的任务，结构性要求
            callback(null, str.toString());
        });
    },
    b:function(cb){
        fs.readFile('./b.txt', (err, str)=>{
            cb(null, str.toString());
        });
    },
    c:function(cb){
        fs.readFile('./c.txt', (err, str)=>{
            cb(null, str.toString());
        });
    }
}, (err, results)=>{
    console.log(err);
    console.log(results);
});

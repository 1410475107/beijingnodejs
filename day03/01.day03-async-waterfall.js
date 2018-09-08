const async = require('async');
//waterfall的任务是必须使用数组包含起来
async.waterfall([
    function(callback){
        callback(null, '韩栋', '175');
    },
    function(username, height, cb){
        cb(null, username, height, '男');
    },
    function(username, height, general, cbk){
        let data = {username:username, height:height, general:general};
        cbk(null, data);
    }
], (err, result)=>{
    console.log(result);
});

module.exports = function(){
    const router = express.Router();


    router.get('/', (req, res)=>{
        res.send('管理员登录');
    });

   


    return router;
}
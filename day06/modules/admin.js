module.exports = function(){
    const router = express.Router();


    router.get('/', (req, res)=>{
        res.send('管理中心');
    });

    router.get('/addnews', (req, res)=>{
        res.send('新闻添加页面');
    });


    return router;
}
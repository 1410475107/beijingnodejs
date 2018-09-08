module.exports = function(){
    let router = express.Router();
    router.get('/my', (req ,res)=>{
        res.send('miniApp1-my123');
    });
    router.get('/newslist', (req ,res)=>{
        res.send('新闻列表');
    });
    router.get('/newsinfo', (req ,res)=>{
        res.send('新闻详情');
    });
    return router;
}
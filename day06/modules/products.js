module.exports = function(){
    let router = express.Router();
    router.get('/my', (req ,res)=>{
        res.send('miniApp2-my123');
    });
    router.get('/plist', (req, res)=>{
        res.send('产品列表');
    });
    router.get('/pinfo', (req, res)=>{
        res.send('产品详情');
    });
    return router;
}
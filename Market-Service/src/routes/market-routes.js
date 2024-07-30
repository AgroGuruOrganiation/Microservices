
const Authentication = require('../middleware/authenticate')
const uploadMiddleware = require("../middleware/multer-middleware");
const MarketService = require("../services/market-services");
const {
    addMarket, 
    getMarkets,
    removeMarket, 
    updataMarket, 

    getMarketById, 
    userMarket,
    ItemAddToMarket
} = require("../controller/market-controller");
const { SubscribeMessage } = require('../utils');




module.exports = (MarketRouter,channel)=>{



    MarketRouter.post('/market/create',Authentication,uploadMiddleware.single("MarketImage"),addMarket);
    MarketRouter.get('/market/' ,getMarkets);
    MarketRouter.delete('/market/remove'    ,Authentication,removeMarket);
    MarketRouter.put('/market/',Authentication,updataMarket);
    MarketRouter.post('/market/itemadd',Authentication,ItemAddToMarket)
    // provid Market id by query parameters 
    MarketRouter.get('/market/id',getMarketById);
    // one api for array of items which contain object of itemname: and itemimag
    MarketRouter.get('/market/userMarket',Authentication,userMarket);

}
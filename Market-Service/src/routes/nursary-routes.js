
const Authentication = require('../middleware/authenticate')
const uploadMiddleware = require("../middleware/multer-middleware");
const NurseryService = require("../services/nursery-services");
const {
    addNursery, 
    getNurserys,
    removeNursery, 
    updataNursery, 
    ItemsImageuploadsNursery, 
    getNurseryById, 
    userNursery
} = require("../controller/nursery-controller");
const { SubscribeMessage } = require('../utils');




module.exports = (NurseryRouter,channel)=>{



    NurseryRouter.post('/nursery/create',Authentication,uploadMiddleware.single("nurseryImage"),addNursery);
    NurseryRouter.get('/nursery' ,getNurserys);
    NurseryRouter.delete('/nursery/remove'    ,Authentication,removeNursery);
    NurseryRouter.put('/nursery/',Authentication,updataNursery);
    NurseryRouter.post('/nursery/itemadd',Authentication,uploadMiddleware.single('photo'),ItemsImageuploadsNursery)
    // provid Nursery id by query parameters 
    NurseryRouter.get('/nursery/id',getNurseryById);
    // one api for array of items which contain object of itemname: and itemimag
    NurseryRouter.get('/nursery/usernursery',Authentication,userNursery);

}
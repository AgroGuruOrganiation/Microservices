
const express= require("express")
const Authentication = require('../middleware/authenticate')
//const uploadMiddleware = require("../middleware/multer-middleware");
const LaboratoryService = require("../services/laboratory-services");
const {
    addLab, 
    getLabs,
    removeLab, 
    updataLab, 
    ItemsImageuploadsLab, 
    getLabById, 
    userLab,
   
} = require("../controller/laboratory-controller");
const { SubscribeMessage } = require("../utils");
const uploadMiddleware1 = require("../middleware/multer-middleware");




module.exports = (labRouter,channel)=>{

   

    labRouter.post('/lab/create',Authentication,uploadMiddleware1.single("laboratoryImage"),addLab);
    labRouter.get('/lab/' ,getLabs);
    labRouter.delete('/lab/remove',Authentication,removeLab);
    labRouter.put('/lab/',Authentication,updataLab);
    labRouter.post('/lab/itemadd',Authentication,uploadMiddleware1.single('photo'),ItemsImageuploadsLab)
    // provid lab id by query parameters 
    labRouter.get('/lab/id',getLabById);
    // one api for array of items which contain object of itemname: and itemimag
    labRouter.get('/lab/userlab',Authentication,userLab);

}
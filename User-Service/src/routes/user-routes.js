
const Authentication = require('../middleware/user-middleware')
const uploadMiddleware = require("../middleware/multer-middleware")
const {
    userResister,
    userLogin,
    userLogout,
    getUser,
    adddp,
    userProfileUpdate,
    userDeleteAccount
} = require('../controller/user-controllers');

const UserService = require('../services/user-service');
const { SubscribeMessage } = require('../utils');





 
module.exports = (userRouter,channel)=>{

    const service = new UserService();
    try{
        SubscribeMessage(channel, service);

    }
    catch(e)
    {
        console.log("Message Broker service is down : "+e.message);
    }
   

    userRouter.post('/register',userResister);
    userRouter.post('/login',userLogin);
    userRouter.post('/dp',Authentication,uploadMiddleware.single("profilepic"),adddp)
    userRouter.put('/updateprofile',Authentication,userProfileUpdate);
    userRouter.get('/logout',Authentication,userLogout);
    userRouter.get('/getuser',Authentication,getUser);
    userRouter.delete("/delete",Authentication,userDeleteAccount)

}


const jwt=require('jsonwebtoken');
const userService = require('../services/user-service');



const user = new userService();

const Authentication= async (req,res,next)=>{
try{
    const token=req.cookies?.jwtoken;
   
     if(!token)throw new Error("Login first");
    
    const verifyToken = jwt.verify(token,process.env.JWT_PASS) ;
    
    const rootuser = await user.getProfile(verifyToken._id);

    if(!rootuser){

        throw new Error("user not found")

    }
    req.token=token;
    req.rootuser=rootuser;
    req.rootuserId=rootuser._id;
    next();
     
}catch(err){
  //  console.log("in the backend catch")
    res.status(401).json({'Unauthorized' : 'Not Token provided','message':err.message});
   

}


}



module.exports= Authentication;
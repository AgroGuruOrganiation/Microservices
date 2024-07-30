
const jwt=require('jsonwebtoken');





const Authentication= async (req,res,next)=>{
try{
    const token=req.cookies.jwtoken;
   
    
    
    const verifyToken = jwt.verify(token,process.env.JWT_PASS) ;
    if(!verifyToken._id)
    {
        throw new Error();
    }
    req.rootuser = {_id :verifyToken._id};
    next();
     
}catch(err){
    console.log("in the backend catch")
    res.status(401).send('Unauthorized : Not Token provided')

    console.log(err);

}


}



module.exports= Authentication;
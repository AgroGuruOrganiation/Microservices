
const fs  = require("fs");
const userService = require("../services/user-service");
const { publishMessageForImageUpload } = require("../utils");
const { File } = require("buffer");
const { profile } = require("console");

const user = new userService();




exports.userResister= async (req,res) =>{


    try{
       const newUser =await user.SignUp(req.body.data);
        res.status(200).json({registered_user:newUser});
    }
    catch(err)
    {
        res.status(400).json({error:err.message});
    }

}





exports.userLogin = async (req,res) =>{

    try{
        const token = await user.SignIn( req.body.data);
        
        res.cookie("jwtoken",token,{
        
            expires:new Date(Date.now()+25892000000),
            httpOnly:true   
        }); 

        res.status(200).json({message:"login success",token:token});

    }   
    catch(err)
    {
        return res.status(400).json({error:err.message});
    }  
}




exports.userLogout = async (req,res)=>{
    try{

        res.cookie('jwtoken','', {maxAge: 1});
        res.status(200).json({message:"token deleted"});
    }
    catch(err)
    {
        res.status(500).json({mess:"internal server error"})
    }
}


exports.getUser = async(req,res)=>{
    try{
        const usr = await user.getProfile(req.rootuserId);
        res.status(200).json({user:usr});
    }
    catch(err)
    {
        res.status(404).json({error:err.message});
    }
    
}

exports.getImageObject = (profilepic)=>
{
    const fileContent =  fs.readFileSync(profilepic.path);
    const buffer ={ profilepic,fileContent};
    return buffer;
}


// done
exports.adddp = async (req,res)=>{

    try{
        const userId = req.rootuser._id;
        let profilepic = (req.file);
       
        const buffer = this.getImageObject(profilepic)
        const response = await user.addPorfilePicture(userId,JSON.stringify(buffer),profilepic.originalname);
        

        fs.unlinkSync(req.file.path);
  
    
 
        res.status(200).json({message:"profile picture added " ,resp : response.profilpic});
    }
    catch(err){
        res.status(500).json({ "message":"Unable to upload profile pic please check that you have selected valid pic",error:err.message})
    }
    

}

//done
exports.userProfileUpdate = async (req,res)=>{

    try{
        const userId = req.rootuser._id;

        const response = await user.updateUserProfile(req.body.data,userId);

        res.status(200).json({message:"user profile updated ",user:response});
    }
    catch(err)
    {
        res.status(500).json({error:err.message});
    }
    
   
}


exports.userDeleteAccount = async (req,res)=>{

    try
    {
        const userId = req.rootuserId;

        if(!userId)
            {
                throw new Error("Logged in user first");

                
            }
            const usr = await user.getProfile(req.rootuserId);
            if(!usr)
                {
                    throw new Error("Account does not exists");
                }

            const resp = await user.deleteAccount(userId);
        
                res.cookie('jwtoken','', {maxAge: 1});
                
            
           

            res.status(200).json({message:"Account deleted"});
    


    }
    catch(e)
    {
        res.status(500).json({message:e.message});
    }

}
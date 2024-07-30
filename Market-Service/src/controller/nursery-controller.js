
const Nursery = require('../database/models.js/nursery-models');
const NurseryService = require('../services/nursery-services');
const fs  = require('fs');
// Data will come from form tag remember it 
const nursery = new NurseryService();

//userId, name, phone, email, address, avaiNurseryle  ,openTime, closeTime filename lng,lat

exports.addNursery = async(req,res)=>{

    try
    {
        let userInputs = req.body;
        userInputs.available = true;
        userInputs.userId    = req.rootuser._id;
        userInputs.filename  =  req.file;
        userInputs.lng = req.query.lng;
        userInputs.ltd = req.query.ltd;

        if(!userInputs.lng || !userInputs.ltd)
        {
            throw new Error("Please allow GPS to get langitude and lattitude for better servise ")
        }
        if(!req.file)
        {
            throw new Error("Please add Nursery image to make it more attractive");
        }
        const buffer = this.getImageObject(req.file)

        const newNursery = await nursery.createNursery(userInputs,JSON.stringify(buffer));
            
        fs.unlinkSync(req.file.path);
        res.status(200).json({message:"Nursery saved ",response:newNursery})
    }
    catch(err)
    {
        console.log(err);
        res.status(301).json({message:"Unable to save Nursery ", message:err.message});
    }
}  
 

exports.getNurserys= async (req,res)=>{

    
    try{
        let lng = parseFloat(req.query.lng);
        let lat = parseFloat(req.query.ltd);
        const response = await nursery.getNursery(lng,lat);
        res.status(200).json(response );
    }
    catch(err)
    {
        res.status(500).json({error:err,message:err.message})
    }

}
        
           


exports.removeNursery = async (req,res)=>{

    try{
        const userId = req.rootuser._id;
        const id     = req.query.id;
      
        if( !id)
        {
           throw new Error("Nursery id is unknown")
        }

        const resp = await nursery.removeNursery(userId,id);
        res.status(200).json({message:"Nursery Deleted"});
    }
    catch(err)
    {
        res.status(500).json({error:err , message:err.message});
    }

  
}

exports.updataNursery = async(req,res)=>{

    try{

        const userId = req.rootuser._id;
        const NurseryId  = req.query.id;
        const userInput = req.body;

        if(!NurseryId)
            {
                throw new Error("Please pass nursery id as query param")
            }

        const resp = await nursery.updateNurseryProfile(userInput,NurseryId);
        res.status(200).json({response:resp,message:"Profile updated"});


    }
    catch(err)
    {
        res.status(500).json({error:err,message:err.message});
    }

    

}


exports.getImageObject = (profilepic)=>
{
    const fileContent =  fs.readFileSync(profilepic.path);
    const buffer ={ profilepic,fileContent};
    return buffer;
}






exports.ItemsImageuploadsNursery = async(req,res)=>{

try{
        const userId = req.rootuser._id;
        const photo = req.file;
        const sname = req.body.sname;

        if(!photo || !sname)
        {
            throw new Error("Enter the data first")
        }

        const buffer = this.getImageObject(photo)
        const Services={sname,photo : photo.originalname};
        const response = nursery.addNewService(userId,JSON.stringify(buffer),Services);
        fs.unlinkSync(req.file.path);
        res.status(200).json({message:" Service added" ,resp : response});

    }
    catch(e)
    {

        res.status(500).json({message:e.message});

    }
}




exports.getNurseryById = async(req,res)=>{
    
    try
    {
        const NurseryId = req.query.id;
        const resp = await nursery.getNurseryById(NurseryId);
        res.status(200).json({response:resp});
    }
    catch(err)
    {
       res.status(500).json({error:err,message:err.message});
    }
  

}

exports.userNursery = async(req,res)=>{
  
    try
    {
        
       const userId = req.rootuser._id;
       const resp  = await nursery.getNurseryByUserId(userId);
        res.status(200).json({response:resp});

    }catch(err)
    {
        res.status(500).json({error:err,message:err.message});
    }
 
}



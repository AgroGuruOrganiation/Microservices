
const LaboratoryService = require('../services/laboratory-services');

const fs = require('fs');
// Data will come from form tag remember it 
const lab = new LaboratoryService();

//userId, name, phone, email, address, available  ,openTime, closeTime filename lng,lat

exports.addLab = async(req,res)=>{

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
            throw new Error("Please add Laborato image to make it more attractive");
        }  
            
    
        const buffer = this.getImageObject(req.file)

        const newLaboratory = await lab.createLaboratory(userInputs,JSON.stringify(buffer));
        
        fs.unlinkSync(req.file.path)
        res.status(200).json({message:"Laboratory saved ",response:newLaboratory})
    }
    catch(err)
    {
        
        res.status(404).json({message:err.message});
    }
}  
 


exports.getImageObject = (profilepic)=>
{
    const fileContent =  fs.readFileSync(profilepic.path);
    const buffer ={ profilepic,fileContent};
    return buffer;
}


exports.getLabs= async (req,res)=>{

    
    try{
        let lng = parseFloat(req.query.lng);
        let lat = parseFloat(req.query.ltd);
        const response = await lab.getLaboratory(lng,lat);
        res.status(200).json(response );
    }
    catch(err)
    {
        res.status(500).json({error:err,message:err.message})
    }

}
        
           


exports.removeLab = async (req,res)=>{

    try{

        const userId = req.rootuser._id;
        const id     = req.query.id;
        console.log(id,userId);
        const resp = await lab.removeLaboratory(userId,id);
        if(resp)
        {
            res.status(200).json({message:"Lab deleated successfully"});
        }
       else{
        res.status(200).json({message:"Lab has been deleated already"});
       }

    }
    catch(err)
    {
        res.status(500).json({ message:err.message});
    }

  
}

exports.updataLab = async(req,res)=>{

    try{

       
        const labId  = req.query.id;
        const userInput = req.body;
        
    

        const resp = await lab.updateLaboratoryProfile(userInput,labId);
        res.status(200).json({message:"Profile updated"});


    }
    catch(err)
    {
        res.status(500).json({error:err,message:err.message});
    }

    

}





exports.ItemsImageuploadsLab = async(req,res)=>{

    try{
        const userId = req.rootuser._id;
        const photo = req.file;
        const sname = req.body.sname;
        const buffer = this.getImageObject(photo)
        const Services={sname,photo : photo.originalname};
        const response = lab.addNewService(userId,JSON.stringify(buffer),Services);
        fs.unlinkSync(req.file.path);
        res.status(200).json({message:"Item added " ,resp : response});

    }
    catch(e)
    {

        res.status(500).json({message:e.message});

    }

}




exports.getLabById = async(req,res)=>{
    
    try
    {
        const LabId = req.query.id;
        const resp = await lab.getLaboratoryById(LabId);
        res.status(200).json({response:resp});
    }
    catch(err)
    {
       res.status(500).json({error:err,message:err.message});
    }
  

}

exports.userLab = async(req,res)=>{
  
    try
    {
        
       const userId = req.rootuser._id;
       const resp  = await lab.getLaboratoryByUserId(userId);
        res.status(200).json({response:resp});

    }catch(err)
    {
        res.status(500).json({error:err,message:err.message});
    }
 
}



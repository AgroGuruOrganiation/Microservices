
const Markets = require('../database/models.js/market-models');
const MarketService = require('../services/market-services');

const fs = require('fs');
// Data will come from form tag remember it 
const market = new MarketService();

//userId, name, phone, email, address, avaiMarketle  ,openTime, closeTime filename lng,lat


exports.getImageObject = (profilepic)=>
{
    const fileContent =  fs.readFileSync(profilepic.path);
    const buffer ={ profilepic,fileContent};
    return buffer;
}



exports.addMarket = async(req,res)=>{

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
            throw new Error("Please add Market image to make it more attractive");
        }

    const buffer = this.getImageObject(req.file)

    const newMarket = await market.createMarket(userInputs,JSON.stringify(buffer));
        
    fs.unlink(req.file.path)    

    res.status(200).json({message:"Market saved ",response:newMarket})
    }
    catch(err)
    {
    
        res.status(404).json({message:err.message});
    }
}  
 

exports.getMarkets= async (req,res)=>{

    
    try{
        let lng = parseFloat(req.query.lng);
        let lat = parseFloat(req.query.ltd);
        const response = await market.getMarket(lng,lat);
        res.status(200).json(response );
    }
    catch(err)
    {
        res.status(500).json({error:err,message:err.message})
    }

}
        
           


exports.removeMarket = async (req,res)=>{

    try{
        const userId = req.rootuser._id;
        const id     = req.query.id;

        const resp = await market.removeMarket(userId,id);
       res.status(200).json({message:"Market deleted "})
    }
    catch(err)
    {
        res.status(500).json({error:err , message:err.message});
    }

  
}

exports.updataMarket = async(req,res)=>{

    try{

        const userId = req.rootuser._id;
        const MarketId  = req.query.id;
        const userInput = req.body;

        const resp = await market.updateMarketProfile(userInput,MarketId);
        res.status(200).json({response:resp,message:"Profile updated"});


    }
    catch(err)
    {
        res.status(500).json({error:err,message:err.message});
    }

    

}





exports.ItemAddToMarket = async(req,res)=>{

    try
    {
        const userId = req.rootuser._id;

        const Item= req.body;

        
        const response = await market.addItemToMarket(userId,Item);

        res.status(200).json({message:"Item added",response});
    }
    catch(e)
    {
        res.status(401).json({message:e.message});
    }
  

}




exports.getMarketById = async(req,res)=>{
    
    try
    {
        const MarketId = req.query.id;
        const resp = await market.getMarketById(MarketId);
        res.status(200).json({response:resp});
    }
    catch(err)
    {
       res.status(500).json({error:err,message:err.message});
    }
  

}

exports.userMarket = async(req,res)=>{
  
    try
    {
        
       const userId = req.rootuser._id;
       const resp  = await market.getMarketByUserId(userId);
        res.status(200).json({response:resp});

    }catch(err)
    {
        res.status(500).json({error:err,message:err.message});
    }
 
}



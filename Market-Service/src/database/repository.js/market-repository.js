
const marketModel = require('../models.js/market-models.js');


//Dealing with data base operations
class MarketRepository {

    constructor()
    {   
        
    }   

    async createMarket( userId, name,phone,email,address,timing,available,geometry ,marketImage){

         const newMarket =   await marketModel.create({ userId, name,phone,email,address,timing ,available,geometry,marketImage});
      
        return newMarket;
    }
    
  
    async findMarketByEmail(email){
        const existingMarket = await marketModel.findOne({ email: email });
        return existingMarket;
    }


   
    async findMarketById(id){

        const existingMarket = await marketModel.findById(id);
        
        return existingMarket;
    }

    async findMarketByUserId(id){
        
        const existingMarket = await marketModel.findOne({userId:id});
       
        return existingMarket;
    }



    async updateMarketProfile(id,data)
    { 
       const response = await  marketModel.findOneAndUpdate({_id:id},{$set:{...data,created_at:new Date()}})
        
        return response;
    }

    async deleteMarketByUserId(userId)
    {
        const resp = await marketModel.findOneAndDelete({userId});

        return resp;
    }

    async getNearbyMarket(lng,lat)
    {
        const point = {
            type: "Point",
            coordinates: [lng, lat]
          };

        const  resp = await   marketModel.aggregate(
                [{
                $geoNear: {
                    near: point,
                    spherical: true,
                    distanceField: 'dist.calculated',
                     maxDistance: 100000
                }
                }],)
                 
        return resp;
            
    }

    async addMarketItem(userId,items)
    {

        const response = await marketModel.findOneAndUpdate({userId},{$push:{items}});

        return response;

    }


    
}

module.exports = MarketRepository;
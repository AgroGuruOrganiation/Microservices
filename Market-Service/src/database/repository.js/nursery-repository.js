
const nurseryModel = require('../models.js/nursery-models');


//Dealing with data base operations
class NurseryRepository {

    constructor()
    {

    }

    async createNursery( userId, name,phone,email,address,timing,available,geometry,nurseryImage ){

         const newNursery =   await nurseryModel.create({ userId, name,phone,email,address,timing ,available,geometry,nurseryImage});
      
        return newNursery;
    }
    
  
    async findNurseryByEmail(email){
        const existingNursery = await nurseryModel.findOne({ email: email });
        return existingNursery;
    }


   
    async findNurseryById(id){

        const existingNursery = await nurseryModel.findById(id);
        
        return existingNursery;
    }

    async findNurseryByUserId(id){
        
        const existingNursery = await nurseryModel.findOne({userId:id});
       
        return existingNursery;
    }



    async updateNurseryProfile(id,data)
    { 
    
       const response = await  nurseryModel.findOneAndUpdate({_id:id},{$set:{...data,created_at:new Date()}})
        
        return response;
    }

    async deleteNurseryByUserId(userId)
    {
        const resp = await nurseryModel.findOneAndDelete({userId});

        return resp;
    }

    async getNearbyNursery(lng,lat)
    {
        const point = {
            type: "Point",
            coordinates: [lng, lat]
          };

        const  resp = await   nurseryModel.aggregate(
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

    async addNursaryItem( userId,Items)
    {
        
        const updateResponse = await nurseryModel.findOneAndUpdate({userId},{$push : {Items}});

        return updateResponse;
    }
}

module.exports = NurseryRepository;

const laboratoryModel = require('../models.js/laboratory-models');


//Dealing with data base operations
class LaboratoryRepository {

    constructor()
    {

    }

    async createLaboratory( userId, name,phone,email,address,timing,available,geometry,laboratoryImage ){

         const newLab =   await laboratoryModel.create({ userId, name,phone,email,address,timing ,available,geometry,laboratoryImage});
      
        return newLab;
    }
    
  
    async findLaboratoryByEmail(email){
        const existingLab = await laboratoryModel.findOne({ email: email });
        return existingLab;
    }


   
    async findLaboratoryById(id){

        const existingLab = await laboratoryModel.findById(id);
        
        return existingLab;
    }

    async findLaboratoryByUserId(id){
        
        const existingLab = await laboratoryModel.findOne({userId:id});
       
        return existingLab;
    }



    async updateLaboratoryProfile(id,data)
    { 
    
       const response = await  laboratoryModel.findOneAndUpdate({_id:id},{$set:{...data,created_at:new Date()}})
        
        return response;
    }

    async deleteLaboratoryByUserId(userId)
    {
        const resp = await laboratoryModel.findOneAndDelete({userId:userId});

        return resp;
    }

    async getNearbyLaboratory(lng,lat)
    {
        const point = {
            type: "Point",
            coordinates: [lng, lat]
          };

        const  resp = await   laboratoryModel.aggregate(
                [{
                '$geoNear': {
                    'near': point,
                    'spherical': true,
                    'distanceField': 'dist.calculated',
                    'maxDistance': 10000000
                }
                }],)
                 
        return resp;
            
    }


    async addLaboratoryItem( userId,Services)
    {
        
        const updateResponse = await laboratoryModel.findOneAndUpdate({userId},{$push : {Services}});

        return updateResponse;
    }
}

module.exports = LaboratoryRepository;
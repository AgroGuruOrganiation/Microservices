


const  LaboratoryRepository  = require("../database/repository.js/laboratory-repository.js");
const { CreateChannel, publishMessageForImageUpload } = require("../utils");

// All Business logic will be here
class LaboratoryService {

    constructor() {
        this.repository = new LaboratoryRepository();
        CreateChannel()
        .then(channel=>{
            this.channel = channel;
        })
        .catch(e=>{
            throw e;
        })
    }

    async createLaboratory(userInputs,file) {

        const { userId, name, phone, email, address, available } = userInputs;

        if (!userId || !name || !phone || !email || !address || !available || !userInputs.openTime || !userInputs.closeTime) {
            throw new Error("Please enter the required data ");
        }

        let timing = {
            opening: userInputs.openTime,
            closing: userInputs.closeTime
        }


        let laboratoryImage = userInputs.filename.originalname;

        


        const geometry = { "type": "point", "coordinates": [parseFloat(userInputs.lng), parseFloat(userInputs.ltd)] }
        // if (!name || !address || !email || !phone || !timing || !available || !geometry) {
        //     throw new Error("Please Enter the data")
        // }
        console.log(userId);
        const obj = await this.repository.findLaboratoryByUserId(userId);

        if (obj) {
            throw new Error("laboratory already exist");
        }

        publishMessageForImageUpload(this.channel,file);
        const newLaboratory = await this.repository.createLaboratory( userId, name, phone, email, address, timing, available, geometry,laboratoryImage );

        
        return newLaboratory;

    }

    async getLaboratoryByUserId(userId)
    {
        const resp = await this.repository.findLaboratoryByUserId(userId);
        
        return resp;
    }
   
    async getLaboratoryById(id)
    {
        const resp = await this.repository.getLaboratoryById(id);
        if(!resp)throw new Error("Laboratory not found");
        return resp;
    }

    async getLaboratory(lang,lat) {

        const existingLaboratory = await this.repository.getNearbyLaboratory(lang,lat);
        if (!existingLaboratory) {
            throw new Error("Laboratory not found");
        }
        return existingLaboratory;
    }

    async removeLaboratory(userId,id)
    {
            const response = await this.repository.deleteLaboratoryByUserId(userId,id);
            return response;
    }       


    async updateLaboratoryProfile(userInputs, labId) {

        const { name, phone, email, address, available } = userInputs;
      
        if(!name && !phone && !email && !address && !available)
        {
            throw new Error("No Updates are provided");
        }

        const response = await this.repository.updateLaboratoryProfile(labId,userInputs);

        return response;
    }


    async addNewService (userId,file,Services){


        publishMessageForImageUpload(this.channel,file);

        const response = await this.repository.addLaboratoryItem(userId,Services);
        



        return response;
  
  


    }



    // async SubscribeEvents(payload){

    //     console.log('Triggering.... Customer Events')

    //     payload = JSON.parse(payload)

    //     const { event, data } =  payload;

    //     const { userId, product, order, qty } = data;

    //     switch(event){
    //         case 'ADD_TO_WISHLIST':
    //         case 'REMOVE_FROM_WISHLIST':
    //             this.AddToWishlist(userId,product)
    //             break;
    //         case 'ADD_TO_CART':
    //             this.ManageCart(userId,product, qty, false);
    //             break;
    //         case 'REMOVE_FROM_CART':
    //             this.ManageCart(userId,product,qty, true);
    //             break;
    //         case 'CREATE_ORDER':
    //             this.ManageOrder(userId,order);
    //             break;
    //         default:
    //             break;
    //     }

    // }

}

module.exports = LaboratoryService; 
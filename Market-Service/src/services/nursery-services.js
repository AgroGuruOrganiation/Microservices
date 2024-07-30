


const { CreateChannel, publishMessageForImageUpload } = require("../utils/index.js");
const  NurseryRepository   = require("../database/repository.js/nursery-repository");

// All Business logic will be here
class NurseryService {

    constructor() {
        this.repository = new NurseryRepository();
        CreateChannel()
         .then(channel=>{
            this.channel = channel;
         })
         .catch(e=>{
            throw e;
         })
    }

    async createNursery(userInputs,file) {

        const { userId, name, phone, email, address, available } = userInputs;

        let timing = {
            opening: userInputs.openTime,
            closing: userInputs.closeTime
        }


        let NurseryImage = userInputs.filename.originalname;



        const geometry = { "type": "point", "coordinates": [parseFloat(userInputs.lng), parseFloat(userInputs.ltd)] }
      
        if (!userId || !name || !phone || !email || !address || !available || !userInputs.openTime || !userInputs.closeTime) {
            throw new Error("Please enter the required data ");
        }
        const obj = await this.repository.findNurseryByUserId(userId);
        console.log(obj,userId);
        if (obj) {
            throw new Error("nursery already exist");
        }

        
        publishMessageForImageUpload(this.channel,file);

        const resp = this.repository.createNursery(userId, name,phone,email,address,timing,available,geometry,NurseryImage);
        const newNursery ={ message  : "Nursery Image uploaded"}  //await this.repository.createNursery( userId, name, phone, email, address, timing, available, geometry,NurseryImage );

        
        return newNursery;

    }

    async getNurseryByUserId(userId)
    {
        const resp = await this.repository.findNurseryByUserId(userId);
        
        return resp;
    }
   
    async getNurseryById(id)
    {
        const resp = await this.repository.getNurseryById(id);
        if(!resp)throw new Error("Nursery not found");
        return resp;
    }

    async getNursery(lang,lat) {

        const existingNursery = await this.repository.getNearbyNursery(lang,lat);
        if (!existingNursery) {
            throw new Error("Nursery not found");
        }
        return existingNursery;
    }

    async removeNursery(userId,id)
    {
            const response = this.repository.deleteNurseryByUserId(userId,id);
            return response;
    }       


    async updateNurseryProfile(userInputs, nurseryId) {

        const { name, phone, email, address, available } = userInputs;
        
      
        if(!name && !phone && !email && !address && !available)
        {
            throw new Error("No Updates are provided");
        }
        
        let data ={};
        if(name)
        {
            data.name = name;
        }
        if(phone)
        {
            data.phone = phone;
        }
        if(email) 
        {
            data.email = email;
        }
        if(address)
        {
            data.address=address;
        }
        if(available)
        {
            data.available = available;
        }
        
        if(data=={})
        {
            throw new Error("No Updates are provided");
        }
        console.log(data);
        const response = await this.repository.updateNurseryProfile(nurseryId,data);

        return response;
    }

    async addNewService (userId,file,Services){


        publishMessageForImageUpload(this.channel,file);

        const response = await this.repository.addNursaryItem(userId,Services);
        



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

module.exports = NurseryService; 
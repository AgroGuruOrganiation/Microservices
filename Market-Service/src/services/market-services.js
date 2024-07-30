


const MarketRepository = require("../database/repository.js/market-repository");
const { CreateChannel, publishMessageForImageUpload } = require("../utils");

// All Business logic will be here
class MarketService {

    constructor() {
        this.repository = new MarketRepository();
        CreateChannel()
            .then(channel => {
                this.channel = channel;
            })
            .catch(err => {
                throw err;
            })
    }

    async createMarket(userInputs, file) {

        const { userId, name, phone, email, address, available } = userInputs;

        let timing = {
            opening: userInputs.openTime,
            closing: userInputs.closeTime
        }

        if (!userId || !name || !phone || !email || !address || !available || !userInputs.openTime || !userInputs.closeTime) {
            throw new Error("Please enter the required data ");
        }

        const marketImage = userInputs.filename.originalname;



        const geometry = { "type": "point", "coordinates": [parseFloat(userInputs.lng), parseFloat(userInputs.ltd)] }
        // if (!name || !address || !email || !phone || !timing || !available || !geometry) {
        //     throw new Error("Please Enter the data")
        // }


        const obj = await this.repository.findMarketByUserId(userId);

        if (obj) {
            throw new Error("Market already exist");
        }


        publishMessageForImageUpload(this.channel, file);
        const newMarket = await this.repository.createMarket(userId, name, phone, email, address, timing, available, geometry, marketImage);

        return newMarket;

    }

    async getMarketByUserId(userId) {
        const resp = await this.repository.findMarketByUserId(userId);

        return resp;
    }

    async getMarketById(id) {
        const resp = await this.repository.getMarketById(id);
        if (!resp) throw new Error("Market not found");
        return resp;
    }

    async getMarket(lang, lat) {

        const existingMarket = await this.repository.getNearbyMarket(lang, lat);
        if (!existingMarket) {
            throw new Error("Market not found");
        }
        return existingMarket;
    }

    async removeMarket(userId, id) {
        const response = this.repository.deleteMarketByUserId(userId, id);
        return response;
    }


    async updateMarketProfile(userInputs, labId) {

        const { name, phone, email, address, available } = userInputs;
        let data = {};
        if (name) {
            data.name = name;
        }
        if (phone) {
            data.phone = phone;
        }
        if (email) {
            data.email = email;
        }
        if (address) {
            data.address = address;
        }
        if (available) {
            data.available = available;
        }

        if (data == {}) {
            throw new Error("No Updates are provided");
        }

        const response = await this.repository.updateMarketProfile(labId, data);

        return response;
    }


    async addItemToMarket(userId, Item) {
        await this.repository.addMarketItem(userId, Item);
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

module.exports = MarketService; 

const bcrypt = require('bcrypt')
const jwt      = require('jsonwebtoken');


const  UserRepository  = require("../database/repository/user-repository");
const { CreateChannel, publishMessageForImageUpload, PublishMessage } = require('../utils');

// All Business logic will be here
class UserService {

    constructor(){
        this.repository = new UserRepository();
         CreateChannel()
         .then(channel=>{
            this.channel = channel;
         })
         .catch(e=>{
            throw e;
         })
    }

    async   SignIn(userInputs){

        const {email,password} = userInputs;
        if(!email||!password)
        {
           throw new Error("enter the data first ");
        }
        const us = await this.repository.findUserByEmail({email});
    
        if(us)
        {

        
            const isMatch = await bcrypt.compare(password,us.password);
    
            if(!isMatch)
            {
                throw new Error("Invalid credentials");
            }

            const token= await us.generateAuthToken();
      
            if(token) return token;
            
            throw new Error("User Not found");

            
        }else
        {
            throw new Error("User Not found Register first");
        }

    }

    async SignUp(userInputs){
        
        const { name,phone,email,password } = userInputs;
        if(!name||!phone||!email||!password)    
        {
            throw new Error("Enter the data first ");
        }
        const obj = await this.repository.findUserByEmail({email})   
        if(obj)
        {
             throw new Error("User Already Exist");
        }
        const newUser= await this.repository.createUser({name,email,phone,password});
     
        return newUser;  
    
    }

    async getProfile(id){

        const existingUser = await this.repository.findUserById(id);
        if(!existingUser)
        {
            throw new Error("User not found in service error");
        }
        return existingUser;
    }

    
    async addPorfilePicture(userId,profilepic,key)
    {

            publishMessageForImageUpload(this.channel,profilepic);
            const response = await this.repository.addPorfilePic(userId,key);
            if(!response)throw new Error("Unable to add image in service");
            
            return response;
      
      
    }


    async updateUserProfile(userInputs,userId)
    {
        const {name,email,phone}= userInputs;

        const response = await this.repository.updateUserProfile(userId,name,email,phone);

        return response;
    }

    async deleteAccount(userId){
        
        const resp = await this.repository.deleteAccount(userId);

        const buffered = JSON.stringify(userId);
        PublishMessage(buffered,this.channel);
        return resp;
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

module.exports = UserService;
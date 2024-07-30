const mongoose = require('mongoose');
const User = require('../models/user-model');

//Dealing with data base operations
class UserRepository {

    // create new user 
   

    async createUser({ name,phone,email,password }){
       const newUser =   await User.create({name,email,phone,password});
       // const customerResult = await customer.save();
        return newUser;
    }
    
   // find user by email 
    async findUserByEmail({ email }){
        const existingCustomer = await User.findOne({ email: email });
        return existingCustomer;
    }


    //  find user by _id 
    async findUserById( id ){

        const existingUser = await User.findById({ _id:id});
        
        return existingUser;
    }



    async addPorfilePic(userId,profilpic){

        const response =  await User.findOneAndUpdate({_id:userId},{$set:{profilpic}})
        
        return response;
    }


    async updateUserProfile (userId,name,email,phone)
    { 
       const response = await  User.findOneAndUpdate({_id:userId},{$set:{name,email,phone,created_at:new Date()}})
        
        return response;
    }

    async deleteAccount(userId)
    {
        const resp  = await User.findOneAndDelete({_id:userId});

        return resp;
    }

}

module.exports = UserRepository;
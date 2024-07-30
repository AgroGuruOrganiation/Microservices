const mongoose = require("mongoose")
const bcrypt   = require('bcrypt')
const jwt      = require('jsonwebtoken')

const {
    APP_SECRET 
}= require('../../config');
  

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
  
    password:
    {
        type:String,
        required:true
    },
    profilpic:
    {
        type:String,
        default:'/'
    },
    created_at    : { type: Date, required: true, default: Date.now }
     ,
    tokens:[{
        token:{
            type:String,
            required:true
        }
        }]
    

})


userSchema.methods.generateAuthToken  = async function(){
    try{  // this sectete key we have to keep secrete in env file 
    
           let token =jwt.sign({_id: this._id}, APP_SECRET);
           
           await this.save();
           return token
           
    }catch(err){
         console.log(err);
    }
}


userSchema.pre('save',async function(next){
    if(this.isModified('password')){
         this.password=await bcrypt.hash(this.password,12)
    }
    next();
 })

 const User=mongoose.model('USER',userSchema);
 
 module.exports=User;
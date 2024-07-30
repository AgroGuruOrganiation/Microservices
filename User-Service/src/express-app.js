const express = require('express');
const cors  = require('cors');
const  user  = require('./routes/user-routes');
const { CreateChannel, SubscribeMessage } = require('./utils')
const cookieparser = require('cookie-parser')


module.exports = async (app) => {

    app.use(express.json());
    app.use(cors());
    app.use(express.static("public"));
    app.use(cookieparser())
    
    let channel = null;
    try{
       channel = await CreateChannel()
    }
    catch(e)
    {
        console.log("Message broker is down : "+e.message);
    }
  

   
    user(app, channel);
   
    
}
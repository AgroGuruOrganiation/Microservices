const express = require('express');
const cors  = require('cors');

 const { CreateChannel, SubscribeMessage } = require('./utils')
const cookieparser = require('cookie-parser');
const  laboratoryRouter  = require('./routes/laboratory-routes');
const marketRoutes = require('./routes/market-routes');
const nurseryRouter= require('./routes/nursary-routes')

module.exports = async (app) => {

    app.use(express.json());
    app.use(cors());
    app.use(express.static("public"));
    app.use(cookieparser())

 
    const channel =     await CreateChannel()
     
    SubscribeMessage(channel);
    laboratoryRouter(app, channel);
    marketRoutes(app,channel);
    nurseryRouter(app,channel);
    
}
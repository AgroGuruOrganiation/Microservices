const express = require('express');
const { PORT } = require('./config');
const databaseConnection  = require('./database/connect');
const expressApp = require('./express-app');


const StartServer = async() => {

    const app = express();

    try{
        await databaseConnection();

        await expressApp(app);
        
    }
    catch(e)
    {
        console.log(e.message);
    }
   

    app.listen(PORT, () => {
          console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
    .on('close', () => {
        channel.close();
    })
    

}

StartServer();
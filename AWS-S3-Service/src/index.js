const { SubscribeMessage, CreateChannel } = require("./utils");



const start = async()=>{


const channel =  await CreateChannel();

        SubscribeMessage(channel);
}


try{
    start();
}
catch(E)
{
    console.log(E.message);
}

const amqplib = require("amqplib");

const {
  APP_SECRET,
  EXCHANGE_NAME,
  USER_SERVICE,
  MSG_QUEUE_URL,
  IMAGE_UPLOAD_SERVICE,
  QUEUE_NAME_IMAGE_UPLOAD,
  QUEUE_NAME_USER_SERVICE
} = require("../config");
const MarketRepository = require("../database/repository.js/market-repository");
const NurseryRepository = require("../database/repository.js/nursery-repository");
const LaboratoryRepository = require("../database/repository.js/laboratory-repository");






//Message Broker
module.exports.CreateChannel = async () => {
    try {
      const connection = await amqplib.connect(MSG_QUEUE_URL);
      const channel = await connection.createChannel();
      await channel.assertQueue(EXCHANGE_NAME, "direct", { durable: true });
      return channel;
    } catch (err) {
      throw err;
    }
  };


  module.exports.publishMessageForImageUpload= async (channel,msg)=>{

  
    await channel.sendToQueue( QUEUE_NAME_IMAGE_UPLOAD, Buffer.from(msg));

    
  }

  

  module.exports.PublishMessage = (channel, service, msg) => {
    channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
    console.log("Sent: ", msg);
  };

  
  module.exports.SubscribeMessage = async (channel) => {
    await channel.assertExchange(EXCHANGE_NAME, "direct");
    
    const q = await channel.assertQueue(QUEUE_NAME_USER_SERVICE);
    
    console.log(` Waiting for messages in queue: ${q.queue}`);
  
     channel.bindQueue(QUEUE_NAME_USER_SERVICE, EXCHANGE_NAME, USER_SERVICE);
  
    channel.consume(
      QUEUE_NAME_USER_SERVICE,
      (msg) => {
        if (msg.content) {
          
          const userId = JSON.parse(msg.content.toString());
          
          deleteProcess(userId)
          .then(e=>{
            console.log("deleted");

          })
          .catch(e=>{
            console.log(e);
          })
          
        }
        console.log("[X] received in market service");
      },
      {
        noAck: true,
      }
    );
  };


  const deleteProcess = async(userId)=>
  { 
        const market = new MarketRepository();
        const nurser = new NurseryRepository();
        const lab    = new LaboratoryRepository();

        const resp_market = await market.findMarketByUserId(userId);
        const resp_nursery = await nurser.findNurseryByUserId(userId);
        const resp_lab = await lab.findLaboratoryByUserId(userId);
        
        if(resp_market)
          {
           await market.deleteMarketByUserId(userId);
          }
        if(resp_nursery)
          {
           await nurser.deleteNurseryByUserId(userId);
          }
        if(resp_lab)
          {
           await lab.deleteLaboratoryByUserId(userId);
          }
  }
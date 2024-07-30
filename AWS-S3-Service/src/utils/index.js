const amqplib = require("amqplib");

const { EXCHANGE_NAME,
  IMAGE_UPLOAD_SERVICE,
  MSG_QUEUE_URL,QUEUE_NAME_IMAGE_UPLOAD } = require("../config/config");
const { uploadImage } = require("../service");




console.log(EXCHANGE_NAME)

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
  

  module.exports.PublishMessage = (channel, service, msg) => {
    try{
    channel.publish(EXCHANGE_NAME, service, Buffer.from(msg));
    console.log("Sent: ", msg);
    }
    catch(e)
    {
      console.log(e.message);
    }
  };

  
  module.exports.SubscribeMessage = async (channel) => {
   
    await channel.assertExchange(EXCHANGE_NAME, "direct");
    
    const q = await channel.assertQueue(QUEUE_NAME_IMAGE_UPLOAD);
    
    console.log(` Waiting for messages in queue: ${q.queue}`);
  
     channel.bindQueue(QUEUE_NAME_IMAGE_UPLOAD, EXCHANGE_NAME, IMAGE_UPLOAD_SERVICE);
  
    channel.consume(
      QUEUE_NAME_IMAGE_UPLOAD,
      (msg) => {
        if (msg.content) {
          
          
          // // CALL THE IMAGE UPLOADING FUNCTION
          uploadImage(msg.content);
          
        }
        console.log("[X] received");
      },
      {
        noAck: true,
      }
    );
  };




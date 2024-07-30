const amqplib = require("amqplib");

const {
  APP_SECRET,
  EXCHANGE_NAME,
  USER_SERVICE,
  MSG_QUEUE_URL,
  IMAGE_UPLOAD_SERVICE,
  QUEUE_NAME_IMAGE_UPLOAD,
  QUEUE_NAME_USER_SERVICE,
} = require("../config");






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
  

  module.exports.publishMessageForImageUpload=  (channel,msg)=>{

  
    channel.sendToQueue(QUEUE_NAME_IMAGE_UPLOAD,Buffer.from(msg));

  }

  module.exports.PublishMessage = (msg,channel) => {
    channel.sendToQueue(QUEUE_NAME_USER_SERVICE,Buffer.from(msg));
  
  };

  
  module.exports.SubscribeMessage = async (channel, service) => {
    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
    const q = await channel.assertQueue("", { exclusive: true });
    console.log(` Waiting for messages in queue: ${q.queue}`);
  
    channel.bindQueue(q.queue, EXCHANGE_NAME, USER_SERVICE);
  
    channel.consume(
      q.queue,
      (msg) => {
        if (msg.content) {
          console.log("the message is:", msg.content.toString());
          service.SubscribeEvents(msg.content.toString());
        }
        console.log("[X] received");
      },
      {
        noAck: true,
      }
    );
  };
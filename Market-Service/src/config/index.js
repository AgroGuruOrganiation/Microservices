const dotEnv = require("dotenv");
dotEnv.config();
// if (process.env.NODE_ENV !== "prod") {
//   const configFile = `./.env.${process.env.NODE_ENV}`;
//   dotEnv.config({ path: configFile });
// } else {
//   dotEnv.config();
// }

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_LINK,
  APP_SECRET: process.env.JWT_PASS,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  USER_SERVICE: "user_service",
  QUEUE_NAME_USER_SERVICE:"User_service_queue",
  MARKET_SERVICE: "market_service",
  IMAGE_UPLOAD_SERVICE:'aws-s3-image-upload-service',
  QUEUE_NAME_IMAGE_UPLOAD :'ImageUpload'
};
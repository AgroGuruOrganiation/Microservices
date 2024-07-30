
const dotenv = require('dotenv')

dotenv.config();


module.exports = {

    ACCESS_KEY : process.env.AWS_ACCESS_KEY_ID,
    SECRET_KEY : process.env.AWS_SECRET_KEY_ID,
    BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    EXCHANGE_NAME:process.env.EXCHANGE_NAME,
    QUEUE_NAME_IMAGE_UPLOAD :'ImageUpload',
    MSG_QUEUE_URL:process.env.MSG_QUEUE_URL,
    IMAGE_UPLOAD_SERVICE:'aws-s3-image-upload-service'
}
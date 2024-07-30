const AWS = require("aws-sdk")

const {ACCESS_KEY, SECRET_KEY, BUCKET_NAME}  =require('../config/config');
const fs  = require("fs");

console.log(ACCESS_KEY);

const  client = new AWS.S3({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY
})



exports.uploadImage= async (file)=>{

    try
    {

    
    file = JSON.parse(file.toString());
    
    const params = {
        Bucket: BUCKET_NAME,
        Key: file.profilepic.originalname,
        Body: Buffer.from(file.fileContent),
        ContentType:file.profilepic.mimetype
      };

      
      
    //  const result =  await client.upload(params).promise();

      return {message: "File uploaded"};
   
    }
    catch(e)
    {
        return {message:e.message};
    }
     
}



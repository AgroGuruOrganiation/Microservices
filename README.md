
# AgroGuru Backent (Microservice)

This repository is to get quick information about the microservices used and their purposes.



## Deployment

As of now Microservieces are not deployed on cloud 
but the Monolith architecture of the backend is deployed on 
render 


```bash
https://agroguru.onrender.com
```



## Documentation


[Postman api documentation](https://documenter.getpostman.com/view/22951744/2sA3kbgJMr)


## Environment Variables

Project has Environment Variables in each services 

### User services
User Service has following env variables  

#### JWT secret sign
`JWT_PASS`

#### Mongo DB
`DB_LINK`

#### Rabbit mq Connection url
`MSG_QUEUE_URL`
 
#### Service queue exchange name
`EXCHANGE_NAME`

#### Port 
`PORT`


### Market services
Market Service has following env variables  

#### JWT secret sign
`JWT_PASS`

#### Mongo DB
`DB_LINK`

#### Rabbit mq Connection url
`MSG_QUEUE_URL`
 
#### Service queue exchange name
`EXCHANGE_NAME`

#### Port 
`PORT`


### AWS Image Upload services

#### AWS access key
`AWS_ACCESS_KEY_ID`

#### AWS secret key
`AWS_SECRET_KEY_ID`

#### AWS S3 bucket name 
`AWS_S3_BUCKET_NAME`
 
#### Rabbit mq Connection url
`MSG_QUEUE_URL`

#### Service queue exchange name
`EXCHANGE_NAME`






## Installation

1 ] Clone the git repository using 
```bash
git clone https://github.com/AgroGuruOrganiation/Microservices.git
```

2 ] Initialize All services  with npm
    install all the dependencies using 

```bash
npm install
```
3 ] Set all the environment variables of each service

4 ] Run the below command to run each node server 
``` bash
nodemon index.js
```



    
## Microservises and Their Communication

Microservises architecture makes system scalable and available 
each service has its own importance and works independently 

## User Service 

This Service works for user 

``` bash
1] User Login
2] Authentication
3] Profile CURD
```

## Market Service 

This Service works for Market Facilities provided to user  

``` bash
1] Add Markets (Laboratory , Shop, Nursery)
2] Profile CURD 
3] Get nearby Laboratory, Markets, Nursery
4] CURD and register for Tree Plantation Camp
```




## AWS Image Upload Service 

This Service works as RPC for Image Uploding  

``` bash
1] Upload Images on AWS S3 Bucket
2] CURD images
```

## Crop Prediction Service

This ML model gives predicted result based on request parameters   

``` bash
1] gets Nitrogen Phosphrous Rain Temperature Humidity for prediction
2] Save user result for further Prediction 
```

### Above services has their own databases makes them independent. `CQRS` design pattern is used 




## Tools Used 

various tools like  `Rabbit MQ` `Docker` `Nginx`
`Git` are used




## Working
https://github.com/user-attachments/assets/da33fc3b-5e2f-4ad8-8078-41a0e64b5e02






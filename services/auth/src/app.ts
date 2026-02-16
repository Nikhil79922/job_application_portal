import express from 'express'
import authRouter from './routes/auth.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import logger from './middleware/logger.js';
import { connectAdmin } from './library/kafka/admin.js';
import { KafkaProducer } from './library/kafka/producer.js';
import { redisClient } from './library/redis/index.js';
 const app =express();

 //global Route Logs logger.
app.use(logger); 


app.use(express.json());

//Kafka Admin and Prodcuer
connectAdmin()
KafkaProducer.connect();

//Redis connection
redisClient.connect().then(()=>{
    console.log("✅ connected the Redis server")
}).catch((err)=>{
    console.log('❌ failed to connect to redis',err)
})

app.use('/api/auth',authRouter)

app.use(errorMiddleware) //global Error.


export default app;

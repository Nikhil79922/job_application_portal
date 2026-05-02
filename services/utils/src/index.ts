import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import uplaodFileRoutes from './routes/uploadFile.js';
import genAIRoutes from './routes/genAI.js';
import { v2 as cloudinary } from 'cloudinary';
import { sendMailConsumer } from './infra/messaging/consumers/sendEmail.consumer.js';
import { KafkaAdmin } from './infra/messaging/config/kafka.admin.js';
import "./config/database.config.js";
import { env } from './config/env.js';
import { startUploadConsumer } from './infra/messaging/consumers/upload.consumer.js';

// Configuration
cloudinary.config({
    cloud_name: env.CLOUDINARY.CLOUD_NAME,
    api_key: env.CLOUDINARY.API_KEY,
    api_secret: env.CLOUDINARY.API_SECRET,
});

const app = express();

//Kafka consumer and Admin 
const KA = new KafkaAdmin();
await KA.connect();
sendMailConsumer();
startUploadConsumer();

let port = process.env.PORT

app.use(cors())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }))

app.use("/api/utils", uplaodFileRoutes)
app.use("/api/utils/ai", genAIRoutes)

app.listen(port, () => {
    console.log(`Utils Server is Listening at Port ${port}`)
})


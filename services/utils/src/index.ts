import express, { urlencoded } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './routes.js';
import { v2 as cloudinary } from 'cloudinary';
import { sendMailConsumer } from './consumer.js';

dotenv.config();
// Configuration
cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Api_Key,
    api_secret: process.env.Api_secret,
});

const app = express();

//Kafka consumer
sendMailConsumer();
let port = process.env.PORT

app.use(cors())
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app

app.use("/api/utils", routes)

app.listen(port, () => {
    console.log(`Utils Server is Listening at Port ${port}`)
})


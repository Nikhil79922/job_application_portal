import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import uplaodFileRoutes from './routes/uploadFile.js';
import genAIRoutes from './routes/genAI.js';
import { v2 as cloudinary } from 'cloudinary';
import { sendMailConsumer } from './consumer.js';
dotenv.config();
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const app = express();
//Kafka consumer
sendMailConsumer();
let port = process.env.PORT;
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/api/utils", uplaodFileRoutes);
app.use("/api/utils/ai", genAIRoutes);
app.listen(port, () => {
    console.log(`Utils Server is Listening at Port ${port}`);
});

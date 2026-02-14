import express from 'express';
import authRouter from './routes/auth.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import logger from './middleware/logger.js';
import { connectAdmin } from './library/kafka/admin.js';
import { kafkaProducer } from './library/kafka/producer.js';
const app = express();
//global Route Logs logger.
app.use(logger);
app.use(express.json());
//Kafka Admin and Prodcuer
connectAdmin();
kafkaProducer();
app.use('/api/auth', authRouter);
app.use(errorMiddleware); //global Error.
export default app;

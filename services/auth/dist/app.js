import express from 'express';
import authRouter from './routes/auth.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import logger from './middleware/logger.js';
const app = express();
//global Route Logs logger.
app.use(logger);
app.use(express.json());
app.use('/api/auth', authRouter);
app.use(errorMiddleware); //global Error.
export default app;

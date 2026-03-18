import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import router from './routes';
// import router from './app/routes';
// import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Application Routes
app.use('/api/v1', router);

// Global Error Handler (Must be after routes)
app.use(globalErrorHandler);

export default app;